import { prisma } from '../../../prisma/dbInstance.ts';


let RemoveAllCartItems = async (req, res) => {
    let CId = req.body.CartId;
    await prisma.item.deleteMany({
    where: {
        CartId: CId
    },
    })
    .then(()=>{
        return res.status(200).json("done");
    })
    .catch((err)=>{
        return res.status(500).json(err);
    });
}

export default RemoveAllCartItems;