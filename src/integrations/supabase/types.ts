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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_visible: boolean
          kind: string
          name: string
          parent_id: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean
          kind?: string
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean
          kind?: string
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      product_media: {
        Row: {
          created_at: string
          id: string
          media_type: string
          product_id: string
          sort_order: number
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          media_type?: string
          product_id: string
          sort_order?: number
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          media_type?: string
          product_id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_media_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          badge: string | null
          category_id: string | null
          cover_image: string | null
          created_at: string
          currency: string | null
          description: string | null
          features: string[] | null
          id: string
          moq: string | null
          price_max: number | null
          price_min: number | null
          seller_id: string | null
          slug: string
          specifications: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          badge?: string | null
          category_id?: string | null
          cover_image?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          features?: string[] | null
          id?: string
          moq?: string | null
          price_max?: number | null
          price_min?: number | null
          seller_id?: string | null
          slug: string
          specifications?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          badge?: string | null
          category_id?: string | null
          cover_image?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          features?: string[] | null
          id?: string
          moq?: string | null
          price_max?: number | null
          price_min?: number | null
          seller_id?: string | null
          slug?: string
          specifications?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          amenities: string[] | null
          area_sqm: number | null
          badge: string | null
          bathrooms: number | null
          bedrooms: number | null
          category_id: string | null
          city: string | null
          country: string | null
          cover_image: string | null
          created_at: string
          currency: string | null
          description: string | null
          id: string
          listing_type: string
          location: string | null
          price: number | null
          reference_number: string
          seller_id: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          amenities?: string[] | null
          area_sqm?: number | null
          badge?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          category_id?: string | null
          city?: string | null
          country?: string | null
          cover_image?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          listing_type?: string
          location?: string | null
          price?: number | null
          reference_number?: string
          seller_id?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          amenities?: string[] | null
          area_sqm?: number | null
          badge?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          category_id?: string | null
          city?: string | null
          country?: string | null
          cover_image?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          listing_type?: string
          location?: string | null
          price?: number | null
          reference_number?: string
          seller_id?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      property_media: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          media_type: string
          property_id: string
          sort_order: number
          url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          media_type?: string
          property_id: string
          sort_order?: number
          url: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          media_type?: string
          property_id?: string
          sort_order?: number
          url?: string
        }
        Relationships: []
      }
      quote_attachments: {
        Row: {
          created_at: string
          file_name: string | null
          id: string
          mime_type: string | null
          notes: string | null
          quote_id: string
          uploaded_by: string | null
          url: string
        }
        Insert: {
          created_at?: string
          file_name?: string | null
          id?: string
          mime_type?: string | null
          notes?: string | null
          quote_id: string
          uploaded_by?: string | null
          url: string
        }
        Update: {
          created_at?: string
          file_name?: string | null
          id?: string
          mime_type?: string | null
          notes?: string | null
          quote_id?: string
          uploaded_by?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_attachments_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_invoices: {
        Row: {
          amount: number
          created_at: string
          created_by: string | null
          crypto_payment_id: string | null
          currency: string
          id: string
          notes: string | null
          paid_at: string | null
          payment_method: string | null
          pdf_name: string | null
          pdf_url: string | null
          quote_id: string
          status: string
          stripe_session_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          created_by?: string | null
          crypto_payment_id?: string | null
          currency?: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          payment_method?: string | null
          pdf_name?: string | null
          pdf_url?: string | null
          quote_id: string
          status?: string
          stripe_session_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string | null
          crypto_payment_id?: string | null
          currency?: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          payment_method?: string | null
          pdf_name?: string | null
          pdf_url?: string | null
          quote_id?: string
          status?: string
          stripe_session_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quote_status_history: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          quote_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          quote_id: string
          status: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          quote_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_status_history_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          additional_info: string | null
          budget: string | null
          company: string
          country: string | null
          created_at: string
          custom_product: string | null
          delivery_timeline: string | null
          email: string
          id: string
          name: string
          phone: string | null
          products: string[] | null
          quantity: string | null
          reference_number: string
          specifications: string | null
          status: string
          updated_at: string
        }
        Insert: {
          additional_info?: string | null
          budget?: string | null
          company: string
          country?: string | null
          created_at?: string
          custom_product?: string | null
          delivery_timeline?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          products?: string[] | null
          quantity?: string | null
          reference_number: string
          specifications?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          additional_info?: string | null
          budget?: string | null
          company?: string
          country?: string | null
          created_at?: string
          custom_product?: string | null
          delivery_timeline?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          products?: string[] | null
          quantity?: string | null
          reference_number?: string
          specifications?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      sample_requests: {
        Row: {
          company: string | null
          country: string | null
          created_at: string
          email: string
          id: string
          name: string
          notes: string | null
          phone: string | null
          product_id: string | null
          product_title: string | null
          reference_number: string
          shipping_address: string
          status: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          country?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          product_id?: string | null
          product_title?: string | null
          reference_number?: string
          shipping_address: string
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          country?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          product_id?: string | null
          product_title?: string | null
          reference_number?: string
          shipping_address?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sample_requests_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      seller_applications: {
        Row: {
          business_type: string | null
          company_name: string
          created_at: string
          description: string | null
          id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          user_id: string
          website: string | null
        }
        Insert: {
          business_type?: string | null
          company_name: string
          created_at?: string
          description?: string | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          user_id: string
          website?: string | null
        }
        Update: {
          business_type?: string | null
          company_name?: string
          created_at?: string
          description?: string | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
    }
    Enums: {
      app_role: "admin" | "seller" | "user"
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
      app_role: ["admin", "seller", "user"],
    },
  },
} as const
