// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
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
      attendance: {
        Row: {
          created_at: string
          date: string
          id: string
          status: string
          student_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          status: string
          student_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      deactivation_reasons: {
        Row: {
          created_at: string
          id: string
          reason: string
        }
        Insert: {
          created_at?: string
          id?: string
          reason: string
        }
        Update: {
          created_at?: string
          id?: string
          reason?: string
        }
        Relationships: []
      }
      employee_contracts: {
        Row: {
          contract_type: string
          created_at: string
          document_url: string | null
          employee_id: string
          end_date: string | null
          id: string
          salary: number | null
          start_date: string | null
          working_hours: string | null
        }
        Insert: {
          contract_type: string
          created_at?: string
          document_url?: string | null
          employee_id: string
          end_date?: string | null
          id?: string
          salary?: number | null
          start_date?: string | null
          working_hours?: string | null
        }
        Update: {
          contract_type?: string
          created_at?: string
          document_url?: string | null
          employee_id?: string
          end_date?: string | null
          id?: string
          salary?: number | null
          start_date?: string | null
          working_hours?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_contracts_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_feedbacks: {
        Row: {
          comments: string
          created_at: string
          date: string
          employee_id: string
          evaluator_name: string | null
          id: string
          type: string
        }
        Insert: {
          comments: string
          created_at?: string
          date: string
          employee_id: string
          evaluator_name?: string | null
          id?: string
          type: string
        }
        Update: {
          comments?: string
          created_at?: string
          date?: string
          employee_id?: string
          evaluator_name?: string | null
          id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_feedbacks_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_questionnaires: {
        Row: {
          created_at: string
          employee_id: string
          id: string
          notes: string | null
          response_date: string | null
          sent_date: string | null
          status: string
          title: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          id?: string
          notes?: string | null
          response_date?: string | null
          sent_date?: string | null
          status?: string
          title: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          id?: string
          notes?: string | null
          response_date?: string | null
          sent_date?: string | null
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_questionnaires_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_time_logs: {
        Row: {
          break_end: string | null
          break_start: string | null
          clock_in: string | null
          clock_out: string | null
          created_at: string
          date: string
          employee_id: string
          id: string
          notes: string | null
        }
        Insert: {
          break_end?: string | null
          break_start?: string | null
          clock_in?: string | null
          clock_out?: string | null
          created_at?: string
          date: string
          employee_id: string
          id?: string
          notes?: string | null
        }
        Update: {
          break_end?: string | null
          break_start?: string | null
          clock_in?: string | null
          clock_out?: string | null
          created_at?: string
          date?: string
          employee_id?: string
          id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_time_logs_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          cpf: string | null
          created_at: string
          department: string | null
          email: string | null
          hire_date: string | null
          id: string
          name: string
          phone: string | null
          position: string | null
          status: string
        }
        Insert: {
          cpf?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          hire_date?: string | null
          id?: string
          name: string
          phone?: string | null
          position?: string | null
          status?: string
        }
        Update: {
          cpf?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          hire_date?: string | null
          id?: string
          name?: string
          phone?: string | null
          position?: string | null
          status?: string
        }
        Relationships: []
      }
      income_categories: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      income_records: {
        Row: {
          amount: number
          category: string
          created_at: string
          date: string
          description: string
          id: string
          installments: number | null
          payment_method: string
          student_id: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          date?: string
          description: string
          id?: string
          installments?: number | null
          payment_method: string
          student_id?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          date?: string
          description?: string
          id?: string
          installments?: number | null
          payment_method?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "income_records_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          contact_info: string | null
          created_at: string
          id: string
          interest: string
          modality_interest: string | null
          name: string
          notes: string | null
          party_date: string | null
          source: string
          status: string
        }
        Insert: {
          contact_info?: string | null
          created_at?: string
          id?: string
          interest: string
          modality_interest?: string | null
          name: string
          notes?: string | null
          party_date?: string | null
          source: string
          status?: string
        }
        Update: {
          contact_info?: string | null
          created_at?: string
          id?: string
          interest?: string
          modality_interest?: string | null
          name?: string
          notes?: string | null
          party_date?: string | null
          source?: string
          status?: string
        }
        Relationships: []
      }
      modalities: {
        Row: {
          age_range: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          age_range?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          age_range?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      party_bookings: {
        Row: {
          birthday_person_age: number | null
          birthday_person_name: string | null
          created_at: string
          event_date: string
          event_time: string
          guardian_name: string
          guardian_whatsapp: string
          id: string
          installments: string | null
          is_student: boolean
          observations: string | null
          package_name: string
          payment_method: string | null
          payment_status: string
          total_value: string | null
        }
        Insert: {
          birthday_person_age?: number | null
          birthday_person_name?: string | null
          created_at?: string
          event_date: string
          event_time: string
          guardian_name: string
          guardian_whatsapp: string
          id?: string
          installments?: string | null
          is_student?: boolean
          observations?: string | null
          package_name: string
          payment_method?: string | null
          payment_status?: string
          total_value?: string | null
        }
        Update: {
          birthday_person_age?: number | null
          birthday_person_name?: string | null
          created_at?: string
          event_date?: string
          event_time?: string
          guardian_name?: string
          guardian_whatsapp?: string
          id?: string
          installments?: string | null
          is_student?: boolean
          observations?: string | null
          package_name?: string
          payment_method?: string | null
          payment_status?: string
          total_value?: string | null
        }
        Relationships: []
      }
      plan_renewals: {
        Row: {
          created_at: string
          discount: string | null
          end_date: string | null
          frequency: string | null
          id: string
          monthly_value: string | null
          payment_method: string | null
          plan_name: string | null
          start_date: string | null
          student_id: string
          total_value: string | null
        }
        Insert: {
          created_at?: string
          discount?: string | null
          end_date?: string | null
          frequency?: string | null
          id?: string
          monthly_value?: string | null
          payment_method?: string | null
          plan_name?: string | null
          start_date?: string | null
          student_id: string
          total_value?: string | null
        }
        Update: {
          created_at?: string
          discount?: string | null
          end_date?: string | null
          frequency?: string | null
          id?: string
          monthly_value?: string | null
          payment_method?: string | null
          plan_name?: string | null
          start_date?: string | null
          student_id?: string
          total_value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plan_renewals_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      pre_enrollments: {
        Row: {
          child_activities: string | null
          child_age: number | null
          child_dob: string | null
          child_health_issues: string | null
          child_medication: string | null
          child_name: string | null
          class_schedule: string | null
          class_value: string | null
          contract_plan: string | null
          created_at: string
          discount: string | null
          frequency: string | null
          guardian_cpf: string | null
          guardian_email: string | null
          guardian_name: string | null
          guardian_relationship: string | null
          guardian_whatsapp: string | null
          guardian2_name: string | null
          guardian2_relationship: string | null
          guardian2_whatsapp: string | null
          has_second_guardian: boolean
          id: string
          modalities: Json | null
          monthly_value: string | null
          payment_method: string | null
          status: string
          total_value: string | null
          zapsign_contract_id: string | null
          zapsign_contract_url: string | null
        }
        Insert: {
          child_activities?: string | null
          child_age?: number | null
          child_dob?: string | null
          child_health_issues?: string | null
          child_medication?: string | null
          child_name?: string | null
          class_schedule?: string | null
          class_value?: string | null
          contract_plan?: string | null
          created_at?: string
          discount?: string | null
          frequency?: string | null
          guardian_cpf?: string | null
          guardian_email?: string | null
          guardian_name?: string | null
          guardian_relationship?: string | null
          guardian_whatsapp?: string | null
          guardian2_name?: string | null
          guardian2_relationship?: string | null
          guardian2_whatsapp?: string | null
          has_second_guardian?: boolean
          id?: string
          modalities?: Json | null
          monthly_value?: string | null
          payment_method?: string | null
          status?: string
          total_value?: string | null
          zapsign_contract_id?: string | null
          zapsign_contract_url?: string | null
        }
        Update: {
          child_activities?: string | null
          child_age?: number | null
          child_dob?: string | null
          child_health_issues?: string | null
          child_medication?: string | null
          child_name?: string | null
          class_schedule?: string | null
          class_value?: string | null
          contract_plan?: string | null
          created_at?: string
          discount?: string | null
          frequency?: string | null
          guardian_cpf?: string | null
          guardian_email?: string | null
          guardian_name?: string | null
          guardian_relationship?: string | null
          guardian_whatsapp?: string | null
          guardian2_name?: string | null
          guardian2_relationship?: string | null
          guardian2_whatsapp?: string | null
          has_second_guardian?: boolean
          id?: string
          modalities?: Json | null
          monthly_value?: string | null
          payment_method?: string | null
          status?: string
          total_value?: string | null
          zapsign_contract_id?: string | null
          zapsign_contract_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name?: string | null
          role?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          role?: string
        }
        Relationships: []
      }
      schedules: {
        Row: {
          created_at: string
          day_of_week: string
          end_time: string | null
          id: string
          modality_id: string
          time: string
        }
        Insert: {
          created_at?: string
          day_of_week: string
          end_time?: string | null
          id?: string
          modality_id: string
          time: string
        }
        Update: {
          created_at?: string
          day_of_week?: string
          end_time?: string | null
          id?: string
          modality_id?: string
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedules_modality_id_fkey"
            columns: ["modality_id"]
            isOneToOne: false
            referencedRelation: "modalities"
            referencedColumns: ["id"]
          },
        ]
      }
      student_activity_logs: {
        Row: {
          change_type: string
          changed_by: string | null
          changed_by_email: string | null
          created_at: string
          description: string
          id: string
          student_id: string
        }
        Insert: {
          change_type: string
          changed_by?: string | null
          changed_by_email?: string | null
          created_at?: string
          description: string
          id?: string
          student_id: string
        }
        Update: {
          change_type?: string
          changed_by?: string | null
          changed_by_email?: string | null
          created_at?: string
          description?: string
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_activity_logs_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          child_activities: string | null
          child_age: number | null
          child_dob: string | null
          child_health_issues: string | null
          child_medication: string | null
          child_name: string | null
          contract_plan: string | null
          contract_status: string
          created_at: string
          discount: string | null
          end_date: string | null
          frequency: string | null
          guardian_cpf: string | null
          guardian_email: string | null
          guardian_name: string | null
          guardian_relationship: string | null
          guardian_whatsapp: string | null
          guardian2_name: string | null
          guardian2_relationship: string | null
          guardian2_whatsapp: string | null
          has_second_guardian: boolean
          id: string
          is_permuta: boolean
          makeup_balance: number
          modalities: Json | null
          monthly_value: string | null
          payment_method: string | null
          pre_enrollment_id: string | null
          schedules: Json | null
          start_date: string | null
          total_value: string | null
          zapsign_contract_id: string | null
          zapsign_contract_url: string | null
        }
        Insert: {
          child_activities?: string | null
          child_age?: number | null
          child_dob?: string | null
          child_health_issues?: string | null
          child_medication?: string | null
          child_name?: string | null
          contract_plan?: string | null
          contract_status?: string
          created_at?: string
          discount?: string | null
          end_date?: string | null
          frequency?: string | null
          guardian_cpf?: string | null
          guardian_email?: string | null
          guardian_name?: string | null
          guardian_relationship?: string | null
          guardian_whatsapp?: string | null
          guardian2_name?: string | null
          guardian2_relationship?: string | null
          guardian2_whatsapp?: string | null
          has_second_guardian?: boolean
          id?: string
          is_permuta?: boolean
          makeup_balance?: number
          modalities?: Json | null
          monthly_value?: string | null
          payment_method?: string | null
          pre_enrollment_id?: string | null
          schedules?: Json | null
          start_date?: string | null
          total_value?: string | null
          zapsign_contract_id?: string | null
          zapsign_contract_url?: string | null
        }
        Update: {
          child_activities?: string | null
          child_age?: number | null
          child_dob?: string | null
          child_health_issues?: string | null
          child_medication?: string | null
          child_name?: string | null
          contract_plan?: string | null
          contract_status?: string
          created_at?: string
          discount?: string | null
          end_date?: string | null
          frequency?: string | null
          guardian_cpf?: string | null
          guardian_email?: string | null
          guardian_name?: string | null
          guardian_relationship?: string | null
          guardian_whatsapp?: string | null
          guardian2_name?: string | null
          guardian2_relationship?: string | null
          guardian2_whatsapp?: string | null
          has_second_guardian?: boolean
          id?: string
          is_permuta?: boolean
          makeup_balance?: number
          modalities?: Json | null
          monthly_value?: string | null
          payment_method?: string | null
          pre_enrollment_id?: string | null
          schedules?: Json | null
          start_date?: string | null
          total_value?: string | null
          zapsign_contract_id?: string | null
          zapsign_contract_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_pre_enrollment_id_fkey"
            columns: ["pre_enrollment_id"]
            isOneToOne: false
            referencedRelation: "pre_enrollments"
            referencedColumns: ["id"]
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
// Table: attendance
//   id: uuid (not null, default: gen_random_uuid())
//   student_id: uuid (not null)
//   date: date (not null)
//   status: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: deactivation_reasons
//   id: uuid (not null, default: gen_random_uuid())
//   reason: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: employee_contracts
//   id: uuid (not null, default: gen_random_uuid())
//   employee_id: uuid (not null)
//   contract_type: text (not null)
//   start_date: date (nullable)
//   end_date: date (nullable)
//   salary: numeric (nullable)
//   working_hours: text (nullable)
//   document_url: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: employee_feedbacks
//   id: uuid (not null, default: gen_random_uuid())
//   employee_id: uuid (not null)
//   date: date (not null)
//   type: text (not null)
//   comments: text (not null)
//   evaluator_name: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: employee_questionnaires
//   id: uuid (not null, default: gen_random_uuid())
//   employee_id: uuid (not null)
//   title: text (not null)
//   sent_date: date (nullable)
//   status: text (not null, default: 'Pendente'::text)
//   response_date: date (nullable)
//   notes: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: employee_time_logs
//   id: uuid (not null, default: gen_random_uuid())
//   employee_id: uuid (not null)
//   date: date (not null)
//   clock_in: time without time zone (nullable)
//   break_start: time without time zone (nullable)
//   break_end: time without time zone (nullable)
//   clock_out: time without time zone (nullable)
//   notes: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: employees
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   email: text (nullable)
//   cpf: text (nullable)
//   phone: text (nullable)
//   position: text (nullable)
//   department: text (nullable)
//   status: text (not null, default: 'Ativo'::text)
//   hire_date: date (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: income_categories
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: income_records
//   id: uuid (not null, default: gen_random_uuid())
//   description: text (not null)
//   category: text (not null)
//   amount: numeric (not null)
//   payment_method: text (not null)
//   installments: integer (nullable, default: 1)
//   student_id: uuid (nullable)
//   date: date (not null, default: CURRENT_DATE)
//   created_at: timestamp with time zone (not null, default: now())
// Table: leads
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   contact_info: text (nullable)
//   source: text (not null)
//   interest: text (not null)
//   notes: text (nullable)
//   status: text (not null, default: 'Aberto'::text)
//   created_at: timestamp with time zone (not null, default: now())
//   modality_interest: text (nullable)
//   party_date: date (nullable)
// Table: modalities
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
//   age_range: text (nullable)
// Table: party_bookings
//   id: uuid (not null, default: gen_random_uuid())
//   guardian_name: text (not null)
//   guardian_whatsapp: text (not null)
//   event_date: date (not null)
//   event_time: text (not null)
//   package_name: text (not null)
//   payment_status: text (not null, default: 'pending'::text)
//   is_student: boolean (not null, default: false)
//   total_value: text (nullable)
//   observations: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   payment_method: text (nullable)
//   installments: text (nullable)
//   birthday_person_name: text (nullable)
//   birthday_person_age: integer (nullable)
// Table: plan_renewals
//   id: uuid (not null, default: gen_random_uuid())
//   student_id: uuid (not null)
//   plan_name: text (nullable)
//   start_date: date (nullable)
//   end_date: date (nullable)
//   monthly_value: text (nullable)
//   total_value: text (nullable)
//   payment_method: text (nullable)
//   frequency: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   discount: text (nullable)
// Table: pre_enrollments
//   id: uuid (not null, default: gen_random_uuid())
//   created_at: timestamp with time zone (not null, default: now())
//   child_name: text (nullable)
//   child_age: integer (nullable)
//   child_dob: date (nullable)
//   child_activities: text (nullable)
//   child_medication: text (nullable)
//   child_health_issues: text (nullable)
//   guardian_name: text (nullable)
//   guardian_whatsapp: text (nullable)
//   guardian_cpf: text (nullable)
//   guardian_relationship: text (nullable)
//   guardian_email: text (nullable)
//   has_second_guardian: boolean (not null, default: false)
//   guardian2_name: text (nullable)
//   guardian2_whatsapp: text (nullable)
//   guardian2_relationship: text (nullable)
//   status: text (not null, default: 'Aguardando'::text)
//   class_schedule: text (nullable)
//   class_value: text (nullable)
//   zapsign_contract_id: text (nullable)
//   zapsign_contract_url: text (nullable)
//   modalities: jsonb (nullable, default: '[]'::jsonb)
//   contract_plan: text (nullable)
//   frequency: text (nullable)
//   total_value: text (nullable)
//   monthly_value: text (nullable)
//   payment_method: text (nullable)
//   discount: text (nullable)
// Table: profiles
//   id: uuid (not null)
//   email: text (not null)
//   name: text (nullable)
//   role: text (not null, default: 'admin'::text)
//   created_at: timestamp with time zone (not null, default: now())
// Table: schedules
//   id: uuid (not null, default: gen_random_uuid())
//   modality_id: uuid (not null)
//   day_of_week: text (not null)
//   time: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
//   end_time: text (nullable)
// Table: student_activity_logs
//   id: uuid (not null, default: gen_random_uuid())
//   student_id: uuid (not null)
//   changed_by: uuid (nullable)
//   changed_by_email: text (nullable)
//   change_type: text (not null)
//   description: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: students
//   id: uuid (not null, default: gen_random_uuid())
//   pre_enrollment_id: uuid (nullable)
//   child_name: text (nullable)
//   child_age: integer (nullable)
//   child_dob: date (nullable)
//   child_activities: text (nullable)
//   child_medication: text (nullable)
//   child_health_issues: text (nullable)
//   guardian_name: text (nullable)
//   guardian_whatsapp: text (nullable)
//   guardian_cpf: text (nullable)
//   guardian_relationship: text (nullable)
//   guardian_email: text (nullable)
//   has_second_guardian: boolean (not null, default: false)
//   guardian2_name: text (nullable)
//   guardian2_whatsapp: text (nullable)
//   guardian2_relationship: text (nullable)
//   start_date: date (nullable)
//   end_date: date (nullable)
//   contract_plan: text (nullable)
//   frequency: text (nullable)
//   total_value: text (nullable)
//   monthly_value: text (nullable)
//   payment_method: text (nullable)
//   modalities: jsonb (nullable, default: '[]'::jsonb)
//   schedules: jsonb (nullable, default: '[]'::jsonb)
//   contract_status: text (not null, default: 'Aguardando'::text)
//   zapsign_contract_id: text (nullable)
//   zapsign_contract_url: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   makeup_balance: integer (not null, default: 0)
//   is_permuta: boolean (not null, default: false)
//   discount: text (nullable)

// --- CONSTRAINTS ---
// Table: attendance
//   PRIMARY KEY attendance_pkey: PRIMARY KEY (id)
//   CHECK attendance_status_check: CHECK ((status = ANY (ARRAY['present'::text, 'absent'::text])))
//   UNIQUE attendance_student_id_date_key: UNIQUE (student_id, date)
//   FOREIGN KEY attendance_student_id_fkey: FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
// Table: deactivation_reasons
//   PRIMARY KEY deactivation_reasons_pkey: PRIMARY KEY (id)
//   UNIQUE deactivation_reasons_reason_key: UNIQUE (reason)
// Table: employee_contracts
//   FOREIGN KEY employee_contracts_employee_id_fkey: FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
//   PRIMARY KEY employee_contracts_pkey: PRIMARY KEY (id)
// Table: employee_feedbacks
//   FOREIGN KEY employee_feedbacks_employee_id_fkey: FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
//   PRIMARY KEY employee_feedbacks_pkey: PRIMARY KEY (id)
// Table: employee_questionnaires
//   FOREIGN KEY employee_questionnaires_employee_id_fkey: FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
//   PRIMARY KEY employee_questionnaires_pkey: PRIMARY KEY (id)
// Table: employee_time_logs
//   FOREIGN KEY employee_time_logs_employee_id_fkey: FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
//   PRIMARY KEY employee_time_logs_pkey: PRIMARY KEY (id)
// Table: employees
//   PRIMARY KEY employees_pkey: PRIMARY KEY (id)
// Table: income_categories
//   UNIQUE income_categories_name_key: UNIQUE (name)
//   PRIMARY KEY income_categories_pkey: PRIMARY KEY (id)
// Table: income_records
//   PRIMARY KEY income_records_pkey: PRIMARY KEY (id)
//   FOREIGN KEY income_records_student_id_fkey: FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL
// Table: leads
//   PRIMARY KEY leads_pkey: PRIMARY KEY (id)
// Table: modalities
//   PRIMARY KEY modalities_pkey: PRIMARY KEY (id)
// Table: party_bookings
//   UNIQUE party_bookings_event_date_key: UNIQUE (event_date)
//   CHECK party_bookings_payment_status_check: CHECK ((payment_status = ANY (ARRAY['pending'::text, 'partial'::text, 'paid'::text])))
//   PRIMARY KEY party_bookings_pkey: PRIMARY KEY (id)
// Table: plan_renewals
//   PRIMARY KEY plan_renewals_pkey: PRIMARY KEY (id)
//   FOREIGN KEY plan_renewals_student_id_fkey: FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
// Table: pre_enrollments
//   PRIMARY KEY pre_enrollments_pkey: PRIMARY KEY (id)
// Table: profiles
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
// Table: schedules
//   FOREIGN KEY schedules_modality_id_fkey: FOREIGN KEY (modality_id) REFERENCES modalities(id) ON DELETE CASCADE
//   PRIMARY KEY schedules_pkey: PRIMARY KEY (id)
// Table: student_activity_logs
//   FOREIGN KEY student_activity_logs_changed_by_fkey: FOREIGN KEY (changed_by) REFERENCES auth.users(id) ON DELETE SET NULL
//   PRIMARY KEY student_activity_logs_pkey: PRIMARY KEY (id)
//   FOREIGN KEY student_activity_logs_student_id_fkey: FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
// Table: students
//   PRIMARY KEY students_pkey: PRIMARY KEY (id)
//   FOREIGN KEY students_pre_enrollment_id_fkey: FOREIGN KEY (pre_enrollment_id) REFERENCES pre_enrollments(id) ON DELETE SET NULL

// --- ROW LEVEL SECURITY POLICIES ---
// Table: attendance
//   Policy "authenticated_all_attendance" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: deactivation_reasons
//   Policy "authenticated_all_deactivation_reasons" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: employee_contracts
//   Policy "hr_only_employee_contracts" (ALL, PERMISSIVE) roles={authenticated}
//     USING: ((auth.jwt() ->> 'email'::text) = 'mateus@cetkids.com.br'::text)
//     WITH CHECK: ((auth.jwt() ->> 'email'::text) = 'mateus@cetkids.com.br'::text)
// Table: employee_feedbacks
//   Policy "hr_only_employee_feedbacks" (ALL, PERMISSIVE) roles={authenticated}
//     USING: ((auth.jwt() ->> 'email'::text) = 'mateus@cetkids.com.br'::text)
//     WITH CHECK: ((auth.jwt() ->> 'email'::text) = 'mateus@cetkids.com.br'::text)
// Table: employee_questionnaires
//   Policy "hr_only_employee_questionnaires" (ALL, PERMISSIVE) roles={authenticated}
//     USING: ((auth.jwt() ->> 'email'::text) = 'mateus@cetkids.com.br'::text)
//     WITH CHECK: ((auth.jwt() ->> 'email'::text) = 'mateus@cetkids.com.br'::text)
// Table: employee_time_logs
//   Policy "hr_only_employee_time_logs" (ALL, PERMISSIVE) roles={authenticated}
//     USING: ((auth.jwt() ->> 'email'::text) = 'mateus@cetkids.com.br'::text)
//     WITH CHECK: ((auth.jwt() ->> 'email'::text) = 'mateus@cetkids.com.br'::text)
// Table: employees
//   Policy "hr_only_employees" (ALL, PERMISSIVE) roles={authenticated}
//     USING: ((auth.jwt() ->> 'email'::text) = 'mateus@cetkids.com.br'::text)
//     WITH CHECK: ((auth.jwt() ->> 'email'::text) = 'mateus@cetkids.com.br'::text)
// Table: income_categories
//   Policy "authenticated_all_income_categories" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: income_records
//   Policy "authenticated_all_income_records" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: leads
//   Policy "authenticated_all_leads" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: modalities
//   Policy "anon_select_modalities" (SELECT, PERMISSIVE) roles={anon}
//     USING: true
//   Policy "authenticated_all_modalities" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: party_bookings
//   Policy "authenticated_all_party_bookings" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: plan_renewals
//   Policy "authenticated_all_plan_renewals" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: pre_enrollments
//   Policy "Allow public insert to pre_enrollments" (INSERT, PERMISSIVE) roles={anon,authenticated}
//     WITH CHECK: true
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: profiles
//   Policy "authenticated_all_profiles" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: schedules
//   Policy "anon_select_schedules" (SELECT, PERMISSIVE) roles={anon}
//     USING: true
//   Policy "authenticated_all_schedules" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: student_activity_logs
//   Policy "authenticated_insert_student_activity_logs" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select_student_activity_logs" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: students
//   Policy "authenticated_all_students" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true

// --- DATABASE FUNCTIONS ---
// FUNCTION handle_new_user()
//   CREATE OR REPLACE FUNCTION public.handle_new_user()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     INSERT INTO public.profiles (id, email, role)
//     VALUES (NEW.id, NEW.email, 'admin')
//     ON CONFLICT (id) DO NOTHING;
//     RETURN NEW;
//   END;
//   $function$
//   

// --- INDEXES ---
// Table: attendance
//   CREATE UNIQUE INDEX attendance_student_id_date_key ON public.attendance USING btree (student_id, date)
// Table: deactivation_reasons
//   CREATE UNIQUE INDEX deactivation_reasons_reason_key ON public.deactivation_reasons USING btree (reason)
// Table: income_categories
//   CREATE UNIQUE INDEX income_categories_name_key ON public.income_categories USING btree (name)
// Table: party_bookings
//   CREATE UNIQUE INDEX party_bookings_event_date_key ON public.party_bookings USING btree (event_date)

