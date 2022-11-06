import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req,res){
    const { CartId } = req.query
    const resp = await prisma.cart.findMany({
        where:{
            Id: Number(CartId)
        },
        include:{
            Items:{
                include:{
                    Product:{
                        include:{
                            Thumbnails: true
                        }
                    }
                }
            }
            
        }
    });
    return res.status(200).json(resp)
}