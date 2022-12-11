import { prisma } from '/prisma/dbInstance.ts';

export default async function handler(req, res) {
    await prisma.order.findMany({
        orderBy: {
            CreatedAt: 'desc',
        },
    })
    .then((data) => {
        return res.status(200).json(data);
    })
    .catch((err) => {
        return res.status(500).json(err);
    })
}