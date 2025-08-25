"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuestionType, Difficulty } from "@/types/quiz.schema";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface QuestionFormProps {
  onSubmit: (types: QuestionType[], difficulty: Difficulty[]) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function QuestionForm({ onSubmit, isLoading, disabled = false }: QuestionFormProps) {
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([]);

  const toggleType = (type: QuestionType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulties(prev =>
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const isValid = selectedTypes.length > 0 && selectedDifficulties.length > 0;

  const handleSubmit = () => {
    if (isValid && !isLoading && !disabled) {
      onSubmit(selectedTypes, selectedDifficulties);
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-8 p-8 select-none", disabled && "opacity-50 pointer-events-none")}>
      <h2 className="text-2xl font-semibold">Tipos de questões</h2>

      <div className="flex flex-col gap-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            variant="flat"
            className={cn(
              "h-auto py-4 flex items-center gap-2",
              selectedTypes.includes("MULTIPLE_CHOICE") && "bg-accent"
            )}
            onClick={() => toggleType("MULTIPLE_CHOICE")}
            disabled={disabled}
          >
            <span className="text-xl">📝</span>{" "}
            Múltipla Escolha
          </Button>

          <Button
            variant="flat"
            className={cn(
              "h-auto py-4 flex items-center gap-2",
              selectedTypes.includes("TRUE_FALSE") && "bg-accent"
            )}
            onClick={() => toggleType("TRUE_FALSE")}
            disabled={disabled}
          >
            <span className="text-xl">✓</span>{" "}
            Verdadeiro/Falso
          </Button>

          <Button
            variant="flat"
            className={cn(
              "h-auto py-4 flex items-center gap-2 col-span-1 md:col-span-2 lg:col-span-1",
              selectedTypes.includes("FREE_RESPONSE") && "bg-accent"
            )}
            onClick={() => toggleType("FREE_RESPONSE")}
            disabled={disabled}
          >
            <span className="text-xl">📄</span>{" "}
            Resposta livre
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        <h3 className="text-xl font-semibold">Dificuldade das questões</h3>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="flat"
            className={cn(
              "h-auto py-2 px-6 flex items-center gap-2",
              selectedDifficulties.includes("EASY") && "bg-accent"
            )}
            onClick={() => toggleDifficulty("EASY")}
            disabled={disabled}
          >
            <span className="text-xl">⭐</span>{" "}
            Fácil
          </Button>

          <Button
            variant="flat"
            className={cn(
              "h-auto py-2 px-6 flex items-center gap-2",
              selectedDifficulties.includes("MEDIUM") && "bg-accent"
            )}
            onClick={() => toggleDifficulty("MEDIUM")}
            disabled={disabled}
          >
            <span className="text-xl">⭐⭐</span>{" "}
            Médio
          </Button>

          <Button
            variant="flat"
            className={cn(
              "h-auto py-2 px-6 flex items-center gap-2",
              selectedDifficulties.includes("HARD") && "bg-accent"
            )}
            onClick={() => toggleDifficulty("HARD")}
            disabled={disabled}
          >
            <span className="text-xl">⭐⭐⭐</span>{" "}
            Difícil
          </Button>
        </div>
      </div>

      <Button
        variant="flat"
        size="lg"
        className="w-full"
        onClick={handleSubmit}
        disabled={!isValid || isLoading || disabled}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <span className="text-xl mr-2">✨</span>{" "}
            Criar agora!
          </>
        )}
      </Button>
    </div>
  );
}