"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import * as Icons from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const Schema = z.object({
  prompt: z.string("Prompt is required").min(5, "Prompt too short"),
});

type Message = {
  id: string;
  level: "easy" | "medium" | "hard" | "expert";
  nQuestions: "five" | "ten" | "fifteen" | "twenty";
  prompt: string;
  createdAt: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      level: "easy",
      nQuestions: "five",
      prompt: "What is the capital of France?",
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      level: "medium",
      nQuestions: "ten",
      prompt: "What is the capital of Spain?",
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      level: "hard",
      nQuestions: "fifteen",
      prompt: "What is the capital of Italy?",
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      level: "expert",
      nQuestions: "twenty",
      prompt: "What is the capital of Germany?",
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      level: "expert",
      nQuestions: "twenty",
      prompt: "What is the capital of Germany?",
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      level: "expert",
      nQuestions: "twenty",
      prompt: "What is the capital of Germany?",
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      level: "expert",
      nQuestions: "twenty",
      prompt: "What is the capital of Germany?",
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      level: "expert",
      nQuestions: "twenty",
      prompt: "What is the capital of Germany?",
      createdAt: new Date().toISOString(),
    },
  ]);
  const formik = useFormik({
    initialValues: {
      level: "easy" as Message["level"],
      nQuestions: "five" as Message["nQuestions"],
      prompt: "" as Message["prompt"],
    },
    validationSchema: toFormikValidationSchema(Schema),
    onSubmit: (values, { resetForm }) => {
      setMessages((prev) => [
        ...prev,
        { id: uuidv4(), ...values, createdAt: new Date().toISOString() },
      ]);
      resetForm();
    },
  });
  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };
  const deleteAllMessages = () => {
    setMessages([]);
  };
  const copyMessage = (id: string) => {
    const message = messages.find((message) => message.id === id);
    formik.setFieldValue("prompt", message?.prompt);
    formik.setFieldValue("level", message?.level);
    formik.setFieldValue("nQuestions", message?.nQuestions);
  };
  const repeatMessage = (id: string) => {
    const message = messages.find((message) => message.id === id);
    if (!message) return;
    formik.setValues({
      prompt: message?.prompt,
      level: message?.level,
      nQuestions: message?.nQuestions,
    });
    formik.handleSubmit();
  };

  return (
    <section className="grid grid-cols-[1fr_380px] overflow-hidden items-center justify-center bg-zinc-50 font-sans dark:bg-neutral-950">
      <div></div>
      <aside className="flex flex-col h-screen overflow-hidden p-4 bg-neutral-900">
        <header className="flex flex-row justify-between items-center pb-5">
          <h1 className="text-2xl font-bold">Topiko</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Icons.EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-24" align="end">
              <DropdownMenuItem disabled>Options</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => deleteAllMessages()}>
                <Icons.Trash2 className=" h-4 w-4" />
                Clear Chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {/* sección scrollable */}
        <section className="flex-1 overflow-y-auto pr-2 flex flex-col gap-8">
          {messages.map((message) => (
            <div key={message.id}>
              <header className="flex flex-row justify-between items-center">
                <p className="opacity-70">
                  {new Date(message.createdAt).toLocaleString(
                    navigator.language,
                    {
                      year: "numeric",
                      month: "2-digit", // Junio, June, etc.
                      day: "numeric", // 10, 11, etc.
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <Icons.EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-24" align="end">
                    <DropdownMenuItem disabled>Options</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => deleteMessage(message.id)}>
                      <Icons.Trash2 className=" h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => copyMessage(message.id)}>
                      <Icons.Copy className=" h-4 w-4" />
                      Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => repeatMessage(message.id)}>
                      <Icons.Repeat className=" h-4 w-4" />
                      Repeat
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </header>
              <p>{message.prompt}</p>
            </div>
          ))}
        </section>
        <section className="flex flex-col gap-4 mt-4">
          <div className="flex flex-row gap-4">
            <section className="flex flex-col gap-2">
              <header className="flex items-center">
                <Label htmlFor="level">Levels</Label>
              </header>
              <Select
                value={formik.values.level}
                onValueChange={(value) => formik.setFieldValue("level", value)}
              >
                <SelectTrigger id="level" className="w-full">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </section>
            <section className="flex flex-col gap-2">
              <header className="flex items-center">
                <Label htmlFor="level">N. Questions</Label>
              </header>
              <Select
                value={formik.values.nQuestions}
                onValueChange={(value) =>
                  formik.setFieldValue("nQuestions", value)
                }
              >
                <SelectTrigger id="n_questions" className="w-full">
                  <SelectValue placeholder="Select a N. Questions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="five">5</SelectItem>
                  <SelectItem value="ten">10</SelectItem>
                  <SelectItem value="fifteen">15</SelectItem>
                  <SelectItem value="twenty">20</SelectItem>
                </SelectContent>
              </Select>
            </section>
          </div>

          <section className="grid gap-2">
            <header className="flex items-center">
              <Label htmlFor="prompt">Prompt</Label>
            </header>
            <Textarea
              id="prompt"
              name="prompt"
              placeholder="Type your message here."
              value={formik.values.prompt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={10}
              className="h-32"
            />
            {formik.errors.prompt && (
              <p className="text-sm text-red-400">{formik.errors.prompt}</p>
            )}
          </section>
          <footer className="flex justify-end items-center">
            <Button
              onClick={() => formik.submitForm()}
              type="submit"
              className=""
            >
              <Icons.Send className="h-4 w-4" />
              Send
            </Button>
          </footer>
        </section>
      </aside>
    </section>
  );
}
