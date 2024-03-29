import { prisma } from '../../../../prisma/dbInstance.ts';

export default async function handler(req,res){

    const response = await prisma.cart.findMany({
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
    return res.status(200).json(response)
}