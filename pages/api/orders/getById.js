import { prisma } from '/prisma/dbInstance.ts';

export default async function handler(req, res) {
    let id = req.body.id;

    await prisma.order.findFirst({
        orderBy: {
            CreatedAt: 'desc',
        },
        where:{
            Id: id
        },
        include:{
            OrderProducts: true
        }
    })
    .then((data) => {
        return res.status(200).json(data);
    })
    .catch((err) => {
        return res.status(500).json(err);
    })
}