import { CardContent } from "@/components/ui/card";
import { TypographyMuted } from "@/components/ui/typography";
import { PenIcon } from "lucide-react";

const NoTasksState = () => {
    return (<CardContent className="flex text-center flex-col items-center justify-center gap-4 flex-1 text-muted">
        <PenIcon />
        <TypographyMuted className="text-muted">You can write wherever or even paste a git issue to make it easier</TypographyMuted>
    </CardContent>);
}

export default NoTasksState;