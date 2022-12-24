import { prisma } from '/prisma/dbInstance.ts';

export default async function handler(req, res) {
    let str = req.originalUrl;
    let id = str.substring(str.lastIndexOf("=")+1);

    await prisma.order.findFirst({
        orderBy: {
            CreatedAt: 'desc',
        },
        where:{
            Id: Number(id)
        },
        include:{
            OrderProducts: {
                include:{
                    Product:{
                        select:{
                            Title: true,
                            Price: true,
                            DiscountRate: true
                        }
                    }
                },
            },
        }
    })
    .then((data) => {
        return res.status(200).json(data);
    })
    .catch((err) => {
        return res.status(500).json(err);
    })
}