export enum Difficulty {
  HARD = 'Hard',
  MEDIUM = 'Medium',
  EASY = 'Easy'
}

export enum Mode {
  PRACTICE = 'practice',
  EXAM = 'exam'
}

export enum FrqDescTab {
  DESCRIPTION = 'Description',
  SOLUTIONS = 'Solution',
  EXPLANATION = 'Explanation',
  RESULT = 'Result'
}

export enum RunStatus {
  CORRECT = 0,
  WRONG_ANSWER = 101,
  RUNTIME_CATCHED = 102,
  COMPILE_TIMEOUT = 201,
  COMPILE_ERROR = 202,
  RUNTIME_ERROR = 203
}

export type TestResult = {
  passed: boolean
  error: string | null
  input: string
  output: string
  prerequisite: string
}

export type RunResult = {
  id: string
  frq_id: string
  sub_frq_number: string
  code: string
  user_id: string
  patched_code: {
    class_name: string
    content: string
  }[]
  worst_test_result: {
    status: number
    compilation_error?: string
    runtime_error?: string
    prerequisite?: string
    input?: string
    output?: string
    expected?: string
  }
}

export type FrqItem = {
  id: string
  year: number
  number: number
  name: string
  topic: string
  sub_topic: string
  difficulty: Difficulty
  language: string
  keynotes: string[]
  // metadata: {
  //   year: number
  //   number: number
  //   name: string
  //   topic: string
  //   sub_topic: string
  //   difficulty: Difficulty
  //   language: string
  //   keynotes: string[]
  // }
}

export type Frq = {
  id: string
  description: string
  metadata: {
    year: number
    number: number
    name: string
    topic: string
    sub_topic: string
    difficulty: Difficulty
    language: string
    keynotes: string[]
  },
  solutions: {
    class_name: string
    content: string
  }[],
  sub_frqs: string[]
}

export type EssentialKnowlwdge = {
  name: string
  unit_id: string
  unit_name: string
  topic_id: string
  topic_name: string
}

export type EssentialKnowlwdgeSimple = {
  id: string
  name: string
}

export type Topic = {
  id: string
  name: string
  essential_knowledges: EssentialKnowlwdgeSimple[]
}

export type Unit = {
  name: string
  topics: Topic[]
}

export type TExplanation = {
  isUserMessage: boolean
  content: string
}

export type Solution = {
  class_name: string
  content: string
}

export type SubmitScore = {
  total: number
  passed: number
  details: {
    sub_frq_number: string
    total: number
    passed: number
  }[]
}

export type SubmitRelated = {
  id: string
  name: string
}[]

export type SubmitCode = {
  sub_frq_number: string
  code: string
}[]

// DEV
export enum McqQuestionNumber {
  TEN = '10',
  TWENTY = '20',
  THIRTY = '30',
  FORTY = '40'
}

export enum FrqTab {
  DESCRIPTION = 'Description',
  SOLUTION = 'Solution',
  RESULT = 'Result'
}

export enum McqMode {
  DEFAULT = 'Default (Random questions according to syllabus units showed below)',
  CUSTOM = 'Custom (Select the units you want to practice)'
}

export enum ChoiceLabel {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export enum TopbarType {
  FRQ = 'FRQ',
  MCQ = 'MCQ'
}

export enum QuestionTab {
  DESCRIPTION = 'Description',
  SOLUTIONS = 'Solution',
  RESULT = 'Result',
  EXPLANATION = 'Explanation'
}

export type Choice = {
  label: ChoiceLabel
  content: string
}

export type Mcq = {
  name: string
  description: string
  choices: Choice[]
}

export type McqWithStatus = {
  name: string
  description: string
  isFinished: boolean
  isStarred: boolean
  isMarked: boolean
  userAnswer: ChoiceLabel | undefined
  choices: Choice[]
}

export type Exam = {
  id: string
  year: string
  name: string
  difficulty: Difficulty
}

// export type Knowledge = {
//   id: string
//   number: string
//   description: string
// }

// export type Topic = {
//   topicNumber: string
//   topicName: string
//   knowledges: Knowledge[]
// }

// export type Unit = {
//   unitNumber: string
//   unitName: string
//   topics: Topic[]
// }

// export type Frq = {
//   id: string
//   questionId: string
//   name: string
//   topicId: string
//   topicName: string
//   subTopic: string
//   difficulty: string
//   keynotes: string[]
// }
