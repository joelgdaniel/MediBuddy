"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "@/components/modetoggle";

export function DashboardHeader() {
  const { user } = useUser();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          {user && (
            <span className="text-sm text-muted-foreground">
              Welcome back, {user.firstName || user.username}
            </span>
          )}
        </div>
      </div>
    </header>
  );
} 