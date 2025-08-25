"use client"

import { Flashcard } from "@/components/ui/flashcard"
import { QuizCard } from "@/components/ui/quiz-card"
import { Badge } from "@/components/ui/badge"
import { FileText, Brain, Target, Sparkles } from "lucide-react"
import { useState } from "react"

export function ExampleSection() {
  const [selectedTab, setSelectedTab] = useState<'resumo' | 'flashcard' | 'quiz'>('resumo')

  return (
    <section id="exemplos" className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">

        {/* Header da seção */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <Badge
              variant="secondary"
              className="px-6 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-300 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
              Veja a mágica acontecendo
            </Badge>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transformamos isso
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              nisso aqui! 🤯
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Um PDF chato sobre &quot;Aplicações Web&quot; virou material de estudo interativo.
            <br />
            <span className="font-semibold text-purple-600">
              Clique nas abas abaixo para ver cada resultado:
            </span>
          </p>
        </div>

        {/* Navegação por abas */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 border-2 border-gray-200 shadow-lg">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTab('resumo')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${selectedTab === 'resumo'
                  ? 'bg-yellow-400 text-yellow-900 shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                  }`}
              >
                <FileText className="h-4 w-4" />
                Resumo
              </button>
              <button
                onClick={() => setSelectedTab('flashcard')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${selectedTab === 'flashcard'
                  ? 'bg-purple-400 text-purple-900 shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
              >
                <Brain className="h-4 w-4" />
                Flashcard
              </button>
              <button
                onClick={() => setSelectedTab('quiz')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${selectedTab === 'quiz'
                  ? 'bg-green-400 text-green-900 shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
              >
                <Target className="h-4 w-4" />
                Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo das abas */}
        <div className="max-w-4xl mx-auto">

          {/* Aba Resumo */}
          {selectedTab === 'resumo' && (
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border-2 border-yellow-200 shadow-xl transform transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Resumo Estruturado</h3>
                  <p className="text-gray-600">Organizado e direto ao ponto</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                  <h4 className="text-lg font-bold text-yellow-800 mb-3">🌐 Modelo Cliente-Servidor</h4>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Visão Geral:</strong> Uma aplicação web opera no modelo cliente-servidor, onde o cliente faz uma solicitação ao servidor e recebe uma resposta processada.
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                  <h4 className="text-lg font-bold text-yellow-800 mb-3">⚡ Fatos-Chave</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600">•</span>
                      Cliente solicita recursos ou informações
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600">•</span>
                      Servidor processa a requisição e envia a resposta
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600">•</span>
                      Comunicação ocorre via Internet, utilizando HTTP
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    📚 E muito mais conteúdo estruturado automaticamente!
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Aba Flashcard */}
          {selectedTab === 'flashcard' && (
            <div className="text-center space-y-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border-2 border-purple-200 shadow-xl">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Flashcard Interativo</h3>
                    <p className="text-gray-600">Clique para virar e revelar a resposta!</p>
                  </div>
                </div>

                <Flashcard
                  question="O que é HTTP?"
                  answer="HTTP (Hypertext Transfer Protocol) é o protocolo de comunicação usado para transferir dados entre cliente e servidor na web, operando sobre TCP na porta 80."
                  className="mx-auto max-w-md"
                />

                <div className="mt-6">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-300">
                    🧠 25 flashcards criados automaticamente para revisão espaçada
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Aba Quiz */}
          {selectedTab === 'quiz' && (
            <div className="space-y-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border-2 border-green-200 shadow-xl">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Quiz Personalizado</h3>
                    <p className="text-gray-600">Teste seus conhecimentos de forma interativa!</p>
                  </div>
                </div>

                <QuizCard
                  questionNumber={1}
                  totalQuestions={15}
                  question="Qual é a função do servidor web em uma aplicação cliente-servidor?"
                  options={[
                    { id: "a", text: "Solicitar recursos ao cliente", isCorrect: false },
                    { id: "b", text: "Processar requisições e entregar conteúdos", isCorrect: true },
                    { id: "c", text: "Distribuir requisições entre clientes", isCorrect: false },
                    { id: "d", text: "Gerenciar conexões TCP entre clientes", isCorrect: false }
                  ]}
                  explanation="O servidor web é responsável por processar as requisições HTTP enviadas pelos clientes e entregar os conteúdos solicitados, como páginas HTML, imagens, arquivos, etc."
                  onAnswer={(option, isCorrect) => {
                    console.log('Resposta selecionada:', option.text, 'Correto:', isCorrect)
                  }}
                />

                <div className="text-center mt-6">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
                    🎯 15 questões com feedback detalhado e explicações
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-700 mb-4">
            Impressionado? 🤩
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-purple-600">
              Isso foi só um exemplo.
            </span>{" "}
            Imagine o que podemos fazer com SEU material de estudo!
          </p>
        </div>

      </div>
    </section>
  )
}
