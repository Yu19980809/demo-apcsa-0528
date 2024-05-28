import {
  Award,
  FlaskConical,
  ScrollText,
  Settings,
  Sparkles,
  User
} from 'lucide-react'

import { ChoiceLabel, FrqDescTab, FrqTab, QuestionTab } from '@/lib/types'

export const apiUrl = import.meta.env.VITE_API_URL
export const examMcqTimeLimit = 60 * 30
export const examFrqTimeLimit = 60 * 30

export const userOptions = [
  {
    label: 'Profile',
    href: '/user/profile',
    icon: User
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings
  }
]

export const explation = [
  {
    content: 'explnation item 1',
  },
  {
    content: 'question from user',
    isUserMessage: true
  },
  {
    content: 'explnation item 2',
  }
]

export const explanationData = [
  {
    content: "The error in the student's code is on line 5, where the semicolon is missing at the end of the declaration of the `totalSteps` variable."
  },
  {
    content: "In Java, every statement must end with a semicolon (`;`). The lack of a semicolon at the end of the variable declaration is causing the compilation error."
  },
  {
    content: "The student should enhance their understanding of Java syntax, particularly the rules for terminating statements with semicolons. It's important to remember that variable declarations, like most other statements in Java, must end with a semicolon."
  },
  {
    content: "Could you explain the semicolon thing specificily",
    isUserMessage: true
  },
  {
    content: "Explaning..."
  }
]

export const descriptionTabs = [
  {
    label: 'Description',
    value: FrqDescTab.DESCRIPTION,
    icon: ScrollText
  },
  {
    label: 'Solutions',
    value: FrqDescTab.SOLUTIONS,
    icon: FlaskConical
  },
  {
    label: 'Explanation',
    value: FrqDescTab.EXPLANATION,
    icon: Sparkles
  },
  {
    label: 'Result',
    value: FrqDescTab.RESULT,
    icon: Award
  }
]

// export const mcqQuestions = [
//   {
//     name: 'question name 1',
//     description: 'question description 1',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 2',
//     description: 'question description 2',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 3',
//     description: 'question description 3',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 4',
//     description: 'question description 4',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 5',
//     description: 'question description 5',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 6',
//     description: 'question description 6',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 7',
//     description: 'question description 7',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 8',
//     description: 'question description 8',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 9',
//     description: 'question description 9',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 10',
//     description: 'question description 10',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 11',
//     description: 'question description 11',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 12',
//     description: 'question description 12',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 13',
//     description: 'question description 13',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 14',
//     description: 'question description 14',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 15',
//     description: 'question description 15',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 16',
//     description: 'question description 16',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 17',
//     description: 'question description 17',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 18',
//     description: 'question description 18',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 19',
//     description: 'question description 19',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 20',
//     description: 'question description 20',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 21',
//     description: 'question description 21',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 22',
//     description: 'question description 22',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 23',
//     description: 'question description 23',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 24',
//     description: 'question description 24',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 25',
//     description: 'question description 25',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 26',
//     description: 'question description 26',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 27',
//     description: 'question description 27',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 28',
//     description: 'question description 28',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 29',
//     description: 'question description 29',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   },
//   {
//     name: 'question name 30',
//     description: 'question description 30',
//     isFinished: false,
//     isMarked: false,
//     isStared: false,
//     userAnswer: null,
//     choices: [
//       {
//         label: ChoiceLabel.A,
//         content: 'Choice A'
//       },
//       {
//         label: ChoiceLabel.B,
//         content: 'Choice B'
//       },
//       {
//         label: ChoiceLabel.C,
//         content: 'Choice C'
//       },
//       {
//         label: ChoiceLabel.D,
//         content: 'Choice D'
//       }
//     ]
//   }
// ]

export const mcqQuestions = [
  {
    name: 'question name 1',
    description: 'question description 1',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 2',
    description: 'question description 2',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 3',
    description: 'question description 3',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'Q4',
    description: 'Which of the following will evaluate to true only if boolean expressions A, B, and C are all false?',
    choices: [
      {
        label: ChoiceLabel.A,
        content: '!A && !(B && !C)'
      },
      {
        label: ChoiceLabel.B,
        content: '!A || !B || !C'
      },
      {
        label: ChoiceLabel.C,
        content: '!(A || B || C)'
      },
      {
        label: ChoiceLabel.D,
        content: '!(A && B && C)'
      }
    ]
  },
  {
    name: 'question name 5',
    description: 'question description 5',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 6',
    description: 'question description 6',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 7',
    description: 'question description 7',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 8',
    description: 'question description 8',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 9',
    description: 'question description 9',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 10',
    description: 'question description 10',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 11',
    description: 'question description 11',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 12',
    description: 'question description 12',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 13',
    description: 'question description 13',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 14',
    description: 'question description 14',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 15',
    description: 'question description 15',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 16',
    description: 'question description 16',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 17',
    description: 'question description 17',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 18',
    description: 'question description 18',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 19',
    description: 'question description 19',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 20',
    description: 'question description 20',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 21',
    description: 'question description 21',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 22',
    description: 'question description 22',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 23',
    description: 'question description 23',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 24',
    description: 'question description 24',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 25',
    description: 'question description 25',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 26',
    description: 'question description 26',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 27',
    description: 'question description 27',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 28',
    description: 'question description 28',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 29',
    description: 'question description 29',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  },
  {
    name: 'question name 30',
    description: 'question description 30',
    choices: [
      {
        label: ChoiceLabel.A,
        content: 'Choice A'
      },
      {
        label: ChoiceLabel.B,
        content: 'Choice B'
      },
      {
        label: ChoiceLabel.C,
        content: 'Choice C'
      },
      {
        label: ChoiceLabel.D,
        content: 'Choice D'
      }
    ]
  }
]

export const frqTabs = [
  {
    label: 'Description',
    value: FrqTab.DESCRIPTION
  },
  {
    label: 'Solution',
    value: FrqTab.SOLUTION
  },
  {
    label: 'Result',
    value: FrqTab.RESULT
  }
]

export const frqList = [
  {
    id: '1',
    questionId: '202204',
    name: 'Number Grid (Repopulate + Count Increasing)',
    topicId: '4',
    topicName: '2D Array',
    subTopic: '2D Array (Primitive)',
    difficulty: 'Medium',
    keynotes: ['Mod', 'Random', '2D Array Traversal', 'Meeting Criteria  Count']
  },
  {
    id: '2',
    questionId: '202202',
    name: 'GameSpinner',
    topicId: '2',
    topicName: '2D Array',
    subTopic: 'Writting Classes',
    difficulty: 'Easy',
    keynotes: ['Random']
  }
]

export const navLinks = [
  {
    label: 'Learn',
    href: '/learn',
    content: []
  },
  {
    label: 'Practice',
    href: '/practice',
    content: [
      {
        label: 'MCQ',
        href: '/practice/mcq/config'
      },
      {
        label: 'FRQ',
        href: '/practice/frq/table'
      }
    ]
  },
  {
    label: 'Exam',
    href: '/exam',
    content: []
  }
]

export const homeCards = [
  {
    label: 'Unfinished Exam',
    description: '',
    href: '/exam/unfinish',
    image: ''
  },
  {
    label: 'Stars',
    description: '',
    href: '/user/stars',
    image: ''
  },
  {
    label: 'Learning Plan',
    description: '',
    href: '/user/learning',
    image: ''
  },
  {
    label: 'History',
    description: '',
    href: '/user/history',
    image: ''
  }
]

export const syllabus = [
  {
    unitNumber: '1',
    unitName: 'Primitive Types',
    topics: [
      {
        topicNumber: '1.1',
        topicName: 'Why Programming? Why Java?',
        knowledges: [
          {
            id: 'MOD-1.A.1',
            number: '1.1.1',
            description: 'System.out.print and System.print.ln display information on the computer monitor.'
          },
          {
            id: 'MOD-1.A.2',
            number: '1.1.2',
            description: 'System.out.print moves the cursor to a new line after the information has been displayed, while System.out.print does not.'
          }
        ]
      },
      {
        topicNumber: '1.2',
        topicName: 'Variables and Data Types',
        knowledges: [
          {
            id: 'VAR-1.A.1',
            number: '1.2.1',
            description: 'A string literal is enclosed in double quotes.'
          },
          {
            id: 'VAR-1.B.1',
            number: '1.2.2',
            description: 'A type is a set of values(a domain) and a set of operations on them.'
          }
        ]
      }
    ]
  },
  {
    unitNumber: '2',
    unitName: 'Using Objects',
    topics: [
      {
        topicNumber: '2.1',
        topicName: 'Objects: Instances of Classes',
        knowledges: [
          {
            id: 'MOD-1.B',
            number: '2.1.1',
            description: 'Explain the relationship between a class and an object.'
          }
        ]
      },
      {
        topicNumber: '2.2',
        topicName: 'Creating and Storing Objects (Instantiation)',
        knowledges: [
          {
            id: 'MOD-1.C',
            number: '2.2.1',
            description: 'Identify, using its signature, the correct constructor being called.'
          }
        ]
      }
    ]
  }
]
