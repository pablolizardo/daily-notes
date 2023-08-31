import Task from "@/components/common/Task";
import { ColumnsType, TasksType } from "@/types/tasks";

const TaskList = ({ tasks, column }: { tasks: TasksType; column: ColumnsType }) => {
    return (<ul className="divide-y [&>li:first-child]:pt-0">
        {tasks[column.name]?.map(task => {
            return <Task task={task} key={task} />
        })}
    </ul>);
}

export default TaskList;