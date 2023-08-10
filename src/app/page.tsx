"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TypographyH1, TypographyMuted, TypographyP } from "@/components/ui/typography";
import { COLUMNS } from "@/consts/columns";
import { TasksType } from "@/types/tasks";
import { Loader2, PlusIcon, Stars } from "lucide-react";
import { FormEvent, useState } from "react";
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [whatToSay, setWhatToSay] = useState<string>();
  const [thinking, setThinking] = useState<boolean>(false);

  const handleAsk = async () => {
    setThinking(true);
    const response = await (
      await fetch("/api/ask", {
        method: "POST",
        body: JSON.stringify({
          question: `¿Puedes ayudarme sobre que decir en mi daily :
          Teniendo en cuenta que ayer hice: ${tasks.yesterday?.map(task => task + ', ')} ,
          hoy estoy y estare haciendo esto : ${tasks.today?.map(task => task + ', ')}  
          ${tasks.blocker?.length > 0 ? `y tengo estos bloquers: ${tasks.blocker?.map(task => task + ', ')}` : ""}
          `
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
  const regex = /#([^ ]+)/g;
  return (
    <main className="mx-auto max-w-[100rem] p-10 grid gap-10">
      <TypographyH1>Daily Notes</TypographyH1>
      <section className="grid lg:grid-cols-2 2xl:grid-cols-[1fr_600px] gap-5 items-start">
        <div className="grid  2xl:grid-cols-3 gap-5 items-start">

          {COLUMNS.map(column =>
            <Card key={column.name} className={`${column.variant} `}>
              <CardHeader className="p-4">
                <form onSubmit={handleSubmit} name={column.name} className="flex flex-row gap-2 items-center">
                  <Input type="text" placeholder={column.placeholder} name="pregunta" className={`rounded-[6px] border-none bg-accent/50 hover:bg-accent`} />
                  <Button type="submit" variant={"ghost"} className="rounded-[6px] px-2" ><PlusIcon className="w-4 h-4" /> </Button>
                </form>
              </CardHeader>
              <ul className="divide-y"> {tasks[column.name]?.map(task =>
                <li key={task} className="p-5" dangerouslySetInnerHTML={{ __html: task.replace(regex, '<span class="badge-issue">$&</span>') }} />

              )} </ul>
            </Card>
          )}
        </div>
        <Card className="p-6 border-primary relative bg-primary/10 ">
          {/* <Button className="text-lg p-8  w-full" variant={"outline"} disabled={thinking} onClick={handleAsk}>
            {thinking ? <Loader2 className="animate-spin" /> : <> Que decir? <Stars className="ml-4" /></>}
          </Button> */}
          <Button className="aspect-square w-32 h-32 absolute rounded-full -top-20 -right-5 flex flex-col items-center justify-center" variant={"default"} disabled={thinking} onClick={handleAsk}>
            {thinking ? <Loader2 className="animate-spin w-10 h-10" /> : <Stars className="w-10 h-10" />}
          </Button>
          {!whatToSay ? <div className=" text-primary text-right pr-28 pointer-events-none">Que decir ...</div> : <CardContent className="p-0 pb-6 ">
            <ReactMarkdown className="whitespace-pre-line leading-relaxed  text-xl ">
              {whatToSay}
            </ReactMarkdown>
            {/* <p className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: whatToSay }} /> */}
          </CardContent>}
        </Card>
      </section>
    </main>
  );
}
