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
import { useRef, useState, useEffect } from "react";
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
  const messagesRef = useRef<HTMLElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  const formik = useFormik({
    initialValues: {
      level: "easy" as Message["level"],
      nQuestions: "five" as Message["nQuestions"],
      prompt: "" as Message["prompt"],
    },
    enableReinitialize: true,
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
    if (!message) return;
    formik.setFieldValue("prompt", message.prompt);
    formik.setFieldValue("level", message.level);
    formik.setFieldValue("nQuestions", message.nQuestions);
  };
  const repeatMessage = (id: string) => {
    const message = messages.find((message) => message.id === id);
    if (!message) return;
    formik.setValues({
      prompt: message.prompt,
      level: message.level,
      nQuestions: message.nQuestions,
    });
    formik.handleSubmit();
  };

  return (
    <section className="flex flex-col justify-center items-center w-full  ">
      <header className="flex sticky top-0 flex-row justify-end items-center backdrop-blur-lg w-full">
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
      <div className="flex flex-col w-full max-w-[1240px] min-h-dvh ">
        {/* sección scrollable */}
        <section ref={messagesRef} className=" pr-2 flex flex-col gap-8 pb-4">
          {messages.map((message) => (
            <div key={message.id}>
              <header className="flex flex-row justify-between items-center">
                <p className="opacity-70 text-sm ">
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
              <p className="wrap-break-word">{message.prompt}</p>
            </div>
          ))}
        </section>
      </div>
      <section className="max-w-[620px] rounded-lg w-full bg-neutral-900 p-2 flex flex-col gap-2  sticky bottom-0">
        <Textarea
          id="prompt"
          name="prompt"
          placeholder="Type your message here."
          value={formik.values.prompt}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={10}
          className="h-32 resize-none"
        />
        <footer className="flex justify-between items-center">
          <div className="flex flex-row gap-2">
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
            {/*{formik.touched.prompt && formik.errors.prompt ? (
              <p className="text-sm text-red-400 w-full">
                {formik.errors.prompt}
              </p>
            ) : null}*/}
          </div>

          <Button
            onClick={() => formik.submitForm()}
            type="submit"
            className=""
          >
            <Icons.Send className="h-4 w-4" />
          </Button>
        </footer>
      </section>
    </section>
  );
}
