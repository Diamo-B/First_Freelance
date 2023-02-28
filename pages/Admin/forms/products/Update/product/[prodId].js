import styles from '../../../../../../styles/Admin/Products/update.module.css';
import {useSession} from 'next-auth/react';
import Form from '../../../../../../components/Admin/form/form';
import { useState, useEffect } from 'react';
import {convertBase64} from '../../../../../../components/Admin/form/convertToBase64';
import ModificationSuccessPanel from '../../../../../../components/Admin/Products/ModificationSuccessPanel';
import {prisma} from '../../../../../../prisma/dbInstance.ts';

export async function getServerSideProps ({resolvedUrl })
{
    let categories = await prisma.category.findMany({});
   
    
    const prodId = resolvedUrl.substring(resolvedUrl.lastIndexOf("/")+1);

    let product = await prisma.product.findMany({
        where:{
            Id: Number(prodId)
        },
        include:{
            Category: true,
            Thumbnails: true
        }
        
    });

    return {
        props:{
            categories,product
        }
    }

}

const ModifyProduct = ({categories,product}) => {
    const {data:session} = useSession({required: true});
    let [isModified,setIsModified]=useState(null);
    let [filesSaved, setFilesSaved] = useState(null);
    let [images, setImages] = useState([]);
    let [oldImgs, setOldImgs] = useState([]);
    
    useEffect(() => {
        async function fetchStateFiles() {
            const newImages = await Promise.all(
                product[0].Thumbnails.map(async thumb => {
                    const response = await fetch(thumb.Path);
                    const blob = await response.blob();
                    let file = new File([blob], thumb.Path.substring(thumb.Path.lastIndexOf("/") + 1), { type: 'image/*' });
                    return file;
                })
            );
            setImages(newImages);
            setOldImgs(newImages);
        }
        fetchStateFiles();
    },[product]);
    

    if(!session)
    {
        return( // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
            <></>
        )
    }

    function getImagesToAdd(array1, array2) {
        const array2Names = new Set(array2.map(file => file.name));
        return array1.filter(file => !array2Names.has(file.name));
    }
    
    function getImagesToRemove(array1, array2) {
        const array1Names = new Set(array1.map(file => file.name));
        return array2.filter(file => !array1Names.has(file.name));
    }
    

    let onSubmitForm = async (values) => {
        let imagenames = images.map(image=>{return image.name});
        let imagesToAdd = getImagesToAdd(images, oldImgs);
        let imagesToRemove = getImagesToRemove(images,oldImgs);
        let imagesNamesToRemove = imagesToRemove.map(img=>{return img.name})


        let Id = product[0].Id;
        let Title = values.Title === "" ? null :values.Title;
        let Brand = values.Brand === "" ? null :values.Brand;
        let Price = values.Price === "" ? null :values.Price;
        let Discount = values.Discount === "" ? null :values.Discount;
        let Category = values.Category === "" ? null :values.Category;
        let Stock = values.Stock === "" ? null :values.Stock;
        let Favorite = values.Favorite === "" ? null :values.Favorite;
        let Images = imagenames;
        let files =  imagesToAdd;

        

        //- UPDATE the physical data
       await fetch("/api/products/updateProductData",{
            method: 'PATCH',
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                Id: Id,
                Title: Title,
                BrandName: Brand,
                Price: parseFloat(Price),
                DiscountRate: parseInt(Discount),
                Category: Category,
                Stock: parseInt(Stock),
                Favorite: Favorite,
                Images: Images
            }),        
  
        }).then(async (data)=>{
            let folder = await data.json();
            if (folder !== '') {
                //- REMOVE the images that needs to be removed (Thumbnails)
                
                await fetch("/api/products/images/deleteUnnededImages",{
                    method: 'POST',
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body:JSON.stringify({
                        folder: folder,
                        imagenames: imagesNamesToRemove
                    }),
                })
                .then(()=>{
                    //TODO: ADDING new images (Thumbnails)
                    Array.from(files).map(async (file)=>{
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
                            })
                            .then(() => {
                                setFilesSaved(true); //¤ files saved successfully
                            })
                            .catch(()=>{
                                setFilesSaved(null); //! error
                            })
                        })
                        .catch(err=>{
                            setFilesSaved(null); //! error
                        })
                    })
                })
                .catch(()=>{
                    setFilesSaved(null); //! error 
                })   
            }
            setIsModified(Id); //¤ Product details modified successfully
        })
        .catch(()=>{
            setIsModified(null); //! error 
        })
    }

    return ( 
        <>
            {
                isModified!==null?
                <ModificationSuccessPanel isModified={isModified} setIsModified={setIsModified}/>
                :
                ""
            }
            <div className={styles.pageTitle_holder}>
                <h3 className={styles.pageTitle}>Modification</h3>
            </div>
            <Form onSubmitForm={onSubmitForm} categories={categories} formType={"modifying"} product={product} images={images} setImages={setImages}/>
        </>
    );
}
 
export default ModifyProduct;