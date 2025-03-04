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
          imageURL: string | null
          userCreatedAt: string | null
          userId: number
          userModifiedAt: string | null
        }
        Insert: {
          email?: string | null
          fullName?: string | null
          imageURL?: string | null
          userCreatedAt?: string | null
          userId?: number
          userModifiedAt?: string | null
        }
        Update: {
          email?: string | null
          fullName?: string | null
          imageURL?: string | null
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
      comments: {
        Row: {
          commentId: number
          commentText: string | null
          createdAt: string
          newsId: number | null
          userId: number | null
        }
        Insert: {
          commentId?: number
          commentText?: string | null
          createdAt?: string
          newsId?: number | null
          userId?: number | null
        }
        Update: {
          commentId?: number
          commentText?: string | null
          createdAt?: string
          newsId?: number | null
          userId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_newsId_fkey"
            columns: ["newsId"]
            isOneToOne: false
            referencedRelation: "news"
            referencedColumns: ["newsId"]
          },
          {
            foreignKeyName: "comments_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["userId"]
          },
        ]
      }
      media_table: {
        Row: {
          createdAt: string
          id: number
          newsId: number | null
          type: string | null
          url: string | null
        }
        Insert: {
          createdAt?: string
          id?: number
          newsId?: number | null
          type?: string | null
          url?: string | null
        }
        Update: {
          createdAt?: string
          id?: number
          newsId?: number | null
          type?: string | null
          url?: string | null
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
          city: string | null
          country: string | null
          createdAt: string
          downVotes: number | null
          latitude: number | null
          longitude: number | null
          modifiedAt: string | null
          newsDescription: string | null
          newsId: number
          newsTitle: string | null
          state: string | null
          street: string | null
          subCategoryId: number | null
          upVotes: number | null
          userId: number | null
          votesScore: number | null
        }
        Insert: {
          categoryId?: number | null
          city?: string | null
          country?: string | null
          createdAt?: string
          downVotes?: number | null
          latitude?: number | null
          longitude?: number | null
          modifiedAt?: string | null
          newsDescription?: string | null
          newsId?: number
          newsTitle?: string | null
          state?: string | null
          street?: string | null
          subCategoryId?: number | null
          upVotes?: number | null
          userId?: number | null
          votesScore?: number | null
        }
        Update: {
          categoryId?: number | null
          city?: string | null
          country?: string | null
          createdAt?: string
          downVotes?: number | null
          latitude?: number | null
          longitude?: number | null
          modifiedAt?: string | null
          newsDescription?: string | null
          newsId?: number
          newsTitle?: string | null
          state?: string | null
          street?: string | null
          subCategoryId?: number | null
          upVotes?: number | null
          userId?: number | null
          votesScore?: number | null
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
            foreignKeyName: "news_subcategorId_fkey"
            columns: ["subCategoryId"]
            isOneToOne: false
            referencedRelation: "sub_categories"
            referencedColumns: ["subCategoryId"]
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
      votes: {
        Row: {
          createdAt: string
          newsId: number
          updatedAt: string | null
          userId: number
          voteId: number
          voteValue: number | null
        }
        Insert: {
          createdAt?: string
          newsId: number
          updatedAt?: string | null
          userId: number
          voteId?: number
          voteValue?: number | null
        }
        Update: {
          createdAt?: string
          newsId?: number
          updatedAt?: string | null
          userId?: number
          voteId?: number
          voteValue?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "votes_newsId_fkey"
            columns: ["newsId"]
            isOneToOne: true
            referencedRelation: "news"
            referencedColumns: ["newsId"]
          },
          {
            foreignKeyName: "votes_userId_fkey"
            columns: ["userId"]
            isOneToOne: true
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
