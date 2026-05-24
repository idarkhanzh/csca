import type { AccessTier, SubjectSlug } from '../types/database';

export interface LessonItem {
  id: string;
  subjectSlug: SubjectSlug;
  moduleSlug: string;
  slug: string;
  titleRu: string;
  theoryMd: string;
  examples: { prompt: string; solution: string }[];
  accessTier: AccessTier;
  estimatedMinutes: number;
  questionIds: string[]; // refs into QUESTIONS by id
}

export interface ModuleItem {
  subjectSlug: SubjectSlug;
  slug: string;
  titleRu: string;
  descriptionRu: string;
  accessTier: AccessTier;
}

export const MODULES: ModuleItem[] = [
  // MATH
  { subjectSlug: 'math-en', slug: 'sets-logic',    titleRu: 'Множества и логика',           descriptionRu: 'Базовые операции над множествами, кванторы, импликации.',          accessTier: 'free' },
  { subjectSlug: 'math-en', slug: 'algebra',       titleRu: 'Алгебра и неравенства',        descriptionRu: 'Многочлены, квадратные и дробно-рациональные неравенства.',        accessTier: 'free' },
  { subjectSlug: 'math-en', slug: 'functions',     titleRu: 'Функции и графики',            descriptionRu: 'Область определения, преобразования графиков, чётность.',          accessTier: 'subscription' },
  { subjectSlug: 'math-en', slug: 'sequences',     titleRu: 'Последовательности',           descriptionRu: 'Арифметическая и геометрическая прогрессии, рекуррентные формулы.', accessTier: 'subscription' },
  { subjectSlug: 'math-en', slug: 'trigonometry',  titleRu: 'Тригонометрия',                descriptionRu: 'Единичная окружность, тождества, уравнения и неравенства.',         accessTier: 'subscription' },
  { subjectSlug: 'math-en', slug: 'geometry',      titleRu: 'Геометрия и координаты',       descriptionRu: 'Симметрии, расстояния, прямые и окружности на плоскости.',          accessTier: 'subscription' },
  { subjectSlug: 'math-en', slug: 'probability',   titleRu: 'Вероятность и статистика',     descriptionRu: 'Классическая вероятность, среднее, дисперсия, диаграммы.',          accessTier: 'subscription' },
  { subjectSlug: 'math-en', slug: 'word-problems', titleRu: 'Текстовые и логические задачи',descriptionRu: 'Стратегии разбора, перевод условий в уравнения.',                   accessTier: 'free' },

  // PHYSICS
  { subjectSlug: 'physics-en', slug: 'units',          titleRu: 'Единицы измерения и СИ',  descriptionRu: 'Базовые единицы СИ, размерности, прецизия измерений.',         accessTier: 'free' },
  { subjectSlug: 'physics-en', slug: 'kinematics',     titleRu: 'Кинематика',              descriptionRu: 'Перемещение, скорость, ускорение, движение по окружности.',      accessTier: 'free' },
  { subjectSlug: 'physics-en', slug: 'dynamics',       titleRu: 'Динамика и силы',         descriptionRu: 'Законы Ньютона, сложение сил, трение, упругость.',              accessTier: 'subscription' },
  { subjectSlug: 'physics-en', slug: 'energy',         titleRu: 'Работа и энергия',        descriptionRu: 'Кинетическая и потенциальная энергия, мощность, сохранение.',   accessTier: 'subscription' },
  { subjectSlug: 'physics-en', slug: 'electricity',    titleRu: 'Электричество и магнетизм', descriptionRu: 'Закон Ома, цепи, магнитное поле, сила Ампера.',              accessTier: 'subscription' },
  { subjectSlug: 'physics-en', slug: 'waves',          titleRu: 'Колебания и волны',       descriptionRu: 'Гармонические колебания, длина волны, частота, интерференция.', accessTier: 'subscription' },
  { subjectSlug: 'physics-en', slug: 'thermodynamics', titleRu: 'Термодинамика',           descriptionRu: 'Температура, теплота, первое начало термодинамики.',             accessTier: 'subscription' },
  { subjectSlug: 'physics-en', slug: 'modern',         titleRu: 'Современная физика',      descriptionRu: 'Фотоэффект, строение атома, ядерные превращения.',              accessTier: 'subscription' },

  // CHEMISTRY
  { subjectSlug: 'chemistry-en', slug: 'basics',        titleRu: 'Основные понятия',     descriptionRu: 'Атом, молекула, моль, химические формулы.',                  accessTier: 'free' },
  { subjectSlug: 'chemistry-en', slug: 'periodic',      titleRu: 'Периодическая система', descriptionRu: 'Структура таблицы, периоды и группы, закономерности.',       accessTier: 'free' },
  { subjectSlug: 'chemistry-en', slug: 'reactions',     titleRu: 'Химические реакции',    descriptionRu: 'Типы реакций, уравнения, кислоты и основания.',              accessTier: 'subscription' },
  { subjectSlug: 'chemistry-en', slug: 'stoichiometry', titleRu: 'Стехиометрия',          descriptionRu: 'Молярные расчёты, ограничивающий реагент, выход.',           accessTier: 'subscription' },
  { subjectSlug: 'chemistry-en', slug: 'solutions',     titleRu: 'Растворы',              descriptionRu: 'Концентрация, моляльность, разбавление, рН.',                accessTier: 'subscription' },
  { subjectSlug: 'chemistry-en', slug: 'organic',       titleRu: 'Основы органики',       descriptionRu: 'Алканы, алкены, функциональные группы.',                     accessTier: 'subscription' },
];

export const LESSONS: LessonItem[] = [
  // MATH: sets-logic
  {
    id: 'l-math-sets-1', subjectSlug: 'math-en', moduleSlug: 'sets-logic', slug: 'intro',
    titleRu: 'Множества: принадлежность и подмножества',
    accessTier: 'free', estimatedMinutes: 12,
    theoryMd:
`### Что такое множество

Множество — это коллекция различимых объектов. Их называют **элементами**. Запись a ∈ A читается «a принадлежит A», а b ∉ A — «b не принадлежит A».

### Подмножества

A ⊆ B означает, что каждый элемент A одновременно является элементом B. Пустое множество ∅ — подмножество любого множества.

### Базовые операции
- **Пересечение** A ∩ B — общие элементы.
- **Объединение** A ∪ B — все элементы вместе, без повторов.
- **Разность** A \\ B — элементы A, которых нет в B.

### Частая ловушка

Не путайте 4 ∈ A и {4} ⊆ A. Первое — про элемент, второе — про подмножество.`,
    examples: [
      { prompt: 'A = {1, 2, 3}. Верно ли {1, 2} ⊆ A?', solution: 'Да — оба элемента {1, 2} принадлежат A, значит {1, 2} — подмножество.' },
      { prompt: 'Найдите A ∩ B, если A = {2, 4, 6}, B = {3, 4, 5}.', solution: 'Общий элемент один: A ∩ B = {4}.' },
    ],
    questionIds: ['q-math-sets-1', 'q-math-sets-2'],
  },

  // MATH: algebra
  {
    id: 'l-math-alg-1', subjectSlug: 'math-en', moduleSlug: 'algebra', slug: 'quadratic-inequalities',
    titleRu: 'Квадратные неравенства методом интервалов',
    accessTier: 'free', estimatedMinutes: 15,
    theoryMd:
`### Алгоритм

1. Приведите неравенство к виду ax² + bx + c ▷ 0 (▷ — один из знаков >, ≥, <, ≤).
2. Найдите корни уравнения ax² + bx + c = 0.
3. Отметьте их на числовой оси, расставьте знаки парабола в каждом интервале.
4. Если a > 0, парабола ветвями вверх → знак «+» вне корней, «−» между.
5. Запишите ответ, учитывая, строгое ли неравенство.

### Совет

Если дискриминант отрицателен, неравенство либо выполняется для всех x, либо ни для каких — посмотрите на знак при x² и знак неравенства.`,
    examples: [
      { prompt: 'Решите x² − 4x − 5 > 0.', solution: 'Корни −1 и 5; парабола вверх → x < −1 или x > 5.' },
      { prompt: 'Решите x² + 4 ≤ 0.', solution: 'D = −16 < 0, парабола вверх — выражение всегда > 0. Решений нет.' },
    ],
    questionIds: ['q-math-alg-1', 'q-math-alg-2'],
  },

  // MATH: functions
  {
    id: 'l-math-fn-1', subjectSlug: 'math-en', moduleSlug: 'functions', slug: 'domain',
    titleRu: 'Область определения функции',
    accessTier: 'subscription', estimatedMinutes: 14,
    theoryMd:
`### Что искать

Область определения D(f) — все значения x, при которых f(x) корректно вычисляется. На экзамене проверяйте три типа ограничений:

- **Знаменатель ≠ 0**: для 1/g(x) нужно g(x) ≠ 0.
- **Под корнем чётной степени ≥ 0**: для √g(x) нужно g(x) ≥ 0.
- **Логарифмы**: log_a g(x) требует g(x) > 0 и a > 0, a ≠ 1.

Объедините ограничения через пересечение и запишите ответ в интервальной форме.`,
    examples: [
      { prompt: 'Найдите D(f) для f(x) = √(x − 2) + 1/(x − 5).', solution: 'x − 2 ≥ 0 → x ≥ 2; x − 5 ≠ 0 → x ≠ 5. Ответ: [2, 5) ∪ (5, +∞).' },
    ],
    questionIds: ['q-math-fn-1'],
  },

  // MATH: sequences
  {
    id: 'l-math-seq-1', subjectSlug: 'math-en', moduleSlug: 'sequences', slug: 'arithmetic',
    titleRu: 'Арифметическая прогрессия',
    accessTier: 'subscription', estimatedMinutes: 10,
    theoryMd:
`### Формулы

- n-й член: a_n = a₁ + (n − 1)·d
- Сумма n членов: S_n = n·(a₁ + a_n)/2 = n·(2a₁ + (n−1)·d)/2

### Когда применять

Если соседние члены отличаются на постоянное число — это арифметическая прогрессия. d может быть отрицательным.`,
    examples: [
      { prompt: 'a₁ = 5, d = 3. Найти a₂₀.', solution: 'a₂₀ = 5 + 19·3 = 5 + 57 = 62.' },
      { prompt: 'a₁ = 2, d = 4. Найти S₁₀.', solution: 'S₁₀ = 10·(2·2 + 9·4)/2 = 5·(4 + 36) = 200.' },
    ],
    questionIds: ['q-math-seq-1'],
  },

  // MATH: trigonometry
  {
    id: 'l-math-trig-1', subjectSlug: 'math-en', moduleSlug: 'trigonometry', slug: 'unit-values',
    titleRu: 'Значения sin, cos, tan для базовых углов',
    accessTier: 'subscription', estimatedMinutes: 9,
    theoryMd:
`### Таблица

| угол | sin | cos | tan |
|------|-----|-----|-----|
| 0°   | 0   | 1   | 0   |
| 30°  | 1/2 | √3/2 | 1/√3 |
| 45°  | √2/2 | √2/2 | 1 |
| 60°  | √3/2 | 1/2 | √3 |
| 90°  | 1   | 0   | — |

### Запоминание

Для sin: 0, 1/2, √2/2, √3/2, 1 — последовательность по углам 0°, 30°, 45°, 60°, 90°. Для cos — в обратном порядке.`,
    examples: [
      { prompt: 'Вычислите cos 60° + sin 30°.', solution: '1/2 + 1/2 = 1.' },
    ],
    questionIds: ['q-math-trig-1'],
  },

  // MATH: geometry
  {
    id: 'l-math-geo-1', subjectSlug: 'math-en', moduleSlug: 'geometry', slug: 'symmetry',
    titleRu: 'Симметрии на координатной плоскости',
    accessTier: 'subscription', estimatedMinutes: 8,
    theoryMd:
`### Правила
- Относительно оси Ox: (x, y) → (x, −y)
- Относительно оси Oy: (x, y) → (−x, y)
- Относительно начала координат: (x, y) → (−x, −y)
- Относительно прямой y = x: (x, y) → (y, x)

Запишите все четыре правила на черновике — это часто экономит время на экзамене.`,
    examples: [
      { prompt: 'Точка (−2, 5) симметрична относительно начала координат точке…', solution: '(2, −5).' },
    ],
    questionIds: ['q-math-geo-1'],
  },

  // MATH: probability
  {
    id: 'l-math-prob-1', subjectSlug: 'math-en', moduleSlug: 'probability', slug: 'classical',
    titleRu: 'Классическая вероятность',
    accessTier: 'subscription', estimatedMinutes: 11,
    theoryMd:
`### Формула

P(A) = (число благоприятных исходов) / (число всех равновозможных исходов).

### Свойства
- 0 ≤ P(A) ≤ 1
- P(достоверного события) = 1
- P(невозможного) = 0
- P(не A) = 1 − P(A)

### Совет

Если задача сложнее, чем «достать шар из коробки», нарисуйте дерево исходов.`,
    examples: [
      { prompt: 'В коробке 3 красных и 7 синих карандашей. Вероятность достать красный.', solution: 'P = 3 / 10 = 0,3.' },
    ],
    questionIds: ['q-math-prob-1'],
  },

  // MATH: word problems
  {
    id: 'l-math-word-1', subjectSlug: 'math-en', moduleSlug: 'word-problems', slug: 'rate',
    titleRu: 'Задачи на движение',
    accessTier: 'free', estimatedMinutes: 10,
    theoryMd:
`### Базовая формула

v = s / t. Из неё выводятся s = v · t и t = s / v.

### Подсказки
- Если объекты движутся навстречу — скорости складываются.
- Если в одном направлении — вычитаются.
- Всегда переводите единицы (км/ч → м/с) до подстановки.`,
    examples: [
      { prompt: 'Велосипедист проехал 36 км за 1,5 ч. Скорость?', solution: 'v = 36 / 1,5 = 24 км/ч.' },
    ],
    questionIds: ['q-math-word-1'],
  },

  // PHYSICS: units
  {
    id: 'l-phys-units-1', subjectSlug: 'physics-en', moduleSlug: 'units', slug: 'si',
    titleRu: 'Семь базовых единиц СИ',
    accessTier: 'free', estimatedMinutes: 7,
    theoryMd:
`### Семь базовых единиц

| Величина | Единица | Обозначение |
|----------|---------|-------------|
| Длина    | метр    | м |
| Масса    | килограмм | кг |
| Время    | секунда | с |
| Сила тока| ампер   | А |
| Температура | кельвин | К |
| Кол-во вещества | моль | моль |
| Сила света | кандела | кд |

Все остальные единицы (ньютон, джоуль, ватт…) являются **производными**.`,
    examples: [
      { prompt: 'К какой группе единиц относится ньютон?', solution: 'К производным: 1 Н = 1 кг·м/с².' },
    ],
    questionIds: ['q-phys-units-1'],
  },

  // PHYSICS: kinematics
  {
    id: 'l-phys-kin-1', subjectSlug: 'physics-en', moduleSlug: 'kinematics', slug: 'path-vs-displacement',
    titleRu: 'Путь и перемещение',
    accessTier: 'free', estimatedMinutes: 9,
    theoryMd:
`### В чём разница

- **Путь** — скаляр, длина траектории.
- **Перемещение** — вектор от начальной точки к конечной.

### Следствие

При движении по замкнутой траектории путь > 0, перемещение = 0.`,
    examples: [
      { prompt: 'Пешеход прошёл 5 м на восток, потом 5 м обратно. Путь и перемещение?', solution: 'Путь = 10 м, перемещение = 0.' },
    ],
    questionIds: ['q-phys-kin-1'],
  },

  // PHYSICS: dynamics
  {
    id: 'l-phys-dyn-1', subjectSlug: 'physics-en', moduleSlug: 'dynamics', slug: 'newton-and-springs',
    titleRu: 'Силы Ньютона, пружины, сложение векторов',
    accessTier: 'subscription', estimatedMinutes: 18,
    theoryMd:
`### Закон Гука

F_упр = k · Δx, где Δx — модуль удлинения (или сжатия) пружины, k — её жёсткость в Н/м.

### Сложение двух сил

Модуль равнодействующей лежит в пределах:
|F₁ − F₂| ≤ |R| ≤ F₁ + F₂.

### Закон тяготения на других телах

На разных небесных телах g меняется. На Луне g_Луна ≈ g_Земля / 6.`,
    examples: [
      { prompt: 'Пружина с k = 50 Н/м растягивается на 4 см. Сила?', solution: 'F = 50 · 0,04 = 2 Н.' },
      { prompt: 'F₁ = 4 Н, F₂ = 7 Н. Возможен ли R = 12 Н?', solution: 'Нет: верхняя граница 4 + 7 = 11 Н.' },
    ],
    questionIds: ['q-phys-dyn-1', 'q-phys-dyn-2', 'q-phys-dyn-3'],
  },

  // PHYSICS: energy
  {
    id: 'l-phys-en-1', subjectSlug: 'physics-en', moduleSlug: 'energy', slug: 'work',
    titleRu: 'Работа силы',
    accessTier: 'subscription', estimatedMinutes: 10,
    theoryMd:
`### Формула

A = F · s · cos α, где α — угол между силой и перемещением.

### Знак работы
- α < 90° → A > 0 (сила «помогает»)
- α = 90° → A = 0
- α > 90° → A < 0 (сила «мешает»)`,
    examples: [
      { prompt: 'Тело тянут силой 10 Н на 5 м вдоль направления силы. A = ?', solution: 'A = 10 · 5 · cos 0° = 50 Дж.' },
    ],
    questionIds: ['q-phys-en-1'],
  },

  // PHYSICS: electricity
  {
    id: 'l-phys-elec-1', subjectSlug: 'physics-en', moduleSlug: 'electricity', slug: 'ohm-ampere',
    titleRu: 'Закон Ома и сила Ампера',
    accessTier: 'subscription', estimatedMinutes: 13,
    theoryMd:
`### Закон Ома

U = I · R, где U — напряжение (В), I — ток (А), R — сопротивление (Ом).

### Сила Ампера

F = B · I · L · sin α. Для перпендикулярного к полю проводника sin α = 1, поэтому F = B · I · L.`,
    examples: [
      { prompt: 'L = 0,2 м, I = 5 А, B = 0,5 Тл, проводник перпендикулярен полю. F?', solution: 'F = 0,5 · 5 · 0,2 = 0,5 Н.' },
    ],
    questionIds: ['q-phys-elec-1', 'q-phys-elec-2'],
  },

  // PHYSICS: waves
  {
    id: 'l-phys-wav-1', subjectSlug: 'physics-en', moduleSlug: 'waves', slug: 'wavelength',
    titleRu: 'Связь длины волны, частоты и скорости',
    accessTier: 'subscription', estimatedMinutes: 8,
    theoryMd:
`### Формула

v = λ · f, отсюда λ = v / f и f = v / λ.

Период T = 1 / f.`,
    examples: [
      { prompt: 'f = 50 Гц, v = 300 м/с. λ?', solution: 'λ = 6 м.' },
    ],
    questionIds: ['q-phys-wav-1'],
  },

  // CHEMISTRY
  {
    id: 'l-chem-basics-1', subjectSlug: 'chemistry-en', moduleSlug: 'basics', slug: 'mole',
    titleRu: 'Моль и число Авогадро',
    accessTier: 'free', estimatedMinutes: 9,
    theoryMd:
`### Что такое моль

Моль — это количество вещества, содержащее столько же структурных единиц, сколько атомов в 12 г изотопа ¹²C — то есть Nₐ ≈ 6,022·10²³.

### Связь
- N = ν · Nₐ
- m = ν · M, где M — молярная масса (г/моль).`,
    examples: [
      { prompt: 'Сколько моль в 18 г воды (M = 18 г/моль)?', solution: 'ν = 18 / 18 = 1 моль.' },
    ],
    questionIds: ['q-chem-basics-1'],
  },
  {
    id: 'l-chem-per-1', subjectSlug: 'chemistry-en', moduleSlug: 'periodic', slug: 'groups',
    titleRu: 'Группы и валентные электроны',
    accessTier: 'free', estimatedMinutes: 8,
    theoryMd:
`### Главные подгруппы

Номер главной подгруппы = число валентных электронов на внешнем уровне (для элементов 1–8 групп главной подгруппы).

### Примеры
- Натрий (I группа) — 1 валентный электрон.
- Углерод (IV группа) — 4.
- Кислород (VI группа) — 6.`,
    examples: [
      { prompt: 'Сколько валентных электронов у азота?', solution: 'N — V группа → 5 валентных электронов.' },
    ],
    questionIds: ['q-chem-per-1'],
  },
  {
    id: 'l-chem-stoich-1', subjectSlug: 'chemistry-en', moduleSlug: 'stoichiometry', slug: 'reading-equations',
    titleRu: 'Чтение уравнений: моль за моль',
    accessTier: 'subscription', estimatedMinutes: 10,
    theoryMd:
`### Принцип

Коэффициенты перед формулами в уравнении показывают мольные соотношения. Например, в 2H₂ + O₂ → 2H₂O на 2 моль H₂ приходится 1 моль O₂ и 2 моль H₂O.

### Алгоритм
1. Уравняйте реакцию.
2. Пересчитайте известное вещество в моли.
3. Через коэффициент перейдите к молям нужного.
4. Переведите обратно в массу/объём.`,
    examples: [
      { prompt: 'Сколько моль O₂ нужно для сжигания 4 моль H₂?', solution: 'На 2 моль H₂ — 1 моль O₂, значит на 4 моль — 2 моль O₂.' },
    ],
    questionIds: ['q-chem-stoich-1'],
  },
];

export function lessonsByModule(subject: SubjectSlug, moduleSlug: string): LessonItem[] {
  return LESSONS.filter((l) => l.subjectSlug === subject && l.moduleSlug === moduleSlug);
}

export function modulesBySubject(subject: SubjectSlug): ModuleItem[] {
  return MODULES.filter((m) => m.subjectSlug === subject);
}
