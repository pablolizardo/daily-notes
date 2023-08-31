export type TasksType = {
    yesterday: string[];
    today: string[];
    blocker: string[];
}

export type ColumnType = keyof TasksType; // quierpo que solo valide "yesterday" | "today" | "blocker"

export type ColumnsType = {
    name: ColumnType;
    placeholder: string;
    variant: string;
}