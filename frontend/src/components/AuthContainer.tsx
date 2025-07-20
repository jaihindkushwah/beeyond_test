import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface IAuthContainerProps {
  children: React.ReactNode;
  title?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function AuthContainer({
  children,
  title,
  onSubmit,
}: IAuthContainerProps) {
  return (
    <div className="min-h-screen  flex items-center justify-center bg-muted px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {title ?? "Sign in to your account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {children}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
