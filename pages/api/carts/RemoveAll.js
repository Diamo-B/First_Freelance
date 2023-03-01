import { prisma } from '../../../prisma/dbInstance.ts';

let RemoveAll =  async (req, res) => {
    await prisma.cart.update({
        data:{
            Items:{
                deleteMany:{}
            }
        }
    }).catch((err)=>{
        console.log(err);
    })

    await prisma.cart.deleteMany({})
    .then(()=>{
        return res.status(200).json("done");
    }).catch((err) => {
        return res.status(500).json(err);
    })
};

export default RemoveAll;
