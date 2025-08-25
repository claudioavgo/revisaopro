"use client";


interface NavbarProps {
  activeTab: "summary" | "questions" | "flashcards";
  setActiveTab: (tab: "summary" | "questions" | "flashcards") => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <div className="flex items-center justify-start border-b w-full gap-4">
      <button className={`p-4 border-b-2 ${activeTab === "summary" ? " border-primary" : "border-transparent"}`} onClick={() => setActiveTab("summary")}>
        Resumo
      </button>
      <button className={`p-4 border-b-2 ${activeTab === "questions" ? " border-primary" : "border-transparent"}`} onClick={() => setActiveTab("questions")}>
        Perguntas
      </button>
      <button className={`p-4 border-b-2 ${activeTab === "flashcards" ? " border-primary" : "border-transparent"}`} onClick={() => setActiveTab("flashcards")}>
        Flashcards
      </button>
    </div>
  );
}