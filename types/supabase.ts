export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cities: {
        Row: {
          country_id: number | null
          created_at: string
          id: number
          name: string | null
          state_province: string | null
          updated_at: string | null
        }
        Insert: {
          country_id?: number | null
          created_at?: string
          id?: number
          name?: string | null
          state_province?: string | null
          updated_at?: string | null
        }
        Update: {
          country_id?: number | null
          created_at?: string
          id?: number
          name?: string | null
          state_province?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cities_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      city_images: {
        Row: {
          city_id: number | null
          created_at: string
          id: number
          url: string | null
        }
        Insert: {
          city_id?: number | null
          created_at?: string
          id?: number
          url?: string | null
        }
        Update: {
          city_id?: number | null
          created_at?: string
          id?: number
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "city_images_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          capital: string | null
          flag_img: string | null
          id: number
          img: string | null
          name: string | null
          region: string | null
          sub_region: string | null
        }
        Insert: {
          capital?: string | null
          flag_img?: string | null
          id?: never
          img?: string | null
          name?: string | null
          region?: string | null
          sub_region?: string | null
        }
        Update: {
          capital?: string | null
          flag_img?: string | null
          id?: never
          img?: string | null
          name?: string | null
          region?: string | null
          sub_region?: string | null
        }
        Relationships: []
      }
      user_profile: {
        Row: {
          bio: string | null
          cover_image: string | null
          created_at: string
          display_name: string | null
          id: number
          image: string | null
          role: Database["public"]["Enums"]["User Role"] | null
          updated_at: string
          user_id: string | null
          username: string | null
        }
        Insert: {
          bio?: string | null
          cover_image?: string | null
          created_at?: string
          display_name?: string | null
          id?: number
          image?: string | null
          role?: Database["public"]["Enums"]["User Role"] | null
          updated_at?: string
          user_id?: string | null
          username?: string | null
        }
        Update: {
          bio?: string | null
          cover_image?: string | null
          created_at?: string
          display_name?: string | null
          id?: number
          image?: string | null
          role?: Database["public"]["Enums"]["User Role"] | null
          updated_at?: string
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      visa_status: {
        Row: {
          created_at: string | null
          destination: number | null
          id: number
          notes: string | null
          passport: number | null
          status: Database["public"]["Enums"]["Visa Status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          destination?: number | null
          id?: never
          notes?: string | null
          passport?: number | null
          status?: Database["public"]["Enums"]["Visa Status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          destination?: number | null
          id?: never
          notes?: string | null
          passport?: number | null
          status?: Database["public"]["Enums"]["Visa Status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "visa_status_destination_fkey"
            columns: ["destination"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visa_status_passport_fkey"
            columns: ["passport"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_countries_without_cities: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          name: string
        }[]
      }
      get_distinct_passports: {
        Args: Record<PropertyKey, never>
        Returns: {
          passport: number
        }[]
      }
      get_passport_info_with_status: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          name: string
          capital: string
          region: string
          sub_region: string
          flag_img: string
        }[]
      }
    }
    Enums: {
      "User Role": "USER" | "STAFF" | "ADMIN"
      "Visa Status": "VISA-FREE" | "VISA_REQUIRED" | "VISA_FREE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      "User Role": ["USER", "STAFF", "ADMIN"],
      "Visa Status": ["VISA-FREE", "VISA_REQUIRED", "VISA_FREE"],
    },
  },
} as const
