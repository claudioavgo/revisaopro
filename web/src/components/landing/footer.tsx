import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-foreground text-secondary p-6">
      <div className="container mx-auto">
        <div className="text-center">

          {/* Logo e nome */}
          <div className="flex items-center justify-center space-x-3">
            <span className="text-2xl font-bold">
              revisao.pro
            </span>
          </div>

          {/* Tagline */}
          <p className="text-lg mb-8 max-w-md mx-auto text-muted-foreground">
            Transforme arquivos em conhecimento
          </p>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-8 mb-8 text-muted-foreground">
            <a href="/termos">Termos de Uso</a>
            <a href="/privacidade">Privacidade</a>
            <a href="/contato">Contato</a>
            <a href="/suporte">Suporte</a>
          </nav>

          {/* Copyright */}
          <div className="border-t border-muted-foreground pt-8 text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              © 2025 revisao.pro. Feito por <Link href="https://claudioo.com" target="_blank">claudioo.com</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
