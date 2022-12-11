import { prisma } from '/prisma/dbInstance.ts';

export default async function handler(req, res) 
{
    let Libelle = req.body.Libelle;

    await prisma.category.create({
        data:{
            Title: Libelle
        }
    }).then((data)=>{
        return res.status(200).json(data);

    }).catch((err)=>{
        return res.status(500).json(err);
    })

    
}