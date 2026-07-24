// StatusPage.tsx
"use client";

import { SearchX, Construction, LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  notFound: SearchX,
  construction: Construction,
};

interface StatusPageProps {
  icon: keyof typeof icons;
  title: string;
  message: string;
  showBackButton?: boolean;
}

const StatusPage = ({ icon, title, message, showBackButton = true }: StatusPageProps) => {
  const Icon = icons[icon];

  return (
    <main className="flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <Icon className="mx-auto h-16 w-16 text-primary" strokeWidth={1.5} />
        <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
        <p className="mt-3 text-muted-foreground">{message}</p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="/" className="rounded-lg bg-primary px-5 py-2.5 text-primary-foreground transition ease-out duration-300 hover:opacity-90">
            Go Home
          </a>
          {showBackButton && (
            <button onClick={() => window.history.back()} className="rounded-lg border px-5 py-2.5 transition duration-300 ease-out hover:bg-muted">
              Go Back
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default StatusPage;