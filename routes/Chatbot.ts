import {Response, Router} from "express";
import {SendRequest} from "../lib/ChatGpt";
import {ChatCompletionMessageParam} from "openai/src/resources/chat/completions";
import {RequestWithUser, verifyToken} from "../middlewares/authMiddleware";

const router = Router()

let history: { [key: number]: Array<ChatCompletionMessageParam> } = {}

// @ts-ignore
router.post("/", verifyToken, async (req: RequestWithUser, res: Response) => {
    if (!req.body.message) return res.status(400).json({message: "Bad request"})
    if (!history[req.user.id]) history[req.user.id] = []
    history[req.user.id] = await SendRequest(history[req.user.id], req.body.message)
    res.json({
        answer: history[req.user.id][history[req.user.id].length - 1].content,
        token: req.user.token
    })
})

export default router