import { PrismaClient } from "@prisma/client"
let prisma = new PrismaClient();

export default async function handler(req, res) {
    let products = await prisma.product.findMany({});

    return res.status(200).json(products);
}