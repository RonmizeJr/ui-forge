// src/app/api/generate/route.ts
import { NextResponse } from "next/server";
import { GenerateComponentSchema } from "~/types";

const templates: Record<string, (name: string) => string> = {
  button: (name) => `
import { Button } from "@/components/ui/button";

export function ${name}() {
  return <Button>Click Me</Button>;
}
`,
  card: (name) => `
import { Card, CardContent } from "@/components/ui/card";

export function ${name}() {
  return (
    <Card>
      <CardContent>
        Your content here
      </CardContent>
    </Card>
  );
}
`,
  modal: (name) => `
'use client';
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export function ${name}() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setOpen(true)}>Open Modal</button>
      </DialogTrigger>
      <DialogContent>
        Modal Content
      </DialogContent>
    </Dialog>
  );
}
`,
  form: (name) => `
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ${name}() {
  return (
    <form className="space-y-4">
      <Input placeholder="Enter something..." />
      <Button type="submit">Submit</Button>
    </form>
  );
}
`,
  navbar: (name) => `
export function ${name}() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <div className="font-bold">Logo</div>
      <ul className="flex gap-4">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}
`,
};

export async function POST(req: Request) {
  const body = (await req.json()) as { name: string; type: string };

  const result = GenerateComponentSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 400 });
  }

  const { name, type } = result.data;
  const template = templates[type];
  if (!template) {
    return NextResponse.json(
      { error: "Invalid component type" },
      { status: 400 },
    );
  }
  const code = template(name);

  return NextResponse.json({ code });
}
