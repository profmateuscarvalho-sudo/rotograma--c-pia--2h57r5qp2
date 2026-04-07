// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      events: {
        Row: {
          audio_url: string | null
          created_at: string
          id: string
          note: string | null
          photo_url: string | null
          photo_urls: string[] | null
          risk_type_id: string
          route_id: string
          segment_id: string
          timestamp: number
          user_id: string | null
          video_timestamp: string | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          id: string
          note?: string | null
          photo_url?: string | null
          photo_urls?: string[] | null
          risk_type_id: string
          route_id: string
          segment_id: string
          timestamp: number
          user_id?: string | null
          video_timestamp?: string | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          id?: string
          note?: string | null
          photo_url?: string | null
          photo_urls?: string[] | null
          risk_type_id?: string
          route_id?: string
          segment_id?: string
          timestamp?: number
          user_id?: string | null
          video_timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'events_route_id_fkey'
            columns: ['route_id']
            isOneToOne: false
            referencedRelation: 'routes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'events_segment_id_fkey'
            columns: ['segment_id']
            isOneToOne: false
            referencedRelation: 'segments'
            referencedColumns: ['id']
          },
        ]
      }
      observations: {
        Row: {
          audio_url: string | null
          created_at: string
          id: string
          note: string | null
          route_id: string
          segment_id: string
          timestamp: number
          user_id: string | null
          video_timestamp: string | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          id: string
          note?: string | null
          route_id: string
          segment_id: string
          timestamp: number
          user_id?: string | null
          video_timestamp?: string | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          id?: string
          note?: string | null
          route_id?: string
          segment_id?: string
          timestamp?: number
          user_id?: string | null
          video_timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'observations_route_id_fkey'
            columns: ['route_id']
            isOneToOne: false
            referencedRelation: 'routes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'observations_segment_id_fkey'
            columns: ['segment_id']
            isOneToOne: false
            referencedRelation: 'segments'
            referencedColumns: ['id']
          },
        ]
      }
      risks: {
        Row: {
          created_at: string
          description: string | null
          id: string
          severity: string
          sign_type: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          severity?: string
          sign_type?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          severity?: string
          sign_type?: string | null
          title?: string
        }
        Relationships: []
      }
      routes: {
        Row: {
          created_at: string
          date: string
          destination: string
          evaluator: string
          id: string
          name: string
          origin: string
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date: string
          destination: string
          evaluator: string
          id: string
          name: string
          origin: string
          status?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          destination?: string
          evaluator?: string
          id?: string
          name?: string
          origin?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      segments: {
        Row: {
          created_at: string
          end_km: number
          id: string
          number: number
          route_id: string
          start_km: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          end_km: number
          id: string
          number: number
          route_id: string
          start_km: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          end_km?: number
          id?: string
          number?: number
          route_id?: string
          start_km?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'segments_route_id_fkey'
            columns: ['route_id']
            isOneToOne: false
            referencedRelation: 'routes'
            referencedColumns: ['id']
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

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: events
//   id: uuid (not null)
//   user_id: uuid (nullable)
//   route_id: uuid (not null)
//   segment_id: uuid (not null)
//   risk_type_id: text (not null)
//   timestamp: bigint (not null)
//   note: text (nullable)
//   photo_url: text (nullable)
//   audio_url: text (nullable)
//   video_timestamp: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   photo_urls: _text (nullable, default: '{}'::text[])
// Table: observations
//   id: uuid (not null)
//   user_id: uuid (nullable)
//   route_id: uuid (not null)
//   segment_id: uuid (not null)
//   note: text (nullable)
//   audio_url: text (nullable)
//   video_timestamp: text (nullable)
//   timestamp: bigint (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: risks
//   id: uuid (not null, default: gen_random_uuid())
//   title: text (not null)
//   description: text (nullable)
//   severity: text (not null, default: 'medium'::text)
//   created_at: timestamp with time zone (not null, default: now())
//   sign_type: text (nullable)
// Table: routes
//   id: uuid (not null)
//   user_id: uuid (nullable)
//   name: text (not null)
//   origin: text (not null)
//   destination: text (not null)
//   evaluator: text (not null)
//   date: timestamp with time zone (not null)
//   status: text (not null, default: 'em_andamento'::text)
//   created_at: timestamp with time zone (not null, default: now())
// Table: segments
//   id: uuid (not null)
//   user_id: uuid (nullable)
//   route_id: uuid (not null)
//   number: integer (not null)
//   start_km: numeric (not null)
//   end_km: numeric (not null)
//   created_at: timestamp with time zone (not null, default: now())

// --- CONSTRAINTS ---
// Table: events
//   PRIMARY KEY events_pkey: PRIMARY KEY (id)
//   FOREIGN KEY events_route_id_fkey: FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
//   FOREIGN KEY events_segment_id_fkey: FOREIGN KEY (segment_id) REFERENCES segments(id) ON DELETE CASCADE
//   FOREIGN KEY events_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: observations
//   PRIMARY KEY observations_pkey: PRIMARY KEY (id)
//   FOREIGN KEY observations_route_id_fkey: FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
//   FOREIGN KEY observations_segment_id_fkey: FOREIGN KEY (segment_id) REFERENCES segments(id) ON DELETE CASCADE
//   FOREIGN KEY observations_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: risks
//   PRIMARY KEY risks_pkey: PRIMARY KEY (id)
// Table: routes
//   PRIMARY KEY routes_pkey: PRIMARY KEY (id)
//   FOREIGN KEY routes_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: segments
//   PRIMARY KEY segments_pkey: PRIMARY KEY (id)
//   FOREIGN KEY segments_route_id_fkey: FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
//   FOREIGN KEY segments_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE

// --- ROW LEVEL SECURITY POLICIES ---
// Table: events
//   Policy "Users can manage their own events" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = user_id)
//     WITH CHECK: (auth.uid() = user_id)
// Table: observations
//   Policy "Users can manage their own observations" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = user_id)
//     WITH CHECK: (auth.uid() = user_id)
// Table: risks
//   Policy "authenticated_delete_risks" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert_risks" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select_risks" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update_risks" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: routes
//   Policy "Users can manage their own routes" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = user_id)
//     WITH CHECK: (auth.uid() = user_id)
// Table: segments
//   Policy "Users can manage their own segments" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = user_id)
//     WITH CHECK: (auth.uid() = user_id)
