import { User } from 'lucide-react';

interface AuthorBioProps {
  author: string;
  date: string;
  readingTime: string;
}

export function AuthorBio({ author, date, readingTime }: AuthorBioProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface/50 p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
        <User className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-foreground">
          {author}
        </p>
        <p className="mt-0.5 text-sm text-foreground-secondary">
          Resume experts sharing proven strategies to help you land your next role.
        </p>
        <div className="mt-2 flex items-center gap-3 text-xs text-foreground-secondary">
          <span>{date}</span>
          <span aria-hidden="true">·</span>
          <span>{readingTime}</span>
        </div>
      </div>
    </div>
  );
}
