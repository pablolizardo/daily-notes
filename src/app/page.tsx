"use client";
import Column from "@/components/common/Column";
import WhatToSay from "@/components/common/WhatToSay";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
import { COLUMNS } from "@/consts/columns";
import { askBard, fetchGHData } from "@/lib/utils";
import { TasksType } from "@/types/tasks";
import { Loader2, Stars } from "lucide-react";
import { ClipboardEvent, FormEvent, useState } from "react";
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [whatToSay, setWhatToSay] = useState<string>();
  const [thinking, setThinking] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TasksType>({ yesterday: [], today: [], blocker: [] })

  const handleAsk = async () => {
    setThinking(true)
    const answer = await askBard(tasks)
    setWhatToSay(answer)
    setThinking(false)
  }


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (e.target.childNodes[0].value !== '') {
      const value = ((e.target as HTMLFormElement).childNodes[0] as HTMLInputElement).value
      const column = (e.target as HTMLFormElement).name
      setTasks({ ...tasks, [column]: [...tasks[column], value] })
      e.target.childNodes[0].value = ''
    }
  };

  const handlePaste = async (e: ClipboardEvent<HTMLInputElement>) => {
    const clipboardText = e.clipboardData.getData('text')
    if (clipboardText.includes('https://github.com')) {
      const data = await fetchGHData(clipboardText)
      console.log(data)
      const column = (e.target as HTMLFormElement).parentElement?.name
      const content = `${data.title} ${data.url} #${data.issueNumber} #${data.repo}`
      setTasks({ ...tasks, [column]: [...tasks[column], content] })
      e.target.value = ''
    }
  }

  return (
    <main className="mx-auto max-w-[100rem] p-10 grid gap-10">
      <TypographyH1>Daily Notes</TypographyH1>
      <section className="grid lg:grid-cols-2 2xl:grid-cols-[1fr_600px] gap-5 items-start">
        <div className="grid  2xl:grid-cols-3 gap-5 items-start">
          {COLUMNS.map(column => <Column key={column.name} column={column} handleSubmit={handleSubmit} handlePaste={handlePaste} tasks={tasks} />)}
        </div>
        <WhatToSay thinking={thinking} handleAsk={handleAsk} whatToSay={whatToSay} />
      </section>
    </main>
  );
}
