import Task from "@/components/common/Task";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";

const Column = ({ column, handleSubmit, handlePaste, tasks }) => {
    return (<Card key={column.name} className={`${column.variant} `}>
        <CardHeader className="p-4">
            <form onSubmit={handleSubmit} name={column.name} className="flex flex-row gap-2 items-center">
                <Input onPasteCapture={handlePaste} type="text" placeholder={column.placeholder} name="pregunta" className={`rounded-[6px] border-none bg-accent/50 hover:bg-accent`} />
                <Button type="submit" variant={"ghost"} className="rounded-[6px] px-2" ><PlusIcon className="w-4 h-4" /> </Button>
            </form>
        </CardHeader>
        <ul className="divide-y"> {tasks[column.name]?.map(task => <Task task={task} key={task} />)} </ul>
    </Card>);
}

export default Column;