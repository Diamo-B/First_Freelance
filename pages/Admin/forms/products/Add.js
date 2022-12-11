import Form from '/components/Admin/form/form';
import {useSession} from 'next-auth/react';
import { prisma } from '/prisma/dbInstance.ts';
import { useState } from 'react';
import AddSuccess from '/components/Admin/Products/AddingSuccessPanel';
import { convertBase64 } from '/components/Admin/form/convertToBase64.js';


export async function getStaticProps()
{
    let categories = await prisma.category.findMany({});
    return {
        props:{categories}
    }
}

const AddProduct = ({categories}) => {

    const {data:session} = useSession({required: true});  
    let [isAdded,setIsAdded]=useState(null);
    let [filesSaved, setFilesSaved] = useState(null);

    let onSubmitForm = async (values) => { 
        let Brand = values.Brand===""?null:values.Brand
        let Discount = values.Discount===""?null:values.Discount
        await fetch("/api/products/addProduct",{
            method: 'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                Title: values.Title,
                BrandName: Brand,
                Price: values.Price,
                DiscountRate: Discount,
                Category: values.Category,
                Stock: values.Stock,
                Favorite: values.Favorite,
                Images: values.Images,
            }),
        }).then(async (data)=>{
            setIsAdded(true); //¤ product added successfully
            let folder = await data.json();
            Array.from(values.Img).map(async (file)=>{
                await convertBase64(file)
                .then(async(data) =>{
                    await fetch ("/api/products/images/saveImage",{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json "
                        },
                        body:JSON.stringify({
                            name: file.name,
                            file: data,
                            folder: folder
                        })
                    }).then((data)=>{
                        setFilesSaved(true); //¤ files saved successfully
                    }).catch((err)=>{
                        setFilesSaved(false); //! error
                    })
                }).catch(err=>{
                    setFilesSaved(false); //! error
                });
            });
        }).catch((err)=>{
            setIsAdded(false); //! error 
        })

        
    }

    if(!session)
    {
        return( // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
            <></>
        )
    }
    return ( 
        <>
            {isAdded&&filesSaved?
                <AddSuccess setIsAdded={setIsAdded}/>
            :
                ""
            }
            <Form categories={categories} onSubmitForm={onSubmitForm} formType={"adding"}/>
        </>
    );
}
 
export default AddProduct;