import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, Target } from "lucide-react"

export function Features() {
  return (
    <section id="recursos" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que você recebe</h2>
          <p className="text-xl text-muted-foreground">
            Três tipos de materiais de estudo personalizados para seu conteúdo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Resumos Estruturados</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="font-medium">✓ Visão Geral</div>
                <div className="font-medium">✓ Fatos-Chave</div>
                <div className="font-medium">✓ Conceitos Centrais</div>
                <div className="font-medium">✓ Exemplos Práticos</div>
                <div className="font-medium">✓ Glossário de Termos</div>
              </div>
              <Badge variant="secondary" className="w-full justify-center">
                Organização clara e lógica
              </Badge>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Flashcards Inteligentes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="font-medium">✓ Conceitos-chave</div>
                <div className="font-medium">✓ Definições importantes</div>
                <div className="font-medium">✓ Exemplos práticos</div>
                <div className="font-medium">✓ Revisão espaçada</div>
                <div className="font-medium">✓ Dificuldade adaptativa</div>
              </div>
              <Badge variant="secondary" className="w-full justify-center">
                Memorização eficiente
              </Badge>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Quizzes Personalizados</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="font-medium">✓ Múltipla escolha</div>
                <div className="font-medium">✓ Verdadeiro ou falso</div>
                <div className="font-medium">✓ Questões abertas</div>
                <div className="font-medium">✓ Feedback imediato</div>
                <div className="font-medium">✓ Pontuação detalhada</div>
              </div>
              <Badge variant="secondary" className="w-full justify-center">
                Avaliação completa
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
