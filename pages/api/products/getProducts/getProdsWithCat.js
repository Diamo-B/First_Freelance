import { prisma } from '/prisma/dbInstance.ts';

export default async function handler(req, res) {
    let str = req.originalUrl;
    let catTitle = str.substring(str.lastIndexOf("=")+1);
    
    let catProducts = await prisma.product.findMany({
        where:{
            Category:{
                Title: catTitle
            }
        },
        select:{
            Id:true,Title:true,Stock:true
        }
    });

    return res.status(200).json(catProducts);
}