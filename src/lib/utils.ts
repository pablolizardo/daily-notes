import { GHIssue } from "@/types/gh-issues";
import { TasksType } from "@/types/tasks";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchGHData = async (url: string): Promise<{
  title: string;
  issueNumber: string;
  url: string;
  repo: string;
}> => {
  const str = url.split('github.com/')[1]
  const res = await fetch(`https://api.github.com/repos/${str}`)
  const issue = await res.json() as GHIssue
  return {
    title: issue.title || '',
    issueNumber: String(issue.number),
    url: issue.url || '',
    repo: issue.url?.slice(issue.url.indexOf('/repos/') + 7, issue.url.indexOf('/issues/')).split('/')[1] || ''
    // repo: issue.url?.split('/repos/')[1].split('/issues/')[0]
  }
}


export const askBard = async (tasks: TasksType) => {
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
  return response
  // setWhatToSay(response);
};