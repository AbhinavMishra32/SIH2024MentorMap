import { Router, Response } from "express";
import { ReqWithUser } from "..";
import prisma from "../db";

const router = Router();

router.get('/chatavailable', async (req: ReqWithUser, res: Response) => {
    try {
        const studentsChatting = await prisma.student.findMany({
            where: {
                chats: {
                    some: {
                        counsellorId: req.addedUser.id
                    }
                }
            },
            include: {
                chats: {
                    where: {
                        counsellorId: req.addedUser.id
                    }
                }
            }
            // include: {
            //     chats: {
            //         where: {
            //             counsellorId: req.addedUser.id
            //         }
            //     }
            // }
        })

        if (!studentsChatting) {
            return res.status(404).json({
                success: false,
                message: "No students are chatting with you"
            });
        }

        return res.status(200).json({
            success: true,
            studentsChatting,
        });

    } catch (error) {
        console.log("Error in student router GET /chatavailable : ", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

export default router;