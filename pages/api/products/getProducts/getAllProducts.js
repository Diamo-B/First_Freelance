import { prisma } from '../../../../prisma/dbInstance.ts';


export default async function handler(req, res) {
    let products = await prisma.product.findMany({});

    return res.status(200).json(products);
}