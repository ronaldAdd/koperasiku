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
      anggota: {
        Row: {
          alamat: string | null
          auth_user_id: string | null
          created_at: string | null
          email: string | null
          id: number
          nama: string
          nomor_anggota: string
          telepon: number | null
          updated_at: string | null
        }
        Insert: {
          alamat?: string | null
          auth_user_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          nama: string
          nomor_anggota: string
          telepon?: number | null
          updated_at?: string | null
        }
        Update: {
          alamat?: string | null
          auth_user_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          nama?: string
          nomor_anggota?: string
          telepon?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      approval_dokumen: {
        Row: {
          catatan: string | null
          created_at: string | null
          dokumen_id: number | null
          id: number
          nama_approver: string | null
          peran_approver: string
          status: string
          step: number
          tanggal_approval: string | null
        }
        Insert: {
          catatan?: string | null
          created_at?: string | null
          dokumen_id?: number | null
          id?: number
          nama_approver?: string | null
          peran_approver: string
          status?: string
          step: number
          tanggal_approval?: string | null
        }
        Update: {
          catatan?: string | null
          created_at?: string | null
          dokumen_id?: number | null
          id?: number
          nama_approver?: string | null
          peran_approver?: string
          status?: string
          step?: number
          tanggal_approval?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "approval_dokumen_dokumen_id_fkey"
            columns: ["dokumen_id"]
            isOneToOne: false
            referencedRelation: "dokumen_eoffice"
            referencedColumns: ["id"]
          },
        ]
      }
      dokumen_eoffice: {
        Row: {
          created_at: string | null
          dibuat_oleh: string
          file_key: string | null
          file_url: string | null
          id: number
          jenis_dokumen: string
          judul: string
          konten_dokumen: string | null
          status: string
          tanggal_kebutuhan: string | null
          template_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          dibuat_oleh: string
          file_key?: string | null
          file_url?: string | null
          id?: number
          jenis_dokumen?: string
          judul: string
          konten_dokumen?: string | null
          status?: string
          tanggal_kebutuhan?: string | null
          template_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          dibuat_oleh?: string
          file_key?: string | null
          file_url?: string | null
          id?: number
          jenis_dokumen?: string
          judul?: string
          konten_dokumen?: string | null
          status?: string
          tanggal_kebutuhan?: string | null
          template_id?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pengurus: {
        Row: {
          auth_user_id: string | null
          created_at: string | null
          email: string
          id: number
          nama: string
          peran: string
          updated_at: string | null
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string | null
          email: string
          id?: number
          nama: string
          peran: string
          updated_at?: string | null
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string | null
          email?: string
          id?: number
          nama?: string
          peran?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      permohonan: {
        Row: {
          anggota_id: number | null
          catatan_evaluasi: string | null
          created_at: string | null
          diproses_oleh: string | null
          id: number
          jenis_permohonan: string
          jumlah_pengajuan: number
          keterangan: string | null
          status: string
          tanggal_pengajuan: string
          updated_at: string | null
        }
        Insert: {
          anggota_id?: number | null
          catatan_evaluasi?: string | null
          created_at?: string | null
          diproses_oleh?: string | null
          id?: number
          jenis_permohonan: string
          jumlah_pengajuan: number
          keterangan?: string | null
          status?: string
          tanggal_pengajuan?: string
          updated_at?: string | null
        }
        Update: {
          anggota_id?: number | null
          catatan_evaluasi?: string | null
          created_at?: string | null
          diproses_oleh?: string | null
          id?: number
          jenis_permohonan?: string
          jumlah_pengajuan?: number
          keterangan?: string | null
          status?: string
          tanggal_pengajuan?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permohonan_anggota_id_fkey"
            columns: ["anggota_id"]
            isOneToOne: false
            referencedRelation: "anggota"
            referencedColumns: ["id"]
          },
        ]
      }
      permohonan_pembayaran: {
        Row: {
          catatan_bendahara: string | null
          catatan_manager: string | null
          created_at: string | null
          dibuat_oleh: string
          diproses_bendahara_oleh: string | null
          diproses_manager_oleh: string | null
          id: number
          jumlah: number
          keperluan: string
          keterangan: string | null
          nomor_permohonan: string
          status: string
          tanggal_kebutuhan: string | null
          updated_at: string | null
          vendor: string | null
        }
        Insert: {
          catatan_bendahara?: string | null
          catatan_manager?: string | null
          created_at?: string | null
          dibuat_oleh: string
          diproses_bendahara_oleh?: string | null
          diproses_manager_oleh?: string | null
          id?: number
          jumlah: number
          keperluan: string
          keterangan?: string | null
          nomor_permohonan?: string
          status?: string
          tanggal_kebutuhan?: string | null
          updated_at?: string | null
          vendor?: string | null
        }
        Update: {
          catatan_bendahara?: string | null
          catatan_manager?: string | null
          created_at?: string | null
          dibuat_oleh?: string
          diproses_bendahara_oleh?: string | null
          diproses_manager_oleh?: string | null
          id?: number
          jumlah?: number
          keperluan?: string
          keterangan?: string | null
          nomor_permohonan?: string
          status?: string
          tanggal_kebutuhan?: string | null
          updated_at?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      pinjaman: {
        Row: {
          anggota_id: number | null
          created_at: string | null
          id: number
          jumlah_pokok: number
          kode_pinjaman: string
          sisa_pinjaman: number
          status: string
          tanggal_pinjaman: string
        }
        Insert: {
          anggota_id?: number | null
          created_at?: string | null
          id?: number
          jumlah_pokok: number
          kode_pinjaman: string
          sisa_pinjaman: number
          status?: string
          tanggal_pinjaman?: string
        }
        Update: {
          anggota_id?: number | null
          created_at?: string | null
          id?: number
          jumlah_pokok?: number
          kode_pinjaman?: string
          sisa_pinjaman?: number
          status?: string
          tanggal_pinjaman?: string
        }
        Relationships: [
          {
            foreignKeyName: "pinjaman_anggota_id_fkey"
            columns: ["anggota_id"]
            isOneToOne: false
            referencedRelation: "anggota"
            referencedColumns: ["id"]
          },
        ]
      }
      shu: {
        Row: {
          anggota_id: number | null
          created_at: string | null
          id: number
          jumlah: number
          tahun: number
        }
        Insert: {
          anggota_id?: number | null
          created_at?: string | null
          id?: number
          jumlah: number
          tahun: number
        }
        Update: {
          anggota_id?: number | null
          created_at?: string | null
          id?: number
          jumlah?: number
          tahun?: number
        }
        Relationships: [
          {
            foreignKeyName: "shu_anggota_id_fkey"
            columns: ["anggota_id"]
            isOneToOne: false
            referencedRelation: "anggota"
            referencedColumns: ["id"]
          },
        ]
      }
      simpanan: {
        Row: {
          anggota_id: number | null
          created_at: string | null
          id: number
          jenis: string
          jumlah: number
          keterangan: string | null
          tanggal: string
        }
        Insert: {
          anggota_id?: number | null
          created_at?: string | null
          id?: number
          jenis: string
          jumlah: number
          keterangan?: string | null
          tanggal?: string
        }
        Update: {
          anggota_id?: number | null
          created_at?: string | null
          id?: number
          jenis?: string
          jumlah?: number
          keterangan?: string | null
          tanggal?: string
        }
        Relationships: [
          {
            foreignKeyName: "simpanan_anggota_id_fkey"
            columns: ["anggota_id"]
            isOneToOne: false
            referencedRelation: "anggota"
            referencedColumns: ["id"]
          },
        ]
      }
      template_dokumen: {
        Row: {
          created_at: string | null
          deskripsi: string | null
          file_template_url: string | null
          id: number
          jenis_dokumen: string
          nama_template: string
        }
        Insert: {
          created_at?: string | null
          deskripsi?: string | null
          file_template_url?: string | null
          id?: number
          jenis_dokumen: string
          nama_template: string
        }
        Update: {
          created_at?: string | null
          deskripsi?: string | null
          file_template_url?: string | null
          id?: number
          jenis_dokumen?: string
          nama_template?: string
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
    Enums: {},
  },
} as const
