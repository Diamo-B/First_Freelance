import { PrismaClient } from "@prisma/client"
let prisma = new PrismaClient();

export default async function handler(req, res) {
    let Id = req.body.Id;
    let Title = req.body.Title;
    
    let response = await prisma.product.delete({
        where:{
            OR: [
                {
                    Title: 
                    {
                        equals: Title,
                    }
                },
                {
                    Id: 
                    {
                        equals: Id,
                    },
                },
              ],
        }
    })

    let data = await response.json();
    return data;
}