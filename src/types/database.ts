export type SubjectSlug =
  | 'math-en'
  | 'math-zh'
  | 'physics-en'
  | 'physics-zh'
  | 'chemistry-en'
  | 'chemistry-zh'
  | 'humanities'
  | 'natural-science';

export type Language = 'en' | 'zh' | 'ru';

export type AccessTier = 'free' | 'subscription';

export type SubscriptionStatus = 'free' | 'active' | 'expired';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          locale: 'ru' | 'en';
          has_subscription: boolean;
          subscription_status: SubscriptionStatus;
          subscription_expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & {
          id: string;
          email: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      subjects: {
        Row: {
          id: string;
          slug: SubjectSlug;
          name_ru: string;
          name_en: string;
          language: Language;
          color: string;
          sort: number;
        };
        Insert: Partial<Database['public']['Tables']['subjects']['Row']> & {
          slug: SubjectSlug;
          name_ru: string;
        };
        Update: Partial<Database['public']['Tables']['subjects']['Row']>;
      };
      modules: {
        Row: {
          id: string;
          subject_slug: SubjectSlug;
          slug: string;
          title_ru: string;
          description_ru: string;
          sort: number;
          access_tier: AccessTier;
        };
        Insert: Partial<Database['public']['Tables']['modules']['Row']> & {
          subject_slug: SubjectSlug;
          slug: string;
          title_ru: string;
        };
        Update: Partial<Database['public']['Tables']['modules']['Row']>;
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          slug: string;
          title_ru: string;
          theory_md: string;
          examples: Array<{ prompt: string; solution: string }>;
          sort: number;
          access_tier: AccessTier;
          estimated_minutes: number;
        };
        Insert: Partial<Database['public']['Tables']['lessons']['Row']> & {
          module_id: string;
          slug: string;
          title_ru: string;
        };
        Update: Partial<Database['public']['Tables']['lessons']['Row']>;
      };
      questions: {
        Row: {
          id: string;
          lesson_id: string | null;
          exam_id: string | null;
          subject_slug: SubjectSlug;
          prompt_ru: string;
          choices: Array<{ key: string; text: string }>;
          correct_key: string;
          explanation_ru: string;
          difficulty: 'easy' | 'medium' | 'hard';
          sort: number;
        };
        Insert: Partial<Database['public']['Tables']['questions']['Row']> & {
          subject_slug: SubjectSlug;
          prompt_ru: string;
          choices: Array<{ key: string; text: string }>;
          correct_key: string;
        };
        Update: Partial<Database['public']['Tables']['questions']['Row']>;
      };
      exams: {
        Row: {
          id: string;
          subject_slug: SubjectSlug;
          title_ru: string;
          exam_date: string;
          question_count: number;
          duration_minutes: number;
          access_tier: AccessTier;
          attempts_count: number;
        };
        Insert: Partial<Database['public']['Tables']['exams']['Row']> & {
          subject_slug: SubjectSlug;
          title_ru: string;
        };
        Update: Partial<Database['public']['Tables']['exams']['Row']>;
      };
      quizzes: {
        Row: {
          id: string;
          module_id: string;
          title_ru: string;
          question_count: number;
        };
        Insert: Partial<Database['public']['Tables']['quizzes']['Row']> & {
          module_id: string;
          title_ru: string;
        };
        Update: Partial<Database['public']['Tables']['quizzes']['Row']>;
      };
      attempts: {
        Row: {
          id: string;
          user_id: string;
          exam_id: string | null;
          quiz_id: string | null;
          mode: 'exam' | 'quiz' | 'simulator';
          subject_slug: SubjectSlug;
          score: number;
          total: number;
          duration_seconds: number;
          answers: Record<string, string>;
          completed_at: string;
        };
        Insert: Partial<Database['public']['Tables']['attempts']['Row']> & {
          user_id: string;
          subject_slug: SubjectSlug;
        };
        Update: Partial<Database['public']['Tables']['attempts']['Row']>;
      };
      lesson_progress: {
        Row: {
          user_id: string;
          lesson_id: string;
          status: 'in_progress' | 'completed';
          completed_at: string | null;
        };
        Insert: Partial<Database['public']['Tables']['lesson_progress']['Row']> & {
          user_id: string;
          lesson_id: string;
        };
        Update: Partial<Database['public']['Tables']['lesson_progress']['Row']>;
      };
      bookmarks: {
        Row: {
          user_id: string;
          question_id: string;
          created_at: string;
        };
        Insert: { user_id: string; question_id: string };
        Update: never;
      };
    };
  };
}
