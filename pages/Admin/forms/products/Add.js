import Form from '../../../../components/Admin/form/form';
import {useSession} from 'next-auth/react';
import { prisma } from '../../../../prisma/dbInstance.ts';
import { useState } from 'react';
import AddSuccess from '../../../../components/Admin/Products/AddingSuccessPanel.js';
import { convertBase64 } from '../../../../components/Admin/form/convertToBase64.js';
import LoadingState from '../../../../components/Admin/Products/LoadingState.js';

export async function getServerSideProps()
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
    let [images, setImages] = useState([]);
    let [loading, setLoading] = useState(null);


   let onSubmitForm = async (values) => { 
        setLoading(true);
        let imagenames = images.map(image=>{return image.name});
        console.log(imagenames);
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
                Images: imagenames,
            }),
        })
        .then(async (data)=>{
            setIsAdded(true); //¤ product added successfully
            let folder = await data.json();
            images.map(async (file)=>{
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
        })
        .catch((err)=>{
            setIsAdded(false); //! error 
        })
        setLoading(false);
    }

console.log(categories);

    if(!session)
    {
        return( // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
            <></>
        )
    }
    return ( 
        <>
            {
                isAdded&&filesSaved?
                <AddSuccess setIsAdded={setIsAdded}/>
            :
                loading?
                <LoadingState />
            :
                ""
            }
            <Form categories={categories} onSubmitForm={onSubmitForm} formType={"adding"} images={images} setImages={setImages}/>
        </>
    );
}
 
export default AddProduct;
