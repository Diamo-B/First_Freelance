import { prisma } from '/prisma/dbInstance.ts';
import fs from 'fs';

export default async function handler(req, res) {
    let productid = req.body.Id;

    await prisma.product.update({
        where: {
          Id: productid,
        },
        data: {
          Thumbnails: {
            deleteMany: {},
          },
          Item: {
            deleteMany: {},
          },
        },
    })

    fs.rmSync('./public/productsImages/product_'+productid+'/', { recursive: true, force: true });
      
    const deleteProduct = await prisma.product.delete({
        where: {
            Id: productid
        }
    });


    return res.status(200).json(deleteProduct);
}