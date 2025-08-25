import { Button } from "@/components/ui/button"
import { Zap, FileText, Video, Headphones, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* Título principal */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Faça revisão de qualquer conteúdo
            em segundos
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Envie seu conteúdo e nosso modelo de IA vai criar resumos, flashcards e quizzes automáticos.
          </p>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              asChild
              size="lg"
              variant="flat"
              className="text-lg px-8 py-6"
            >
              <Link href="/auth">
                <Zap className="mr-2 h-5 w-5" />
                Criar minha conta
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="flat"
              className="text-lg px-8 py-6"
            >
              <Link href="/auth">
                <ArrowRight className="mr-2 h-5 w-5" />
                Ver como funciona
              </Link>
            </Button>
          </div>

          {/* Cards de formatos suportados */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-secondary/70 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <FileText className="h-8 w-8 mx-auto mb-3" />
              <div className="font-semibold">Textos</div>
              <div className="text-sm">PDF, DOCX, TXT</div>
            </div>

            <div className="bg-secondary/70 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <Video className="h-8 w-8 mx-auto mb-3" />
              <div className="font-semibold">Vídeos</div>
              <div className="text-sm">MP4, AVI, MOV</div>
            </div>

            <div className="bg-secondary/70 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <Headphones className="h-8 w-8 mx-auto mb-3" />
              <div className="font-semibold">Áudios</div>
              <div className="text-sm">MP3, WAV, M4A</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
