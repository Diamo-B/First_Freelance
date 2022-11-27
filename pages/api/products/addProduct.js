import { PrismaClient } from "@prisma/client"
import fs from "fs";

let prisma = new PrismaClient();


export default async function handler(req, res) {

    let Title = req.body.Title;
    let BrandName = req.body.BrandName;
    let Price  = parseFloat(req.body.Price);
    let DiscountRate  = req.body.DiscountRate!== null? parseInt(req.body.DiscountRate):req.body.DiscountRate;
    let Category  = req.body.Category;
    let Stock  = parseInt(req.body.Stock);
    let Favorite  = req.body.Favorite;
    let ThumbnailNames = req.body.Images;

    let category = await prisma.category.findFirst({
        where:{
            Title:Category
        }
    });

    let Product = await prisma.product.create({
        data:{
            Title,
            BrandName,
            Price,
            DiscountRate,
            Stock,
            Favorite,
            Category:{
                connect:{
                    Id: category.Id
                }
            }
        },
    })

    let thumbnailsPaths=[];

    ThumbnailNames.map(name=>{
        thumbnailsPaths.push('/productsImages/product_'+Product.Id+'/'+name)
    })

    thumbnailsPaths.map(async (path) => {
        await prisma.thumbnail.create({
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

    let folder = './public/productsImages/product_'+Product.Id+'/';

    fs.mkdir(folder,{recursive: true}, function (err) {
        return console.log(err);
    });

    return res.json(folder);

}
  