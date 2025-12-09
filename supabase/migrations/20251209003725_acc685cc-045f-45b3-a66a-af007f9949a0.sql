-- Create role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'jury', 'model');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Create models table
CREATE TABLE public.models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  gender TEXT NOT NULL,
  height TEXT,
  age INTEGER,
  level TEXT DEFAULT 'Débutant',
  image_url TEXT,
  is_public BOOLEAN DEFAULT false,
  categories TEXT[] DEFAULT '{}',
  experience TEXT,
  journey TEXT,
  location TEXT DEFAULT 'Libreville',
  chest TEXT,
  waist TEXT,
  hips TEXT,
  shoe_size TEXT,
  username TEXT UNIQUE,
  password_hash TEXT,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create casting_applications table
CREATE TABLE public.casting_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  birth_date DATE,
  gender TEXT NOT NULL,
  city TEXT,
  nationality TEXT,
  height TEXT,
  weight TEXT,
  chest TEXT,
  waist TEXT,
  hips TEXT,
  shoe_size TEXT,
  eye_color TEXT,
  hair_color TEXT,
  experience TEXT,
  instagram TEXT,
  portfolio_link TEXT,
  motivation TEXT,
  status TEXT DEFAULT 'Nouveau',
  passage_number INTEGER,
  photo_portrait_url TEXT,
  photo_full_url TEXT,
  photo_profile_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create jury_scores table
CREATE TABLE public.jury_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.casting_applications ON DELETE CASCADE NOT NULL,
  jury_id UUID REFERENCES auth.users ON DELETE SET NULL,
  jury_name TEXT,
  physique INTEGER CHECK (physique >= 1 AND physique <= 10),
  presence INTEGER CHECK (presence >= 1 AND presence <= 10),
  photogenie INTEGER CHECK (photogenie >= 1 AND photogenie <= 10),
  potentiel INTEGER CHECK (potentiel >= 1 AND potentiel <= 10),
  overall DECIMAL(4,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID REFERENCES public.models ON DELETE CASCADE NOT NULL,
  model_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  month TEXT NOT NULL,
  payment_date DATE,
  method TEXT DEFAULT 'Espèces',
  status TEXT DEFAULT 'En attente',
  category TEXT DEFAULT 'Cotisation mensuelle',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create absences table
CREATE TABLE public.absences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID REFERENCES public.models ON DELETE CASCADE NOT NULL,
  model_name TEXT NOT NULL,
  date DATE NOT NULL,
  reason TEXT,
  is_excused BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create model_distinctions table
CREATE TABLE public.model_distinctions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID REFERENCES public.models ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  titles TEXT[] DEFAULT '{}'
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.casting_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jury_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.absences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_distinctions ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (avoids recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin or staff
CREATE OR REPLACE FUNCTION public.is_admin_or_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'staff')
  )
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (public.is_admin_or_staff(auth.uid()));

-- User roles policies
CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Models policies
CREATE POLICY "Public models are viewable by everyone"
ON public.models FOR SELECT
USING (is_public = true);

CREATE POLICY "Admins can manage all models"
ON public.models FOR ALL
USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Models can view own profile"
ON public.models FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Models can update own profile"
ON public.models FOR UPDATE
USING (user_id = auth.uid());

-- Casting applications policies
CREATE POLICY "Anyone can submit casting application"
ON public.casting_applications FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins and staff can view all applications"
ON public.casting_applications FOR SELECT
USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admins and staff can update applications"
ON public.casting_applications FOR UPDATE
USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admins can delete applications"
ON public.casting_applications FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Jury scores policies
CREATE POLICY "Jury members can add scores"
ON public.jury_scores FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'jury') OR public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Jury and admin can view scores"
ON public.jury_scores FOR SELECT
USING (public.has_role(auth.uid(), 'jury') OR public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Jury can update own scores"
ON public.jury_scores FOR UPDATE
USING (jury_id = auth.uid() OR public.is_admin_or_staff(auth.uid()));

-- Payments policies
CREATE POLICY "Admins and staff can manage payments"
ON public.payments FOR ALL
USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Models can view own payments"
ON public.payments FOR SELECT
USING (model_id IN (SELECT id FROM public.models WHERE user_id = auth.uid()));

-- Absences policies
CREATE POLICY "Admins and staff can manage absences"
ON public.absences FOR ALL
USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Models can view own absences"
ON public.absences FOR SELECT
USING (model_id IN (SELECT id FROM public.models WHERE user_id = auth.uid()));

-- Model distinctions policies
CREATE POLICY "Anyone can view distinctions"
ON public.model_distinctions FOR SELECT
USING (true);

CREATE POLICY "Admins can manage distinctions"
ON public.model_distinctions FOR ALL
USING (public.is_admin_or_staff(auth.uid()));

-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_models_updated_at
  BEFORE UPDATE ON public.models
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_casting_applications_updated_at
  BEFORE UPDATE ON public.casting_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();