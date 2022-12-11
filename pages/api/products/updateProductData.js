import { prisma } from '/prisma/dbInstance.ts';

export default async function handler(req, res) {

    let arrObj = []; // all the data to change
    let folder=''; // Images folder


    for (let property in req.body) { 
        if (property === "Id" || property === "Category" || property === "Images") 
        {
            console.log("The Id and the category are to skip");
        }
        else if (req.body[property] !== null) {
            let element = {};
            element[property] = req.body[property]
            arrObj.push(element);
        }
    }

    let data = Object.assign({}, ...arrObj);

    if (req.body.Category !== null) {
        const category= await prisma.category.findFirst({
            where:{
                Title:req.body.Category
            },
            select:{
                Id: true
            },
        });

        data.CategoryId = category.Id;
    }

    const updateProd = await prisma.product.update({
        where: {
          Id: req.body.Id,
        },
        data: {
          ...data
        },
    }) 


    if (req.body.Images) {
        let thumbnailsPaths=[];

        req.body.Images.map(name=>{
            thumbnailsPaths.push('/productsImages/product_'+req.body.Id+'/'+name)
        })

        thumbnailsPaths.map(async (path) => {
            await prisma.thumbnail.deleteMany({
                where:{
                    ProductId: req.body.Id
                },
            }).then(async()=>{
                await prisma.thumbnail.create({
                    data:{
                        Path: path,
                        Product:{
                            connect:{
                                Id: req.body.Id                            
                            }
                        }
                    }
                })
            })
        });
        folder = './public/productsImages/product_'+req.body.Id+'/';
    }
    

    return res.status(200).json(folder);
}