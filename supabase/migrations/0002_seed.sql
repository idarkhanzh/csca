-- CSCA Prep — seed catalog (subjects, modules, lessons, exams)
-- Idempotent: re-running upserts the same slugs.
-- ---------------------------------------------------------------------------

insert into public.subjects (slug, name_ru, name_en, language, color, sort) values
  ('math-en',         'Математика (EN)',        'Mathematics (English)', 'en', '#172446', 10),
  ('math-zh',         'Математика (中文)',       'Mathematics (Chinese)', 'zh', '#1f2f5e', 20),
  ('physics-en',      'Физика (EN)',            'Physics (English)',     'en', '#1e3a8a', 30),
  ('physics-zh',      'Физика (中文)',           'Physics (Chinese)',     'zh', '#1e40af', 40),
  ('chemistry-en',    'Химия (EN)',             'Chemistry (English)',   'en', '#312e81', 50),
  ('chemistry-zh',    'Химия (中文)',            'Chemistry (Chinese)',   'zh', '#3730a3', 60),
  ('humanities',      'Гуманитарные науки',     'Humanities',            'en', '#334155', 70),
  ('natural-science', 'Естественные науки',     'Natural Science',       'en', '#0f172a', 80)
on conflict (slug) do update set
  name_ru = excluded.name_ru,
  name_en = excluded.name_en,
  language = excluded.language,
  color = excluded.color,
  sort = excluded.sort;

-- MATH MODULES ---------------------------------------------------------------
insert into public.modules (subject_slug, slug, title_ru, description_ru, sort, access_tier) values
  ('math-en', 'sets-logic',         'Множества и логика',           'Базовые операции над множествами, кванторы, импликации.', 10, 'free'),
  ('math-en', 'algebra',            'Алгебра и неравенства',         'Многочлены, квадратные и дробно-рациональные неравенства, метод интервалов.', 20, 'free'),
  ('math-en', 'functions',          'Функции и графики',             'Область определения, преобразования графиков, чётность, монотонность.', 30, 'subscription'),
  ('math-en', 'sequences',          'Последовательности',            'Арифметическая и геометрическая прогрессии, рекуррентные формулы.', 40, 'subscription'),
  ('math-en', 'trigonometry',       'Тригонометрия',                 'Единичная окружность, тождества, уравнения и неравенства.', 50, 'subscription'),
  ('math-en', 'geometry',           'Геометрия и координаты',        'Симметрии, расстояния, прямые и окружности на координатной плоскости.', 60, 'subscription'),
  ('math-en', 'probability',        'Вероятность и статистика',      'Классическая вероятность, среднее, дисперсия, диаграммы.', 70, 'subscription'),
  ('math-en', 'word-problems',      'Текстовые и логические задачи', 'Стратегии разбора, перевод условий в уравнения.', 80, 'free')
on conflict (subject_slug, slug) do update set
  title_ru = excluded.title_ru,
  description_ru = excluded.description_ru,
  sort = excluded.sort,
  access_tier = excluded.access_tier;

-- PHYSICS MODULES ------------------------------------------------------------
insert into public.modules (subject_slug, slug, title_ru, description_ru, sort, access_tier) values
  ('physics-en', 'units',          'Единицы измерения и СИ',         'Базовые единицы СИ, размерности, прецизия измерений.', 10, 'free'),
  ('physics-en', 'kinematics',     'Кинематика',                     'Перемещение, скорость, ускорение, движение по окружности.', 20, 'free'),
  ('physics-en', 'dynamics',       'Динамика и силы',                'Законы Ньютона, сложение сил, трение, упругость.', 30, 'subscription'),
  ('physics-en', 'energy',         'Работа и энергия',               'Кинетическая и потенциальная энергия, мощность, сохранение.', 40, 'subscription'),
  ('physics-en', 'electricity',    'Электричество и магнетизм',      'Закон Ома, цепи, магнитное поле, сила Ампера.', 50, 'subscription'),
  ('physics-en', 'waves',          'Колебания и волны',              'Гармонические колебания, длина волны, частота, интерференция.', 60, 'subscription'),
  ('physics-en', 'thermodynamics', 'Термодинамика',                  'Температура, теплота, первое начало термодинамики.', 70, 'subscription'),
  ('physics-en', 'modern',         'Современная физика',             'Фотоэффект, строение атома, ядерные превращения.', 80, 'subscription')
on conflict (subject_slug, slug) do update set
  title_ru = excluded.title_ru,
  description_ru = excluded.description_ru,
  sort = excluded.sort,
  access_tier = excluded.access_tier;

-- CHEMISTRY MODULES ----------------------------------------------------------
insert into public.modules (subject_slug, slug, title_ru, description_ru, sort, access_tier) values
  ('chemistry-en', 'basics',          'Основные понятия',          'Атом, молекула, моль, химические формулы.', 10, 'free'),
  ('chemistry-en', 'periodic',        'Периодическая система',     'Структура таблицы, периоды и группы, закономерности.', 20, 'free'),
  ('chemistry-en', 'reactions',       'Химические реакции',        'Типы реакций, уравнения, кислоты и основания.', 30, 'subscription'),
  ('chemistry-en', 'stoichiometry',   'Стехиометрия',              'Молярные расчёты, ограничивающий реагент, выход.', 40, 'subscription'),
  ('chemistry-en', 'solutions',       'Растворы',                  'Концентрация, моляльность, разбавление, рН.', 50, 'subscription'),
  ('chemistry-en', 'organic',         'Основы органики',           'Алканы, алкены, функциональные группы.', 60, 'subscription')
on conflict (subject_slug, slug) do update set
  title_ru = excluded.title_ru,
  description_ru = excluded.description_ru,
  sort = excluded.sort,
  access_tier = excluded.access_tier;

-- EXAMS (mirror PDFs the user provided, no raw content exposed) --------------
insert into public.exams (subject_slug, title_ru, exam_date, question_count, duration_minutes, access_tier, attempts_count) values
  ('math-en',    'Mathematics (EN) — Dec 2025',  '2025-12-21', 48, 60, 'subscription', 140),
  ('math-en',    'Mathematics (EN) — Jan 2026',  '2026-01-25', 48, 60, 'subscription', 137),
  ('math-en',    'Mathematics (EN) — Mar 2026',  '2026-03-15', 48, 60, 'subscription', 330),
  ('math-en',    'Mathematics (EN) — Apr 2026',  '2026-04-25', 48, 60, 'subscription', 185),
  ('math-zh',    'Mathematics (中) — Dec 2025',   '2025-12-21', 48, 60, 'subscription', 312),
  ('math-zh',    'Mathematics (中) — Jan 2026',   '2026-01-25', 48, 60, 'subscription',  83),
  ('math-zh',    'Mathematics (中) — Mar 2026',   '2026-03-15', 48, 60, 'subscription',   0),
  ('math-zh',    'Mathematics (中) — Apr 2026',   '2026-04-25', 48, 60, 'subscription', 157),
  ('physics-en', 'Physics (EN) — Dec 2025',      '2025-12-21', 48, 60, 'subscription',  66),
  ('physics-en', 'Physics (EN) — Jan 2026',      '2026-01-25', 48, 60, 'subscription',  64),
  ('physics-en', 'Physics (EN) — Mar 2026',      '2026-03-15', 48, 60, 'subscription', 170),
  ('physics-en', 'Physics (EN) — Apr 2026',      '2026-04-25', 48, 60, 'subscription',  82),
  ('physics-zh', 'Physics (中) — Dec 2025',       '2025-12-21', 48, 60, 'subscription', 105),
  ('physics-zh', 'Physics (中) — Jan 2026',       '2026-01-25', 48, 60, 'subscription',  31),
  ('physics-zh', 'Physics (中) — Mar 2026',       '2026-03-15', 48, 60, 'subscription',  59),
  ('physics-zh', 'Physics (中) — Apr 2026',       '2026-04-25', 48, 60, 'subscription',  88),
  ('math-en',    'Mathematics (EN) — Mock 1',    '2026-02-10', 48, 60, 'free',          212),
  ('math-en',    'Mathematics (EN) — Mock 2',    '2026-04-02', 48, 60, 'subscription',   97),
  ('chemistry-en', 'Chemistry (EN) — Jan 2026',  '2026-01-25', 40, 60, 'subscription',  45),
  ('chemistry-en', 'Chemistry (EN) — Mar 2026',  '2026-03-15', 40, 60, 'subscription',  62),
  ('chemistry-zh', 'Chemistry (中) — Jan 2026',   '2026-01-25', 40, 60, 'subscription',  28),
  ('chemistry-zh', 'Chemistry (中) — Mar 2026',   '2026-03-15', 40, 60, 'subscription',  33),
  ('humanities',     'Humanities — Jan 2026',    '2026-01-25', 36, 50, 'subscription',  19),
  ('humanities',     'Humanities — Mar 2026',    '2026-03-15', 36, 50, 'subscription',  24),
  ('natural-science','Natural Sci. — Jan 2026',  '2026-01-25', 40, 60, 'subscription',  12),
  ('natural-science','Natural Sci. — Mar 2026',  '2026-03-15', 40, 60, 'subscription',  17),
  ('math-en',        'Mathematics (EN) — All Topics Review', '2026-05-01', 60, 90, 'subscription', 41),
  ('math-en',        'Mathematics (EN) — Pre-test Drill',    '2025-11-20', 30, 45, 'free',         304),
  ('physics-en',     'Physics (EN) — Mock Drill',            '2026-02-14', 30, 45, 'free',         156),
  ('chemistry-en',   'Chemistry (EN) — Mock Drill',          '2026-02-20', 30, 45, 'free',          88),
  ('humanities',     'Humanities — Mock Drill',              '2026-02-28', 24, 35, 'free',          47),
  ('natural-science','Natural Sci. — Mock Drill',            '2026-03-04', 30, 45, 'free',          39);
