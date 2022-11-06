import { PrismaClient } from "@prisma/client"
let prisma = new PrismaClient();


export default async function handler(req, res) {
    let cart = await prisma.cart.create({
        data:{
          Items: undefined
        }
      });
    res.status(200).json(cart)
}
  