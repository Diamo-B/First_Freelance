import { prisma } from '/prisma/dbInstance.ts';

export default async function handler(req, res) {
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    let phoneNum = req.body.phone===""?null:req.body.phone;
    let whatsappPhoneNum = req.body.wtspPhone===""?null:req.body.wtspPhone;
    let productIds = req.body.productIds; //needs to be an array of objects that has Id's

    let productIdsObjects = productIds.map((a) => ({'Id':a}))  // [ {Id:1},{Id:2},{Id:3} ... ]
    

    await prisma.order.create({
        data:{
            ClientFirstName         : firstName,
            ClientLastName          : lastName,
            ClientPhoneNumber       : phoneNum,
            ClientWhatsappNumber    : whatsappPhoneNum,
            OrderProducts : {
                connect: productIdsObjects,
            }
        },
        include:{
            OrderProducts: true
        }
    })
    .then((data)=>{
        return res.status(200).json(data);
    })
    .catch((err)=>{
        return res.status(500).json(err);
    })
}