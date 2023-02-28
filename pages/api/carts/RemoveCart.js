import { prisma } from '../../../prisma/dbInstance.ts';

let RemoveCart =  async (req, res) => {
    let Id = req.body.Id;
    await prisma.cart.update({
        where:{Id},
        data:{
            Items:{
                deleteMany:{}
            }
        }
    }).catch((err)=>{
        console.log(err);
    })

    await prisma.cart.delete({
        where:{Id}
    }).then(()=>{
        return res.status(200).json("done");
    }).catch((err) => {
        return res.status(500).json(err);
    })

    
};

export default RemoveCart;