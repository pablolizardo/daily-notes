import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Stars } from "lucide-react";
import ReactMarkdown from "react-markdown";

const WhatToSay = ({ thinking, handleAsk, whatToSay }) => {
    return (<Card className="p-6 border-primary relative bg-primary/10 ">
        <Button className="" variant={"outline"} size={"lg"} disabled={thinking} onClick={handleAsk}>
            {thinking ? <Loader2 className="animate-spin" /> : <> <Stars className="mr-5" /> {whatToSay ? "Hay alguna otra forma de decirlo?" : "Que decir en mi daily meeting?"}</>}
        </Button>
        {whatToSay && <CardContent className="p-0 py-6 ">
            <ReactMarkdown className="whitespace-pre-line    ">
                {whatToSay}
            </ReactMarkdown>
        </CardContent>}
    </Card>);
}

export default WhatToSay;