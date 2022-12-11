import { prisma } from '/prisma/dbInstance.ts';


export default async function handler(req, res) {
    let cart = await prisma.cart.create({
      data:{
        Items: undefined
      }
    });
    return await res.status(200).json(cart)
}
  