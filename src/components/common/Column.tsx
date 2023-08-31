import NoTasksState from "@/components/common/NoTasksState";
import Task from "@/components/common/Task";
import TaskList from "@/components/common/TaskList";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { TypographyMuted } from "@/components/ui/typography";
import { fetchGHData } from "@/lib/utils";
import { ColumnType, ColumnsType, TasksType } from "@/types/tasks";
import { ChangeEvent, ClipboardEvent, KeyboardEvent, useState } from "react";

const Column = ({ handleSubmit, tasks, column }: {
    handleSubmit: (column: ColumnType, content: string) => void;
    tasks: TasksType;
    column: ColumnsType
}) => {
    const [task, setTask] = useState<string>('')
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") handleSubmit(column.name, task)
    }
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTask(e.target.value)
    }

    const handlePaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
        const clipboardText = e.clipboardData.getData('text')
        if (clipboardText.includes('https://github.com')) {
            const data = await fetchGHData(clipboardText)
            const content = `${data.title} ${data.url} #${data.issueNumber} #${data.repo}`
            handleSubmit(column.name, content)
        }
    }
    return (
        <Card key={column.name} className="h-full flex flex-col overflow-hidden">
            <CardHeader>
                <CardTitle className="capitalize">{column.name}</CardTitle>
            </CardHeader>
            {tasks[column.name]?.length > 0 ?
                <TaskList tasks={tasks} column={column} />
                : <NoTasksState />
            }
            <CardFooter className="mt-auto p-3  ">

                <form name={column.name} className="w-full ">
                    <Textarea onChange={handleChange} className="rounded-[8px] [resize:none]" onPasteCapture={handlePaste} placeholder={column.placeholder} name="pregunta" onKeyDown={handleKeyDown} />
                </form>
            </CardFooter>
        </Card>
    );
}

export default Column;