import Bard from "bard-ai";

export async function POST(request: Request) {
    const PSID = process.env.PSID
    const PSIDTS = process.env.PSIDTS
    let myBard = new Bard({
        "__Secure-1PSID": PSID,
        "__Secure-1PSIDTS": PSIDTS,
    });
    const payload = await request.json()
    const answer = await myBard.ask(payload.question)

    console.log(answer)
    return Response.json(answer)

}

