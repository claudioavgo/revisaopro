import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { FileText, Calendar, HardDrive } from "lucide-react";
import { formatDate } from "@/lib/date";

import Link from "next/link";

export function ListContents() {
  const { documents } = useAuth();

  if (documents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="text-center py-12"
      >
        <p className="text-muted-foreground">Nenhum projeto encontrado. Crie um novo projeto para começar!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
          },
        },
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {documents.map((document) => (
        <motion.div
          key={document.id}
          layout
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
              scale: 0.95
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.8,
              }
            },
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href={`/dashboard/documents/${document.id}`}>
            <ContentCard
              document={document}
            />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

interface ContentCardProps {
  readonly document: {
    id: string;
    name: string;
    type: string;
    extension: string;
    size: number;
    pages: number | null;
    createdAt: string;
  };
}

function ContentCard({ document }: ContentCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getBadgeVariant = (extension: string) => {
    const ext = extension.toLowerCase();
    if (['pdf'].includes(ext)) return '3d-red' as const;
    if (['doc', 'docx'].includes(ext)) return '3d-blue' as const;
    if (['xls', 'xlsx'].includes(ext)) return '3d-green' as const;
    if (['ppt', 'pptx'].includes(ext)) return '3d-orange' as const;
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return '3d-purple' as const;
    return '3d-blue' as const;
  };

  return (
    <Card className="transition-all cursor-pointer group h-full font-mono">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <CardTitle
              className="text-lg line-clamp-2 leading-tight transition-colors truncate text-ellipsis"
              title={document.name}
            >
              {document.name}
            </CardTitle>
          </div>
          <Badge variant={getBadgeVariant(document.extension)} className="text-xs font-medium flex-shrink-0">
            {document.extension.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <HardDrive className="h-3.5 w-3.5" />
            <span className="font-medium text-muted-foreground">{formatFileSize(document.size)}</span>
          </div>
          {document.pages && (
            <div className="flex items-center gap-1.5 text-muted">
              <FileText className="h-3.5 w-3.5" />
              <span className="font-medium text-muted-foreground">{document.pages}</span>
              <span className="text-xs">págs</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span className="text-xs">Criado em {formatDate(new Date(document.createdAt))}</span>
        </div>
      </CardFooter>
    </Card>
  );
}