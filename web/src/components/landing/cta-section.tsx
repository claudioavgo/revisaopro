"use client"

import { Button } from "@/components/ui/button"
import { Zap, Heart, Star, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export function CTASection() {
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number, x: number, y: number, delay: number }>>([])

  useEffect(() => {
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }))
    setFloatingElements(elements)
  }, [])

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-green-600">
      {/* Elementos flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute animate-bounce opacity-20"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: '3s'
            }}
          >
            {element.id % 3 === 0 && <Star className="h-6 w-6 text-yellow-300" />}
            {element.id % 3 === 1 && <Heart className="h-6 w-6 text-pink-300" />}
            {element.id % 3 === 2 && <Zap className="h-6 w-6 text-white" />}
          </div>
        ))}
      </div>

      <div className="container mx-auto text-center max-w-4xl relative z-10">

        {/* Badge especial */}
        <div className="inline-block mb-8">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 text-white font-medium">
            🎉 Mais de 10.000 estudantes já usam!
          </div>
        </div>

        {/* Título principal */}
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
          Bora parar de
          <br />
          <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            procrastinar?
          </span>
        </h2>

        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Seus materiais de estudo estão esperando para virar
          <br />
          <span className="font-bold">resumos, flashcards e quizzes automáticos</span>
        </p>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Button
            size="lg"
            className="text-xl px-10 py-6 bg-white text-purple-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-bold"
          >
            <Zap className="mr-3 h-6 w-6" />
            Começar Agora (Grátis!)
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-xl px-10 py-6 border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
          >
            Ver Demonstração
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>

        {/* Benefícios destacados */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl mb-3">🚀</div>
            <div className="text-white font-semibold">Resultados em minutos</div>
            <div className="text-white/80 text-sm">Upload → IA → Materiais prontos</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl mb-3">💸</div>
            <div className="text-white font-semibold">100% Gratuito</div>
            <div className="text-white/80 text-sm">Sem pegadinhas ou cartão</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl mb-3">🧠</div>
            <div className="text-white font-semibold">IA Inteligente</div>
            <div className="text-white/80 text-sm">Aprende com seu conteúdo</div>
          </div>
        </div>

        {/* Texto final motivacional */}
        <div className="mt-12">
          <p className="text-lg text-white/90">
            🤔 Ainda em dúvida?{" "}
            <span className="font-bold text-yellow-300">
              Teste por 5 minutos e veja a magia acontecer!
            </span>
          </p>
        </div>

      </div>
    </section>
  )
}

