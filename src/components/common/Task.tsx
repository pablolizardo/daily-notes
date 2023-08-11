const Task = ({ task }) => {
    const regex = /#([^ ]+)/g;

    return (<li key={task} className="p-5"
        dangerouslySetInnerHTML={{ __html: task.replace(regex, '<span class="badge-issue">$&</span>') }} />);
}

export default Task;