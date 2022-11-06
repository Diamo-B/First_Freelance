import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
    let itemId = req.body.Id;
    const deleteItem = await prisma.item.delete({
    where: {
        Id: itemId
    },
    });
    return res.status(200).json(deleteItem);
};