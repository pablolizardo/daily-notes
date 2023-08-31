"use client";
import Column from "@/components/common/Column";
import WhatToSay from "@/components/common/WhatToSay";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { COLUMNS } from "@/consts/columns";
import { askBard } from "@/lib/utils";
import { ColumnType, TasksType } from "@/types/tasks";
import { useState } from "react";

export default function Home() {
  const [whatToSay, setWhatToSay] = useState<string>();
  const [thinking, setThinking] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TasksType>({ yesterday: [], today: [], blocker: [], } as TasksType)

  const handleAsk = async () => {
    setThinking(true)
    const answer = await askBard(tasks)
    setWhatToSay(answer)
    setThinking(false)
  }

  const handleSubmit = (column: ColumnType, content: string) => {
    setTasks({ ...tasks, [column]: [...tasks[column], content] })
  };

  return (
    <main className="mx-auto max-w-[100rem] p-10 grid gap-10 min-h-screen ">
      <section className="grid lg:grid-cols-2 2xl:grid-cols-[1.5fr_1fr] gap-5 items-start  h-full">
        <div className="flex flex-col gap-10 h-full ">
          <header className="grid gap-3">
            <TypographyH1>Daily Notes</TypographyH1>
            <TypographyLead className="max-w-lg">Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.</TypographyLead>
          </header>

          <div className=" grid 2xl:grid-cols-3 gap-5 items-start h-full">
            {COLUMNS.map(column => <Column key={column.name} column={column} handleSubmit={handleSubmit} tasks={tasks} />)}
          </div>
        </div>
        <WhatToSay thinking={thinking} handleAsk={handleAsk} whatToSay={whatToSay} />
      </section>


    </main>
  );
}
