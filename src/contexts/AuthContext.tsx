import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/integrations/firebase/client"; // Assuming you have this file

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  // Note: Role checking needs to be adapted for Firebase (e.g., using custom claims)
  // This is a placeholder and will need a proper implementation based on your Firebase setup.
  const checkUserRoles = async (user: User) => {
    if (!user) {
      setIsAdmin(false);
      setIsStaff(false);
      return;
    }
    // Placeholder: In a real app, you'd get custom claims or check a database.
    // For now, let's assume all authenticated users are staff and the first user is an admin.
    const idTokenResult = await user.getIdTokenResult();
    setIsAdmin(idTokenResult.claims.admin === true);
    setIsStaff(idTokenResult.claims.staff === true || idTokenResult.claims.admin === true);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await checkUserRoles(user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Note: Firebase's createUserWithEmailAndPassword doesn't store the full name directly.
      // You'll need to update the user's profile separately.
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // You would typically update the user's profile here.
      // await updateProfile(userCredential.user, { displayName: fullName });
      console.log("Full name to set (not implemented yet):", fullName);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setIsAdmin(false);
    setIsStaff(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        isStaff,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
