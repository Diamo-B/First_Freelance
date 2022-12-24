import { prisma } from '/prisma/dbInstance.ts';

export default async function handler(req, res) {
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    let phoneNum = req.body.phone===""?null:req.body.phone;
    let whatsappPhoneNum = req.body.wtspPhone===""?null:req.body.wtspPhone;
    let products_Ids_Quantity = req.body.productIds; 

    await prisma.order.create({
        data:{
            ClientFirstName         : firstName,
            ClientLastName          : lastName,
            ClientPhoneNumber       : phoneNum,
            ClientWhatsappNumber    : whatsappPhoneNum,
        },
    })
    .then(async(data)=>{
        products_Ids_Quantity.map(async (obj) => {
            await prisma.ProdXQuantity.create({
                data:{
                    Product:{
                        connect:{
                            Id: obj.prodId 
                        }
                    },
                    Quantity: obj.prodQuantity,
                    Order:{
                        connect:{
                            Id: data.Id
                        }
                    }
                }
            }); 
        })
        return res.status(200).json(data);
    })
    .catch((err)=>{
        return res.status(500).json(err+"error");
    })
}