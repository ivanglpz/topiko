"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const Schema = z.object({
  prompt: z.string("Prompt is required").min(5, "Prompt too short"),
});

export default function Home() {
  const formik = useFormik({
    initialValues: {
      level: "easy",
      nQuestions: "five",
      prompt: "",
    },
    validationSchema: toFormikValidationSchema(Schema),
    onSubmit: () => {},
  });
  return (
    <section className="grid grid-cols-[1fr_380px] min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-neutral-950">
      <div></div>
      <aside className="flex flex-col h-full p-4 bg-neutral-800">
        <section className="h-full w-full"> 1</section>
        <section className="flex flex-col gap-4">
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
              Create
            </Button>
          </footer>
        </section>
      </aside>
    </section>
  );
}
