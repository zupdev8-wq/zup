export type CategoryId =
  | 'brasil' | 'historia' | 'natureza' | 'espaco' | 'ciencia' | 'cultura'
  | 'geografia' | 'esportes' | 'tecnologia' | 'gastronomia' | 'artes' | 'mundo'
  | 'geopolitica' | 'constituicao' | 'portugues' | 'economia' | 'raciocinio'
  | 'cinema' | 'series' | 'musica' | 'games' | 'literatura' | 'filosofia'
  | 'sociologia' | 'psicologia' | 'religioes' | 'teologia' | 'midia' | 'cidadania'
  | 'matematica' | 'fisica' | 'quimica' | 'biologia' | 'direito' | 'administracao'
  | 'contabilidade' | 'informatica' | 'medicina' | 'enfermagem' | 'farmacia'
  | 'biomedicina' | 'engenharia' | 'computacao' | 'revalida';

export type TrackId =
  | 'geral' | 'brasil' | 'brasil-vivido' | 'geopolitica' | 'enem' | 'concursos'
  | 'faculdade' | 'humanas' | 'exatas' | 'biologicas' | 'entretenimento'
  | 'cinema' | 'series' | 'livros' | 'religioes' | 'pensamento' | 'historia' | 'ciencia' | 'artes' | 'tecnologia' | 'revalida';

export type CompanionId = 'capilu' | 'oniri' | 'arumi' | 'guarim';
export type Difficulty = 'facil' | 'medio' | 'dificil';

export type SourceRef = { title: string; url: string };
export type Question = {
  id: string;
  category: CategoryId;
  topic?: string;
  concept?: string;
  question: string;
  choices: [string, string, string, string];
  answer: number;
  fact: string;
  brazil?: boolean;
  source?: SourceRef;
  tracks?: TrackId[];
  difficulty?: Difficulty;
  imageUrl?: string;
  imageAlt?: string;
  imageSource?: SourceRef;
};

export type MicroLesson = {
  id: string;
  category: CategoryId;
  tracks: TrackId[];
  title: string;
  hook: string;
  summary: string;
  body: string[];
  takeaway: string;
  quizQuestionId: string;
  minutes: 1 | 2 | 3 | 5;
  updatedAt: string;
  evergreen: boolean;
  sources: SourceRef[];
};

export type GameMode = 'category' | 'daily' | 'review' | 'mixed' | 'micro' | 'marathon' | 'exam';
export type SessionItem = { questionId: string; order: number[] };
export type SessionAnswer = { questionId: string; choice: number; correct: boolean };
export type Session = {
  id: string;
  mode: GameMode;
  category: CategoryId;
  topicIds?: CategoryId[];
  sourceQuestionId?: string;
  examTitle?: string;
  examQuery?: string;
  items: SessionItem[];
  index: number;
  selected: number | null;
  revealed: boolean;
  answers: SessionAnswer[];
  startedAt: number;
};

export type ReviewState = {
  due: string;
  intervalDays: number;
  strength: number;
  attempts: number;
  lastCorrect: boolean;
};

export type Progress = {
  schemaVersion: 5;
  xp: number;
  stars: number;
  completedIds: string[];
  masteredIds: string[];
  weakIds: string[];
  correct: number;
  answered: number;
  streak: number;
  streakFreezes: number;
  lastPlayed: string;
  dailyDate: string;
  dailyDone: number;
  dailyGoal: number;
  activity: Record<string, number>;
  badges: string[];
  sound: boolean;
  motion: boolean;
  nickname: string;
  companionId: CompanionId;
  preferredTracks: TrackId[];
  onboardingCompleted: boolean;
  activeSession: Session | null;
  completedSessions: string[];
  openedLessonIds: string[];
  learnedLessonIds: string[];
  savedLessonIds: string[];
  reviewSchedule: Record<string, ReviewState>;
};

export const initialProgress: Progress = {
  schemaVersion: 5,
  xp: 0,
  stars: 0,
  completedIds: [],
  masteredIds: [],
  weakIds: [],
  correct: 0,
  answered: 0,
  streak: 0,
  streakFreezes: 1,
  lastPlayed: '',
  dailyDate: '',
  dailyDone: 0,
  dailyGoal: 5,
  activity: {},
  badges: [],
  sound: true,
  motion: true,
  nickname: 'Explorador',
  companionId: 'capilu',
  preferredTracks: ['brasil','geopolitica','historia','pensamento'],
  onboardingCompleted: false,
  activeSession: null,
  completedSessions: [],
  openedLessonIds: [],
  learnedLessonIds: [],
  savedLessonIds: [],
  reviewSchedule: {},
};
