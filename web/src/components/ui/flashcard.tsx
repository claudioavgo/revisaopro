"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FlashcardProps {
  readonly question: string
  readonly answer: string
  readonly className?: string
}

export function Flashcard({ question, answer, className }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className={cn("perspective-1000 w-full h-96", className)}
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsFlipped(!isFlipped)
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={isFlipped ? "Mostrar pergunta" : "Mostrar resposta"}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Frente do card - Pergunta */}
        <Card className="absolute inset-0 w-full h-full backface-hidden">
          <CardContent className="flex items-center justify-center h-full p-6">
            <div className="text-center space-y-4">
              <div className="text-sm text-muted-foreground font-medium">
                Pergunta
              </div>
              <div className="text-lg font-medium text-foreground">
                {question}
              </div>
              <div className="text-xs text-muted-foreground">
                Clique para ver a resposta
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verso do card - Resposta */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-primary">
          <CardContent className="flex items-center justify-center h-full p-6">
            <div className="text-center space-y-4">
              <div className="text-sm text-primary-foreground/80 font-medium">
                Resposta
              </div>
              <div className="text-lg font-medium text-primary-foreground">
                {answer}
              </div>
              <div className="text-xs text-primary-foreground/70">
                Clique para voltar à pergunta
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
