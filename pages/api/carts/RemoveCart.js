import { prisma } from '../../../prisma/dbInstance.ts';

let RemoveCart =  async (req, res) => {
    let Id = req.body.Id;
    await prisma.cart.delete({
        where:{
            Id: Id
        }
    }).then(()=>{
        return res.status(200).json("done");
    }).catch((err) => {
        return res.status(500).json(err);
    })
};

export default RemoveCart;