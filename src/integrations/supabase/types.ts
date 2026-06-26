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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          content: string | null
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          i18n: Json
          id: string
          is_published: boolean
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          i18n?: Json
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          i18n?: Json
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          created_at: string
          credential_id: string | null
          credential_url: string | null
          description: string | null
          display_order: number
          expiry_date: string | null
          i18n: Json
          id: string
          image_url: string | null
          is_visible: boolean
          issue_date: string | null
          issuer: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          credential_id?: string | null
          credential_url?: string | null
          description?: string | null
          display_order?: number
          expiry_date?: string | null
          i18n?: Json
          id?: string
          image_url?: string | null
          is_visible?: boolean
          issue_date?: string | null
          issuer?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          credential_id?: string | null
          credential_url?: string | null
          description?: string | null
          display_order?: number
          expiry_date?: string | null
          i18n?: Json
          id?: string
          image_url?: string | null
          is_visible?: boolean
          issue_date?: string | null
          issuer?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          end_year: number | null
          id: string
          is_current: boolean
          is_visible: boolean
          logo_url: string | null
          name: string
          role: string | null
          start_year: number | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          end_year?: number | null
          id?: string
          is_current?: boolean
          is_visible?: boolean
          logo_url?: string | null
          name: string
          role?: string | null
          start_year?: number | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          end_year?: number | null
          id?: string
          is_current?: boolean
          is_visible?: boolean
          logo_url?: string | null
          name?: string
          role?: string | null
          start_year?: number | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          duration: string | null
          i18n: Json
          id: string
          image_url: string | null
          is_visible: boolean
          learning_outcomes: string[]
          level: string | null
          link_url: string | null
          prerequisites: string[]
          slug: string
          title: string
          topics: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          duration?: string | null
          i18n?: Json
          id?: string
          image_url?: string | null
          is_visible?: boolean
          learning_outcomes?: string[]
          level?: string | null
          link_url?: string | null
          prerequisites?: string[]
          slug: string
          title: string
          topics?: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          duration?: string | null
          i18n?: Json
          id?: string
          image_url?: string | null
          is_visible?: boolean
          learning_outcomes?: string[]
          level?: string | null
          link_url?: string | null
          prerequisites?: string[]
          slug?: string
          title?: string
          topics?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string
          degree: string
          description: string | null
          display_order: number
          end_year: number | null
          field: string | null
          id: string
          institution: string
          is_visible: boolean
          start_year: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          degree: string
          description?: string | null
          display_order?: number
          end_year?: number | null
          field?: string | null
          id?: string
          institution: string
          is_visible?: boolean
          start_year?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          degree?: string
          description?: string | null
          display_order?: number
          end_year?: number | null
          field?: string | null
          id?: string
          institution?: string
          is_visible?: boolean
          start_year?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      error_logs: {
        Row: {
          created_at: string
          id: string
          kind: string | null
          message: string
          occurred_at: string
          route: string | null
          severity: string
          source: string
          stack: string | null
          url: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          kind?: string | null
          message: string
          occurred_at?: string
          route?: string | null
          severity?: string
          source?: string
          stack?: string | null
          url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string | null
          message?: string
          occurred_at?: string
          route?: string | null
          severity?: string
          source?: string
          stack?: string | null
          url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      home_content: {
        Row: {
          about_btn_label: string
          about_btn_url: string
          about_heading: string
          about_label: string
          courses_heading: string
          courses_label: string
          cta_btn_label: string
          cta_btn_url: string
          cta_heading: string
          cta_text: string
          hero_badge: string
          hero_btn1_label: string
          hero_btn1_url: string
          hero_btn2_label: string
          hero_btn2_url: string
          hero_btn3_label: string
          hero_btn3_url: string
          i18n: Json
          id: boolean
          partners_heading: string
          updated_at: string
        }
        Insert: {
          about_btn_label?: string
          about_btn_url?: string
          about_heading?: string
          about_label?: string
          courses_heading?: string
          courses_label?: string
          cta_btn_label?: string
          cta_btn_url?: string
          cta_heading?: string
          cta_text?: string
          hero_badge?: string
          hero_btn1_label?: string
          hero_btn1_url?: string
          hero_btn2_label?: string
          hero_btn2_url?: string
          hero_btn3_label?: string
          hero_btn3_url?: string
          i18n?: Json
          id?: boolean
          partners_heading?: string
          updated_at?: string
        }
        Update: {
          about_btn_label?: string
          about_btn_url?: string
          about_heading?: string
          about_label?: string
          courses_heading?: string
          courses_label?: string
          cta_btn_label?: string
          cta_btn_url?: string
          cta_heading?: string
          cta_text?: string
          hero_badge?: string
          hero_btn1_label?: string
          hero_btn1_url?: string
          hero_btn2_label?: string
          hero_btn2_url?: string
          hero_btn3_label?: string
          hero_btn3_url?: string
          i18n?: Json
          id?: boolean
          partners_heading?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          body: string
          created_at: string
          email: string
          id: string
          is_read: boolean
          name: string
          subject: string | null
        }
        Insert: {
          body: string
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          name: string
          subject?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      navigation_menu: {
        Row: {
          created_at: string
          id: string
          is_visible: boolean
          label: string
          label_en: string
          label_hy: string
          label_ru: string
          order_index: number
          path: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_visible?: boolean
          label: string
          label_en: string
          label_hy?: string
          label_ru?: string
          order_index?: number
          path: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_visible?: boolean
          label?: string
          label_en?: string
          label_hy?: string
          label_ru?: string
          order_index?: number
          path?: string
          updated_at?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          bio: string | null
          created_at: string
          cv_url: string | null
          email: string | null
          github_url: string | null
          i18n: Json
          id: string
          linkedin_url: string | null
          location: string | null
          name: string
          phone: string | null
          photo_url: string | null
          tagline: string | null
          title: string
          twitter_url: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          cv_url?: string | null
          email?: string | null
          github_url?: string | null
          i18n?: Json
          id?: string
          linkedin_url?: string | null
          location?: string | null
          name: string
          phone?: string | null
          photo_url?: string | null
          tagline?: string | null
          title: string
          twitter_url?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          cv_url?: string | null
          email?: string | null
          github_url?: string | null
          i18n?: Json
          id?: string
          linkedin_url?: string | null
          location?: string | null
          name?: string
          phone?: string | null
          photo_url?: string | null
          tagline?: string | null
          title?: string
          twitter_url?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          featured: boolean
          i18n: Json
          id: string
          image_url: string | null
          is_visible: boolean
          link_url: string | null
          repo_url: string | null
          slug: string
          summary: string | null
          tech_stack: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          featured?: boolean
          i18n?: Json
          id?: string
          image_url?: string | null
          is_visible?: boolean
          link_url?: string | null
          repo_url?: string | null
          slug: string
          summary?: string | null
          tech_stack?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          featured?: boolean
          i18n?: Json
          id?: string
          image_url?: string | null
          is_visible?: boolean
          link_url?: string | null
          repo_url?: string | null
          slug?: string
          summary?: string | null
          tech_stack?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          background_color: string
          contact_email: string | null
          id: boolean
          logo_url: string | null
          primary_color: string
          text_color: string
          updated_at: string
        }
        Insert: {
          background_color?: string
          contact_email?: string | null
          id?: boolean
          logo_url?: string | null
          primary_color?: string
          text_color?: string
          updated_at?: string
        }
        Update: {
          background_color?: string
          contact_email?: string | null
          id?: boolean
          logo_url?: string | null
          primary_color?: string
          text_color?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string
          display_order: number
          i18n: Json
          id: string
          is_visible: boolean
          level: number | null
          name: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          display_order?: number
          i18n?: Json
          id?: string
          is_visible?: boolean
          level?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          display_order?: number
          i18n?: Json
          id?: string
          is_visible?: boolean
          level?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      talks: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          event_date: string | null
          event_name: string | null
          i18n: Json
          id: string
          is_visible: boolean
          location: string | null
          slides_url: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          event_date?: string | null
          event_name?: string | null
          i18n?: Json
          id?: string
          is_visible?: boolean
          location?: string | null
          slides_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          event_date?: string | null
          event_name?: string | null
          i18n?: Json
          id?: string
          is_visible?: boolean
          location?: string | null
          slides_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
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
          role: Database["public"]["Enums"]["app_role"]
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
      video_courses: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          duration: string | null
          i18n: Json
          id: string
          is_visible: boolean
          platform: string | null
          slug: string
          thumbnail_url: string | null
          title: string
          topics: string[]
          updated_at: string
          video_url: string | null
          youtube_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          duration?: string | null
          i18n?: Json
          id?: string
          is_visible?: boolean
          platform?: string | null
          slug: string
          thumbnail_url?: string | null
          title: string
          topics?: string[]
          updated_at?: string
          video_url?: string | null
          youtube_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          duration?: string | null
          i18n?: Json
          id?: string
          is_visible?: boolean
          platform?: string | null
          slug?: string
          thumbnail_url?: string | null
          title?: string
          topics?: string[]
          updated_at?: string
          video_url?: string | null
          youtube_url?: string | null
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
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
