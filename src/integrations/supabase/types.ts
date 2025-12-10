export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      absences: {
        Row: {
          created_at: string | null
          date: string
          id: string
          is_excused: boolean | null
          model_id: string
          model_name: string
          notes: string | null
          reason: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          is_excused?: boolean | null
          model_id: string
          model_name: string
          notes?: string | null
          reason?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          is_excused?: boolean | null
          model_id?: string
          model_name?: string
          notes?: string | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "absences_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
      casting_applications: {
        Row: {
          birth_date: string | null
          chest: string | null
          city: string | null
          created_at: string | null
          email: string
          experience: string | null
          eye_color: string | null
          first_name: string
          gender: string
          hair_color: string | null
          height: string | null
          hips: string | null
          id: string
          instagram: string | null
          last_name: string
          motivation: string | null
          nationality: string | null
          passage_number: number | null
          phone: string
          photo_full_url: string | null
          photo_portrait_url: string | null
          photo_profile_url: string | null
          portfolio_link: string | null
          shoe_size: string | null
          status: string | null
          updated_at: string | null
          waist: string | null
          weight: string | null
        }
        Insert: {
          birth_date?: string | null
          chest?: string | null
          city?: string | null
          created_at?: string | null
          email: string
          experience?: string | null
          eye_color?: string | null
          first_name: string
          gender: string
          hair_color?: string | null
          height?: string | null
          hips?: string | null
          id?: string
          instagram?: string | null
          last_name: string
          motivation?: string | null
          nationality?: string | null
          passage_number?: number | null
          phone: string
          photo_full_url?: string | null
          photo_portrait_url?: string | null
          photo_profile_url?: string | null
          portfolio_link?: string | null
          shoe_size?: string | null
          status?: string | null
          updated_at?: string | null
          waist?: string | null
          weight?: string | null
        }
        Update: {
          birth_date?: string | null
          chest?: string | null
          city?: string | null
          created_at?: string | null
          email?: string
          experience?: string | null
          eye_color?: string | null
          first_name?: string
          gender?: string
          hair_color?: string | null
          height?: string | null
          hips?: string | null
          id?: string
          instagram?: string | null
          last_name?: string
          motivation?: string | null
          nationality?: string | null
          passage_number?: number | null
          phone?: string
          photo_full_url?: string | null
          photo_portrait_url?: string | null
          photo_profile_url?: string | null
          portfolio_link?: string | null
          shoe_size?: string | null
          status?: string | null
          updated_at?: string | null
          waist?: string | null
          weight?: string | null
        }
        Relationships: []
      }
      jury_scores: {
        Row: {
          application_id: string
          created_at: string | null
          id: string
          jury_id: string | null
          jury_name: string | null
          notes: string | null
          overall: number | null
          photogenie: number | null
          physique: number | null
          potentiel: number | null
          presence: number | null
        }
        Insert: {
          application_id: string
          created_at?: string | null
          id?: string
          jury_id?: string | null
          jury_name?: string | null
          notes?: string | null
          overall?: number | null
          photogenie?: number | null
          physique?: number | null
          potentiel?: number | null
          presence?: number | null
        }
        Update: {
          application_id?: string
          created_at?: string | null
          id?: string
          jury_id?: string | null
          jury_name?: string | null
          notes?: string | null
          overall?: number | null
          photogenie?: number | null
          physique?: number | null
          potentiel?: number | null
          presence?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jury_scores_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "casting_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      model_distinctions: {
        Row: {
          id: string
          model_id: string
          name: string
          titles: string[] | null
        }
        Insert: {
          id?: string
          model_id: string
          name: string
          titles?: string[] | null
        }
        Update: {
          id?: string
          model_id?: string
          name?: string
          titles?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "model_distinctions_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
      models: {
        Row: {
          age: number | null
          categories: string[] | null
          chest: string | null
          created_at: string | null
          email: string | null
          experience: string | null
          gender: string
          height: string | null
          hips: string | null
          id: string
          image_url: string | null
          is_public: boolean | null
          journey: string | null
          level: string | null
          location: string | null
          name: string
          password_hash: string | null
          phone: string | null
          shoe_size: string | null
          updated_at: string | null
          user_id: string | null
          username: string | null
          waist: string | null
        }
        Insert: {
          age?: number | null
          categories?: string[] | null
          chest?: string | null
          created_at?: string | null
          email?: string | null
          experience?: string | null
          gender: string
          height?: string | null
          hips?: string | null
          id?: string
          image_url?: string | null
          is_public?: boolean | null
          journey?: string | null
          level?: string | null
          location?: string | null
          name: string
          password_hash?: string | null
          phone?: string | null
          shoe_size?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
          waist?: string | null
        }
        Update: {
          age?: number | null
          categories?: string[] | null
          chest?: string | null
          created_at?: string | null
          email?: string | null
          experience?: string | null
          gender?: string
          height?: string | null
          hips?: string | null
          id?: string
          image_url?: string | null
          is_public?: boolean | null
          journey?: string | null
          level?: string | null
          location?: string | null
          name?: string
          password_hash?: string | null
          phone?: string | null
          shoe_size?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
          waist?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          category: string | null
          created_at: string | null
          id: string
          method: string | null
          model_id: string
          model_name: string
          month: string
          notes: string | null
          payment_date: string | null
          status: string | null
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string | null
          id?: string
          method?: string | null
          model_id: string
          model_name: string
          month: string
          notes?: string | null
          payment_date?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string | null
          id?: string
          method?: string | null
          model_id?: string
          model_name?: string
          month?: string
          notes?: string | null
          payment_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "staff" | "jury" | "model"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff", "jury", "model"],
    },
  },
} as const
