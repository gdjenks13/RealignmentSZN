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
      conference_history: {
        Row: {
          conf_id: number
          end_year: string
          id: number
          previous_name: string
          start_year: string
        }
        Insert: {
          conf_id: number
          end_year: string
          id?: number
          previous_name: string
          start_year: string
        }
        Update: {
          conf_id?: number
          end_year?: string
          id?: number
          previous_name?: string
          start_year?: string
        }
        Relationships: [
          {
            foreignKeyName: "conference_history_conf_id_fkey"
            columns: ["conf_id"]
            isOneToOne: false
            referencedRelation: "conferences"
            referencedColumns: ["conf_id"]
          },
        ]
      }
      conferences: {
        Row: {
          conf_abbreviation: string | null
          conf_id: number
          conf_logo: string | null
          conf_longname: string | null
          conf_name: string
          end_year: number | null
          start_year: number
        }
        Insert: {
          conf_abbreviation?: string | null
          conf_id?: number
          conf_logo?: string | null
          conf_longname?: string | null
          conf_name: string
          end_year?: number | null
          start_year: number
        }
        Update: {
          conf_abbreviation?: string | null
          conf_id?: number
          conf_logo?: string | null
          conf_longname?: string | null
          conf_name?: string
          end_year?: number | null
          start_year?: number
        }
        Relationships: []
      }
      seasons: {
        Row: {
          conf_id: number
          season_id: number
          team_id: number
          year: number
        }
        Insert: {
          conf_id: number
          season_id?: number
          team_id: number
          year: number
        }
        Update: {
          conf_id?: number
          season_id?: number
          team_id?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "seasons_conf_id_fkey"
            columns: ["conf_id"]
            isOneToOne: false
            referencedRelation: "conferences"
            referencedColumns: ["conf_id"]
          },
          {
            foreignKeyName: "seasons_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_id"]
          },
        ]
      }
      teams: {
        Row: {
          city: string | null
          primary_color: string | null
          secondary_color: string | null
          state: string | null
          team_abbreviation: string | null
          team_id: number
          team_logo: string | null
          team_name: string
          team_nickname: string | null
        }
        Insert: {
          city?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          state?: string | null
          team_abbreviation?: string | null
          team_id?: number
          team_logo?: string | null
          team_name: string
          team_nickname?: string | null
        }
        Update: {
          city?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          state?: string | null
          team_abbreviation?: string | null
          team_id?: number
          team_logo?: string | null
          team_name?: string
          team_nickname?: string | null
        }
        Relationships: []
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
