import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold">
            revisao.pro
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#como-funciona">
            Como funciona
          </a>
          <a href="#recursos">
            Recursos
          </a>
          <a href="#exemplos">
            Exemplos
          </a>
        </nav>

        <Button asChild variant="flat">
          <Link href="/auth">
            Entrar
          </Link>
        </Button>
      </div>
    </header >
  )
}
