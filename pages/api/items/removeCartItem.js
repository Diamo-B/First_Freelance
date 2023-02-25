import { prisma } from '../../../prisma/dbInstance.ts';


 let removeCartItem = async (req, res) => {
    let itemId = req.body.Id;
    const deleteItem = await prisma.item.delete({
    where: {
        Id: itemId
    },
    });
    return res.status(200).json(deleteItem);
};

export default removeCartItem;