import {Router,Request, Response} from "express";
import {prisma} from "../database";

const router =  Router()

router.get("/", async (req: Request, res: Response) => {
    const data = await prisma.user.findMany()
    res.json(data)
})

export default router