"use client"

import { Upload, Sparkles, Target } from "lucide-react"
import { useState } from "react"

export function HowItWorks() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const steps = [
    {
      icon: Upload,
      title: "Jogue aqui",
      description: "Arraste qualquer arquivo: PDF, vídeo, áudio, apresentação... A gente aceita tudo!",
      color: "from-yellow-400 to-orange-400",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      icon: Sparkles,
      title: "IA trabalha",
      description: "Nossa IA lê, escuta e assiste seu conteúdo. Depois organiza tudo de forma inteligente.",
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: Target,
      title: "Você aprende",
      description: "Recebe resumos, flashcards e quizzes prontos. Agora é só estudar e arrasar! 🚀",
      color: "from-green-400 to-blue-400",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ]

  return (
    <section id="como-funciona" className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Como funciona essa{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              mágica
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            É mais simples do que você imagina. Só três passos e pronto!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className={`relative group cursor-pointer transition-all duration-500 ${hoveredCard === index ? 'scale-105' : ''
                  }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card principal */}
                <div className={`
                  ${step.bgColor} ${step.borderColor} 
                  border-3 rounded-3xl p-8 text-center 
                  transform transition-all duration-500 
                  hover:shadow-2xl hover:-translate-y-2
                  relative overflow-hidden
                `}>

                  {/* Número do passo */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-gray-600 shadow-lg">
                    {index + 1}
                  </div>

                  {/* Ícone com gradiente */}
                  <div className={`
                    mx-auto mb-6 w-20 h-20 bg-gradient-to-r ${step.color} 
                    rounded-2xl flex items-center justify-center 
                    transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110
                    shadow-lg
                  `}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>

                  {/* Título */}
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    {step.title}
                  </h3>

                  {/* Descrição */}
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Efeito decorativo */}
                  <div className={`
                    absolute -bottom-10 -right-10 w-20 h-20 
                    bg-gradient-to-r ${step.color} opacity-10 rounded-full 
                    transform transition-all duration-500 group-hover:scale-150
                  `} />
                </div>

                {/* Seta conectora (exceto no último) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-white border-3 border-gray-200 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Parece bom demais para ser verdade?
            <span className="font-semibold text-purple-600"> Experimente grátis!</span>
          </p>
        </div>
      </div>
    </section>
  )
}
