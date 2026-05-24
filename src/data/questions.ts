import type { SubjectSlug } from '../types/database';

export interface QuestionItem {
  id: string;
  subjectSlug: SubjectSlug;
  moduleSlug: string;
  promptRu: string;
  choices: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  explanationRu: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// All prompts and explanations are written from scratch in Russian, inspired
// by the topic mix in the provided official tests. We do not reproduce
// copyrighted prompts verbatim.

export const QUESTIONS: QuestionItem[] = [
  // MATH — sets & logic
  { id: 'q-math-sets-1', subjectSlug: 'math-en', moduleSlug: 'sets-logic',
    promptRu: 'Дано множество A = {2, 4, 6, 8}. Какое из утверждений верно?',
    choices: [
      { key: 'A', text: '4 ∈ A' },
      { key: 'B', text: '{4} ∈ A' },
      { key: 'C', text: '5 ∈ A' },
      { key: 'D', text: '∅ ∈ A' },
    ],
    correctKey: 'A', difficulty: 'easy',
    explanationRu: 'Элемент 4 принадлежит множеству A. Запись {4} ∈ A неверна — это подмножество, а не элемент.' },
  { id: 'q-math-sets-2', subjectSlug: 'math-en', moduleSlug: 'sets-logic',
    promptRu: 'A = {x | −2 ≤ x ≤ 4}, B = {x | x > 1}. Найдите A ∩ B.',
    choices: [
      { key: 'A', text: '{x | 1 < x ≤ 4}' },
      { key: 'B', text: '{x | x ≥ −2}' },
      { key: 'C', text: '{x | x > 1}' },
      { key: 'D', text: '{x | −2 ≤ x < 1}' },
    ],
    correctKey: 'A', difficulty: 'easy',
    explanationRu: 'Пересечение — это x, удовлетворяющий обоим условиям: x > 1 и x ≤ 4.' },

  // MATH — algebra / inequalities
  { id: 'q-math-alg-1', subjectSlug: 'math-en', moduleSlug: 'algebra',
    promptRu: 'Решите неравенство x² − 4x − 5 > 0.',
    choices: [
      { key: 'A', text: '{x | x < −1 или x > 5}' },
      { key: 'B', text: '{x | −1 < x < 5}' },
      { key: 'C', text: '{x | x < −5 или x > 1}' },
      { key: 'D', text: '{x | −5 < x < 1}' },
    ],
    correctKey: 'A', difficulty: 'medium',
    explanationRu: 'Корни уравнения x² − 4x − 5 = 0 равны −1 и 5. Парабола ветвями вверх → внешняя область положительна.' },
  { id: 'q-math-alg-2', subjectSlug: 'math-en', moduleSlug: 'algebra',
    promptRu: 'Решите 2x − 3 ≤ 5.',
    choices: [
      { key: 'A', text: 'x ≤ 4' },
      { key: 'B', text: 'x ≥ 4' },
      { key: 'C', text: 'x ≤ 1' },
      { key: 'D', text: 'x ≥ 1' },
    ],
    correctKey: 'A', difficulty: 'easy',
    explanationRu: 'Прибавим 3, поделим на 2: x ≤ 4.' },

  // MATH — functions
  { id: 'q-math-fn-1', subjectSlug: 'math-en', moduleSlug: 'functions',
    promptRu: 'Найдите область определения функции f(x) = 1/x + √(3 − x).',
    choices: [
      { key: 'A', text: '(−∞, 3]' },
      { key: 'B', text: '(−∞, 0) ∪ (0, 3]' },
      { key: 'C', text: '[3, +∞)' },
      { key: 'D', text: '(−∞, 0) ∪ (0, 3)' },
    ],
    correctKey: 'B', difficulty: 'medium',
    explanationRu: '1/x требует x ≠ 0; √(3 − x) требует x ≤ 3. Пересечение даёт ответ B.' },

  // MATH — sequences
  { id: 'q-math-seq-1', subjectSlug: 'math-en', moduleSlug: 'sequences',
    promptRu: 'В арифметической прогрессии a₁ = 3, разность d = 4. Чему равен a₁₀₀?',
    choices: [
      { key: 'A', text: '399' },
      { key: 'B', text: '403' },
      { key: 'C', text: '396' },
      { key: 'D', text: '400' },
    ],
    correctKey: 'A', difficulty: 'easy',
    explanationRu: 'a_n = a₁ + (n−1)·d = 3 + 99·4 = 3 + 396 = 399.' },

  // MATH — trigonometry
  { id: 'q-math-trig-1', subjectSlug: 'math-en', moduleSlug: 'trigonometry',
    promptRu: 'Угол α = 60°. Какое равенство верно?',
    choices: [
      { key: 'A', text: 'sin α = 1/2' },
      { key: 'B', text: 'cos α = 1/2' },
      { key: 'C', text: 'tan α = 1' },
      { key: 'D', text: 'sin α = √2 / 2' },
    ],
    correctKey: 'B', difficulty: 'easy',
    explanationRu: 'sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3.' },

  // MATH — geometry / coordinates
  { id: 'q-math-geo-1', subjectSlug: 'math-en', moduleSlug: 'geometry',
    promptRu: 'Точка P(3, 4) симметрична точке Q относительно оси Oy. Координаты Q равны:',
    choices: [
      { key: 'A', text: '(−3, 4)' },
      { key: 'B', text: '(3, −4)' },
      { key: 'C', text: '(−3, −4)' },
      { key: 'D', text: '(4, 3)' },
    ],
    correctKey: 'A', difficulty: 'easy',
    explanationRu: 'Симметрия относительно оси Oy меняет знак абсциссы, ордината сохраняется.' },

  // MATH — probability
  { id: 'q-math-prob-1', subjectSlug: 'math-en', moduleSlug: 'probability',
    promptRu: 'В коробке 4 белых и 6 чёрных шаров. Наугад берут один. Вероятность достать белый равна:',
    choices: [
      { key: 'A', text: '0.4' },
      { key: 'B', text: '0.5' },
      { key: 'C', text: '0.6' },
      { key: 'D', text: '0.25' },
    ],
    correctKey: 'A', difficulty: 'easy',
    explanationRu: 'P = 4 / (4 + 6) = 0.4.' },

  // MATH — word problems
  { id: 'q-math-word-1', subjectSlug: 'math-en', moduleSlug: 'word-problems',
    promptRu: 'Поезд проходит 240 км за 4 часа. Какова его средняя скорость?',
    choices: [
      { key: 'A', text: '40 км/ч' },
      { key: 'B', text: '50 км/ч' },
      { key: 'C', text: '60 км/ч' },
      { key: 'D', text: '70 км/ч' },
    ],
    correctKey: 'C', difficulty: 'easy',
    explanationRu: 'v = s / t = 240 / 4 = 60 км/ч.' },

  // PHYSICS — units
  { id: 'q-phys-units-1', subjectSlug: 'physics-en', moduleSlug: 'units',
    promptRu: 'Какая из единиц является базовой единицей массы в СИ?',
    choices: [
      { key: 'A', text: 'Н (ньютон)' },
      { key: 'B', text: 'с (секунда)' },
      { key: 'C', text: 'м (метр)' },
      { key: 'D', text: 'кг (килограмм)' },
    ],
    correctKey: 'D', difficulty: 'easy',
    explanationRu: 'В СИ масса измеряется в килограммах. Остальные — единицы других величин.' },

  // PHYSICS — kinematics
  { id: 'q-phys-kin-1', subjectSlug: 'physics-en', moduleSlug: 'kinematics',
    promptRu: 'Колесо обозрения радиуса R совершает один полный оборот. Путь и перемещение кабины равны соответственно:',
    choices: [
      { key: 'A', text: '2πR и 2R' },
      { key: 'B', text: '2πR и 0' },
      { key: 'C', text: '0 и 2πR' },
      { key: 'D', text: '2R и 2πR' },
    ],
    correctKey: 'B', difficulty: 'medium',
    explanationRu: 'Путь равен длине окружности 2πR; перемещение — нулевой вектор, так как кабина вернулась в исходную точку.' },

  // PHYSICS — dynamics
  { id: 'q-phys-dyn-1', subjectSlug: 'physics-en', moduleSlug: 'dynamics',
    promptRu: 'Гравитационное ускорение на Луне примерно в 6 раз меньше земного. Если на Земле тело весит 120 Н, его вес на Луне:',
    choices: [
      { key: 'A', text: '60 Н' },
      { key: 'B', text: '20 Н' },
      { key: 'C', text: '120 Н' },
      { key: 'D', text: '720 Н' },
    ],
    correctKey: 'B', difficulty: 'easy',
    explanationRu: 'P_Луна = P_Земля / 6 = 120 / 6 = 20 Н.' },
  { id: 'q-phys-dyn-2', subjectSlug: 'physics-en', moduleSlug: 'dynamics',
    promptRu: 'На пружину жёсткостью k = 10 Н/м, длина которой в свободном состоянии 0,7 м, действует растягивающая сила 3 Н. Новая длина пружины равна:',
    choices: [
      { key: 'A', text: '0,4 м' },
      { key: 'B', text: '0,7 м' },
      { key: 'C', text: '1,0 м' },
      { key: 'D', text: '1,3 м' },
    ],
    correctKey: 'C', difficulty: 'medium',
    explanationRu: 'Удлинение Δx = F / k = 3 / 10 = 0,3 м. Новая длина = 0,7 + 0,3 = 1,0 м.' },
  { id: 'q-phys-dyn-3', subjectSlug: 'physics-en', moduleSlug: 'dynamics',
    promptRu: 'На тело действуют две силы F₁ = 3 Н и F₂ = 5 Н. Какое значение модуля их равнодействующей НЕВОЗМОЖНО?',
    choices: [
      { key: 'A', text: '2 Н' },
      { key: 'B', text: '9 Н' },
      { key: 'C', text: '5 Н' },
      { key: 'D', text: '8 Н' },
    ],
    correctKey: 'B', difficulty: 'medium',
    explanationRu: 'Модуль равнодействующей лежит в пределах |F₁ − F₂| ≤ |R| ≤ F₁ + F₂, то есть от 2 до 8 Н. 9 Н невозможно.' },

  // PHYSICS — electricity
  { id: 'q-phys-elec-1', subjectSlug: 'physics-en', moduleSlug: 'electricity',
    promptRu: 'В однородном магнитном поле прямой проводник длиной 0,5 м расположен перпендикулярно полю. При токе 10 А на него действует сила Ампера 1,5 Н. Магнитная индукция поля равна:',
    choices: [
      { key: 'A', text: '0,3 Тл' },
      { key: 'B', text: '0,2 Тл' },
      { key: 'C', text: '0,4 Тл' },
      { key: 'D', text: '0,1 Тл' },
    ],
    correctKey: 'A', difficulty: 'medium',
    explanationRu: 'F = B·I·L → B = F / (I·L) = 1,5 / (10·0,5) = 0,3 Тл.' },
  { id: 'q-phys-elec-2', subjectSlug: 'physics-en', moduleSlug: 'electricity',
    promptRu: 'Через резистор сопротивлением 20 Ом течёт ток 0,5 А. Какое напряжение приложено к резистору?',
    choices: [
      { key: 'A', text: '5 В' },
      { key: 'B', text: '10 В' },
      { key: 'C', text: '20 В' },
      { key: 'D', text: '40 В' },
    ],
    correctKey: 'B', difficulty: 'easy',
    explanationRu: 'По закону Ома U = I·R = 0,5·20 = 10 В.' },

  // PHYSICS — energy
  { id: 'q-phys-en-1', subjectSlug: 'physics-en', moduleSlug: 'energy',
    promptRu: 'Тело массой 2 кг поднимают равномерно на высоту 5 м. Какую работу совершает сила тяжести? (g = 10 м/с²)',
    choices: [
      { key: 'A', text: '−100 Дж' },
      { key: 'B', text: '100 Дж' },
      { key: 'C', text: '0 Дж' },
      { key: 'D', text: '50 Дж' },
    ],
    correctKey: 'A', difficulty: 'medium',
    explanationRu: 'Сила тяжести направлена вниз, перемещение — вверх. A = −mgh = −2·10·5 = −100 Дж.' },

  // PHYSICS — waves
  { id: 'q-phys-wav-1', subjectSlug: 'physics-en', moduleSlug: 'waves',
    promptRu: 'Частота звуковой волны 200 Гц, скорость распространения 340 м/с. Длина волны равна:',
    choices: [
      { key: 'A', text: '0,59 м' },
      { key: 'B', text: '1,7 м' },
      { key: 'C', text: '68 м' },
      { key: 'D', text: '540 м' },
    ],
    correctKey: 'B', difficulty: 'easy',
    explanationRu: 'λ = v / f = 340 / 200 = 1,7 м.' },

  // CHEMISTRY — basics
  { id: 'q-chem-basics-1', subjectSlug: 'chemistry-en', moduleSlug: 'basics',
    promptRu: 'Сколько молекул содержится в 0,5 моль вещества? (Nₐ ≈ 6·10²³)',
    choices: [
      { key: 'A', text: '3·10²³' },
      { key: 'B', text: '6·10²³' },
      { key: 'C', text: '1,2·10²⁴' },
      { key: 'D', text: '1·10²³' },
    ],
    correctKey: 'A', difficulty: 'easy',
    explanationRu: 'N = ν · Nₐ = 0,5 · 6·10²³ = 3·10²³.' },

  // CHEMISTRY — periodic
  { id: 'q-chem-per-1', subjectSlug: 'chemistry-en', moduleSlug: 'periodic',
    promptRu: 'Сколько электронов на внешнем уровне у атома кислорода?',
    choices: [
      { key: 'A', text: '4' },
      { key: 'B', text: '6' },
      { key: 'C', text: '8' },
      { key: 'D', text: '2' },
    ],
    correctKey: 'B', difficulty: 'easy',
    explanationRu: 'Кислород — элемент VI группы главной подгруппы, на внешнем уровне 6 электронов.' },

  // CHEMISTRY — stoichiometry
  { id: 'q-chem-stoich-1', subjectSlug: 'chemistry-en', moduleSlug: 'stoichiometry',
    promptRu: 'При полном сгорании 2 моль водорода (2H₂ + O₂ → 2H₂O) расходуется кислорода:',
    choices: [
      { key: 'A', text: '0,5 моль' },
      { key: 'B', text: '1 моль' },
      { key: 'C', text: '2 моль' },
      { key: 'D', text: '4 моль' },
    ],
    correctKey: 'B', difficulty: 'easy',
    explanationRu: 'По уравнению на 2 моль H₂ приходится 1 моль O₂.' },
];

export function questionsBySubject(slug: SubjectSlug): QuestionItem[] {
  return QUESTIONS.filter((q) => q.subjectSlug === slug);
}

export function questionsByModule(subject: SubjectSlug, moduleSlug: string): QuestionItem[] {
  return QUESTIONS.filter((q) => q.subjectSlug === subject && q.moduleSlug === moduleSlug);
}
