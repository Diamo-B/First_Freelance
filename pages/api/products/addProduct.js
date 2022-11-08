import { PrismaClient } from "@prisma/client"
let prisma = new PrismaClient();

export default async function handler(req, res) {
    let Title = req.body.Title;
    let BrandName = req.body.BrandName;
    let Price  = req.body.Price;
    let DiscountRate  = req.body.DiscountRate;
    let CategoryId  = req.body.CategoryId;
    let Stock  = req.body.Stock;
    let Status = Stock>0?'InStock':'OutOfStock';
    let Favorite  = req.body.Favorite;

    let Product = await prisma.product.create({
        data:{
            Title,
            BrandName,
            Price,
            DiscountRate,
            Stock,
            Status,
            Favorite,
            Category:{
                connect:{
                    Id: CategoryId
                }
            }
        },
    })

    let thumbnailsPaths = req.body.thumbnailsPaths;
    thumbnailsPaths.forEach(path => {
        prisma.thumbnail.create({
            data:{
                Path: path,
                Product:{
                    connect:{
                        Id: Product.Id                             
                    }
                }
            }
        })
    });


}
  