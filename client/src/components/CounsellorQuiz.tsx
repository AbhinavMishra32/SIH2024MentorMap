'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ChevronRight, Timer, AlertCircle } from 'lucide-react'
import QuizComplete from '@/components/QuizComplete'

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: number;
  text: string;
  answers: Answer[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: "What is the primary goal of counseling?",
    answers: [
      { id: 1, text: "To give advice", isCorrect: false },
      { id: 2, text: "To diagnose mental illnesses", isCorrect: false },
      { id: 3, text: "To facilitate personal growth and development", isCorrect: true },
      { id: 4, text: "To prescribe medication", isCorrect: false }
    ]
  },
  {
    id: 2,
    text: "Which of the following is NOT a core counseling skill?",
    answers: [
      { id: 5, text: "Active listening", isCorrect: false },
      { id: 6, text: "Empathy", isCorrect: false },
      { id: 7, text: "Judging", isCorrect: true },
      { id: 8, text: "Reflection", isCorrect: false }
    ]
  },
  {
    id: 3,
    text: "What does the term 'unconditional positive regard' refer to in counseling?",
    answers: [
      { id: 9, text: "Always agreeing with the client", isCorrect: false },
      { id: 10, text: "Accepting the client without judgment", isCorrect: true },
      { id: 11, text: "Positive reinforcement of all behaviors", isCorrect: false },
      { id: 12, text: "Maintaining a cheerful demeanor", isCorrect: false }
    ]
  },
  {
    id: 4,
    text: "Which counseling approach emphasizes the importance of childhood experiences?",
    answers: [
      { id: 13, text: "Cognitive-Behavioral Therapy", isCorrect: false },
      { id: 14, text: "Person-Centered Therapy", isCorrect: false },
      { id: 15, text: "Psychoanalytic Therapy", isCorrect: true },
      { id: 16, text: "Solution-Focused Brief Therapy", isCorrect: false }
    ]
  },
  {
    id: 5,
    text: "What is the purpose of confidentiality in counseling?",
    answers: [
      { id: 17, text: "To protect the counselor from legal issues", isCorrect: false },
      { id: 18, text: "To build trust and create a safe environment for clients", isCorrect: true },
      { id: 19, text: "To keep information from other healthcare providers", isCorrect: false },
      { id: 20, text: "To comply with insurance requirements", isCorrect: false }
    ]
  }
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [timeRemaining, setTimeRemaining] = useState(15 * 60)
  const [quizScore, setQuizScore] = useState(0)
  const [isQuizComplete, setIsQuizComplete] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setIsQuizComplete(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const progress = (currentQuestion / quizQuestions.length) * 100

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleFinishQuiz = () => {
    const finalScore = calculateScore()
    setQuizScore(finalScore)
    setIsQuizComplete(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      const currentScore = calculateScore()
      setQuizScore(currentScore)
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleFinishQuiz()
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0
    quizQuestions.forEach((question, index) => {
      const selectedAnswerId = selectedAnswers[index]
      const correctAnswer = question.answers.find(answer => answer.isCorrect)
      if (correctAnswer && selectedAnswerId === correctAnswer.id) {
        correctAnswers++
      }
    })
    return correctAnswers
  }

  if (isQuizComplete) {
    const scorePercentage = (quizScore / quizQuestions.length) * 100
    return (
      <QuizComplete score={scorePercentage} quizId={1} lessonId={1} lessonCategory="Counseling" />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Counseling Quiz</h1>
              <p className="text-muted-foreground">Test your knowledge of counseling principles</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary font-semibold">
              <Timer className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{currentQuestion + 1} of {quizQuestions.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {currentQuestion + 1}
                  </span>
                  <h2 className="text-xl font-semibold leading-tight">
                    {quizQuestions[currentQuestion].text}
                  </h2>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAnswers[currentQuestion]?.toString() || ""}
                  onValueChange={(value) => {
                    setSelectedAnswers({
                      ...selectedAnswers,
                      [currentQuestion]: parseInt(value)
                    })
                  }}
                  className="space-y-3"
                >
                  {quizQuestions[currentQuestion].answers.map((answer, index) => (
                    <div
                      key={answer.id}
                      className={`relative flex cursor-pointer rounded-lg border-2 p-4 transition-colors hover:bg-muted ${
                        selectedAnswers[currentQuestion] === answer.id
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent'
                      }`}
                    >
                      <RadioGroupItem
                        value={answer.id.toString()}
                        id={`option-${answer.id}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`option-${answer.id}`}
                        className="flex grow cursor-pointer items-center gap-4"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-sm">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {answer.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t bg-muted/50 px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  Select an answer to continue
                </div>
                <Button
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  onClick={handleNextQuestion}
                  className="gap-2"
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

