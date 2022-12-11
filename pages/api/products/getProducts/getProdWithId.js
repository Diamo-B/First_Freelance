import { prisma } from '/prisma/dbInstance.ts';

export default async function handler(req, res) {
    let str = req.originalUrl;
    let id = str.substring(str.lastIndexOf("=")+1);
    
    let data = await prisma.product.findUnique({
        where:{
            Id:Number(id)
        },
        include:{
            Category:{
                select:{
                    Title:true
                }
            },
            Thumbnails:{
                select:{
                    Path:true
                }
            }
        }
    })

    return res.status(200).json(data);

    
}