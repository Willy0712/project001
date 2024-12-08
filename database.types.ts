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
      app_users: {
        Row: {
          email: string | null
          fullName: string | null
          userCreatedAt: string | null
          userId: number
          userModifiedAt: string | null
        }
        Insert: {
          email?: string | null
          fullName?: string | null
          userCreatedAt?: string | null
          userId?: number
          userModifiedAt?: string | null
        }
        Update: {
          email?: string | null
          fullName?: string | null
          userCreatedAt?: string | null
          userId?: number
          userModifiedAt?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          categoryDescription: string | null
          categoryId: number
          categoryName: string | null
          createdAt: string
        }
        Insert: {
          categoryDescription?: string | null
          categoryId?: number
          categoryName?: string | null
          createdAt?: string
        }
        Update: {
          categoryDescription?: string | null
          categoryId?: number
          categoryName?: string | null
          createdAt?: string
        }
        Relationships: []
      }
      citites: {
        Row: {
          cityId: number
          cityName: string | null
          stateId: number | null
        }
        Insert: {
          cityId?: number
          cityName?: string | null
          stateId?: number | null
        }
        Update: {
          cityId?: number
          cityName?: string | null
          stateId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "citites_stateId_fkey"
            columns: ["stateId"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["stateId"]
          },
        ]
      }
      countries: {
        Row: {
          countryId: number
          countryName: string | null
        }
        Insert: {
          countryId?: number
          countryName?: string | null
        }
        Update: {
          countryId?: number
          countryName?: string | null
        }
        Relationships: []
      }
      locations: {
        Row: {
          cityId: number | null
          locationId: number
        }
        Insert: {
          cityId?: number | null
          locationId?: number
        }
        Update: {
          cityId?: number | null
          locationId?: number
        }
        Relationships: [
          {
            foreignKeyName: "locations_cityId_fkey"
            columns: ["cityId"]
            isOneToOne: false
            referencedRelation: "citites"
            referencedColumns: ["cityId"]
          },
        ]
      }
      media_table: {
        Row: {
          createdAt: string
          mediaId: number
          mediaType: string | null
          mediaURL: string | null
          newsId: number | null
        }
        Insert: {
          createdAt?: string
          mediaId?: number
          mediaType?: string | null
          mediaURL?: string | null
          newsId?: number | null
        }
        Update: {
          createdAt?: string
          mediaId?: number
          mediaType?: string | null
          mediaURL?: string | null
          newsId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_table_newsId_fkey"
            columns: ["newsId"]
            isOneToOne: false
            referencedRelation: "news"
            referencedColumns: ["newsId"]
          },
        ]
      }
      news: {
        Row: {
          categoryId: number | null
          createdAt: string
          modifiedAt: string | null
          newsDescription: string | null
          newsId: number
          newsTitle: string | null
          userId: number | null
        }
        Insert: {
          categoryId?: number | null
          createdAt?: string
          modifiedAt?: string | null
          newsDescription?: string | null
          newsId?: number
          newsTitle?: string | null
          userId?: number | null
        }
        Update: {
          categoryId?: number | null
          createdAt?: string
          modifiedAt?: string | null
          newsDescription?: string | null
          newsId?: number
          newsTitle?: string | null
          userId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "news_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["categoryId"]
          },
          {
            foreignKeyName: "news_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["userId"]
          },
        ]
      }
      news_location: {
        Row: {
          locationID: number
          newsId: number
        }
        Insert: {
          locationID: number
          newsId?: number
        }
        Update: {
          locationID?: number
          newsId?: number
        }
        Relationships: [
          {
            foreignKeyName: "news_location_locationID_fkey"
            columns: ["locationID"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["locationId"]
          },
          {
            foreignKeyName: "news_location_newsId_fkey"
            columns: ["newsId"]
            isOneToOne: false
            referencedRelation: "news"
            referencedColumns: ["newsId"]
          },
        ]
      }
      states: {
        Row: {
          countryId: number | null
          stateId: number
        }
        Insert: {
          countryId?: number | null
          stateId?: number
        }
        Update: {
          countryId?: number | null
          stateId?: number
        }
        Relationships: [
          {
            foreignKeyName: "states_countryId_fkey"
            columns: ["countryId"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["countryId"]
          },
        ]
      }
      sub_categories: {
        Row: {
          categoryId: number | null
          createdAt: string
          subCategoryDescription: string | null
          subCategoryId: number
          subCategoryName: string | null
        }
        Insert: {
          categoryId?: number | null
          createdAt?: string
          subCategoryDescription?: string | null
          subCategoryId?: number
          subCategoryName?: string | null
        }
        Update: {
          categoryId?: number | null
          createdAt?: string
          subCategoryDescription?: string | null
          subCategoryId?: number
          subCategoryName?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_categories_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["categoryId"]
          },
        ]
      }
      tags: {
        Row: {
          createdAt: string
          tagId: number
          tagName: string | null
        }
        Insert: {
          createdAt?: string
          tagId?: number
          tagName?: string | null
        }
        Update: {
          createdAt?: string
          tagId?: number
          tagName?: string | null
        }
        Relationships: []
      }
      votes: {
        Row: {
          createdAt: string
          newsId: number | null
          type: string | null
          userId: number | null
          votesId: number
        }
        Insert: {
          createdAt?: string
          newsId?: number | null
          type?: string | null
          userId?: number | null
          votesId?: number
        }
        Update: {
          createdAt?: string
          newsId?: number | null
          type?: string | null
          userId?: number | null
          votesId?: number
        }
        Relationships: [
          {
            foreignKeyName: "votes_newsId_fkey"
            columns: ["newsId"]
            isOneToOne: false
            referencedRelation: "news"
            referencedColumns: ["newsId"]
          },
          {
            foreignKeyName: "votes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["userId"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
