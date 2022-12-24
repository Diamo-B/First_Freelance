import { prisma } from '/prisma/dbInstance.ts';

export default function handler(req, res) {
    let id = req.body.Id;

    prisma.ProdXQuantity.deleteMany({
        where:{
            OrderId: id
        }
    })
    .then(()=>{
        prisma.Order.delete({
            where:{
                Id: id
            }
        })
        .then(()=>{
            return res.status(200).json("done")
        })
        .catch((err)=>{
            return res.status(500).json(err);
        })

    })
    .catch((err)=>{
        return res.status(500).json(err);
    })

}