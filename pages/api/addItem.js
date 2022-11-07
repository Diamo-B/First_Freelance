import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  let Qte = req.body.Qte;
  let newItem = await prisma.item.create({
    data:{
      Quantity: Qte,
      Product:{
        connect:{
          Id: req.body.prodId,
        },
      }, 
      Cart:{
        connect:{
          Id: req.body.cartId
        }
      }
    },
  });

  return res.status(200).json(newItem);
};