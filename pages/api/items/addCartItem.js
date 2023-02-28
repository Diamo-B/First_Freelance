import { prisma } from '../../../prisma/dbInstance.ts';


let AddItem =  async (req, res) => {
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

export default AddItem;