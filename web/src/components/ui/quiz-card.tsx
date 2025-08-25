"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

interface QuizCardProps {
  readonly questionNumber: number
  readonly totalQuestions: number
  readonly question: string
  readonly options: QuizOption[]
  readonly explanation?: string
  readonly onAnswer?: (selectedOption: QuizOption, isCorrect: boolean) => void
}

export function QuizCard({
  questionNumber,
  totalQuestions,
  question,
  options,
  explanation,
  onAnswer
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleOptionSelect = (option: QuizOption) => {
    if (showResult) return

    setSelectedOption(option)
    setShowResult(true)
    onAnswer?.(option, option.isCorrect)
  }

  const getOptionButtonColor = (option: QuizOption) => {
    if (!showResult) return ""

    if (option.isCorrect) return "border-green-600 text-green-600"
    if (selectedOption?.id === option.id && !option.isCorrect) return "border-red-600 text-red-600"
    return "border-border text-foreground"
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Questão {questionNumber} de {totalQuestions}
          </Badge>
          {showResult && (
            <Badge
              variant={selectedOption?.isCorrect ? "default" : "destructive"}
              className="text-xs"
            >
              {selectedOption?.isCorrect ? "Correto!" : "Incorreto"}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg leading-relaxed">
          {question}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid gap-3">
          {options.map((option) => (
            <Button
              key={option.id}
              variant="flat"
              size="lg"
              className={`h-auto p-4 text-left justify-start ${getOptionButtonColor(option)}`}
              onClick={() => handleOptionSelect(option)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{option.id})</span>
                </div>
                <span className="flex-1">{option.text}</span>
              </div>
            </Button>
          ))}
        </div>

        {showResult && explanation && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="text-sm font-medium mb-2">Explicação:</div>
            <div className="text-sm text-muted-foreground">
              {explanation}
            </div>
          </div>
        )}

        {showResult && (
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedOption(null)
                setShowResult(false)
              }}
            >
              Tentar Novamente
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
