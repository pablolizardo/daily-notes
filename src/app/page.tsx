"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TypographyH1 } from "@/components/ui/typography";
import { COLUMNS } from "@/consts/columns";
import { TasksType } from "@/types/tasks";
import { Loader2, PlusIcon, Stars } from "lucide-react";
import { FormEvent, useState } from "react";

export default function Home() {
  const [whatToSay, setWhatToSay] = useState<string>();
  const [thinking, setThinking] = useState<boolean>(false);

  const handleAsk = async () => {
    setThinking(true);
    const response = await (
      await fetch("/api/ask", {
        method: "POST",
        body: JSON.stringify({
          question: `Puedes ayudarme a que decir en mi daily de hoy teniendo en cuenta que ayer hice 
        ${tasks.yesterday?.map(task => task + ', ')} , hoy estoy y estare haciendo : ${tasks.today?.map(task => task + ', ')} y tengo estos bloquers: ${tasks.blocker?.map(task => task + ', ')} `
        }),
      })
    ).json();
    setWhatToSay(response);
    setThinking(false);
  };


  const [tasks, setTasks] = useState<TasksType>({ yesterday: [], today: [], blocker: [] })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (e.target.childNodes[0].value !== '') {
      const value = ((e.target as HTMLFormElement).childNodes[0] as HTMLInputElement).value
      const column = (e.target as HTMLFormElement).name
      setTasks({ ...tasks, [column]: [...tasks[column], value] })
      e.target.childNodes[0].value = ''
    }
  };


  return (
    <main className="mx-auto max-w-[100rem] p-10 grid gap-10">
      <TypographyH1>Daily Notes</TypographyH1>
      <section className="grid grid-cols-[1fr_1fr_1fr_600px] gap-5 items-start">
        {COLUMNS.map(column =>
          <Card key={column.name} >
            <CardHeader className="p-4">
              <form onSubmit={handleSubmit} name={column.name} className="flex flex-row gap-2 items-center">
                <Input type="text" placeholder={column.placeholder} name="pregunta" className="rounded-[6px] border-none bg-accent/50 hover:bg-accent" />
                <Button type="submit" variant={"ghost"} className="rounded-[6px] px-1" ><PlusIcon /> </Button>
              </form>
            </CardHeader>
            <ul className="divide-y"> {tasks[column.name]?.map(task => <li key={task} className="text-sm p-5">{task}</li>)} </ul>
          </Card>
        )}
        <Card className="p-4 ">
          <Button className="text-lg p-8  w-full" variant={"ghost"} disabled={thinking} onClick={handleAsk}>
            {thinking ? <Loader2 className="animate-spin" /> : <> Que decir? <Stars className="ml-4" /></>}
          </Button>
          {whatToSay && <CardContent className="mt-3">
            <p className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: whatToSay }} />
          </CardContent>}
        </Card>
      </section>
    </main>
  );
}
