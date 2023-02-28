import { prisma } from '../../../prisma/dbInstance.ts';


export default async function handler(req, res) 
{
    prisma.category.findMany({})
    .then((data)=>{
        return res.status(200).json(data);

    }).catch((err)=>{
        return res.status(500).json(err);
    })
}