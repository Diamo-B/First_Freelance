import styles from '/styles/Admin/Products/update.module.css';
import {useSession} from 'next-auth/react';
import Form from '/components/Admin/form/form';
import { useState } from 'react';
import {convertBase64} from '/components/Admin/form/convertToBase64';
import ModificationSuccessPanel from '/components/Admin/Products/ModificationSuccessPanel';

export async function getServerSideProps ({resolvedUrl })
{
    let data = await fetch(process.env.DOMAIN+'/api/categories/getAllCategories',{
        method:"get",
        headers:{
            "Content-Type" : 'application/json'
        }
    });
    let categories = await data.json();
   
    
    const prodId = resolvedUrl.substring(resolvedUrl.lastIndexOf("/")+1);
    
    let data2 = await fetch(process.env.DOMAIN+'/api/products/getProducts/getProdWithId/?id='+encodeURIComponent(prodId),{
        method:"get",
        headers:{
            "Content-Type" : 'application/json'
        }
    });

    let product = await data2.json();

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

    if(!session)
    {
        return( // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
            <></>
        )
    }
    

    let onSubmitForm = async (values) => {

        let Id = product.Id;
        let Title = values.Title === "" ? null :values.Title;
        let Brand = values.Brand === "" ? null :values.Brand;
        let Price = values.Price === "" ? null :values.Price;
        let Discount = values.Discount === "" ? null :values.Discount;
        let Category = values.Category === "" ? null :values.Category;
        let Stock = values.Stock === "" ? null :values.Stock;
        let Favorite = values.Favorite === "" ? null :values.Favorite;
        let Images = values.Images.length === 0 ? null :values.Images;
        let files =  values.Img.length === 0 ? null :values.Img;

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
                //- REMOVE all the images (Thumbnails)
                await fetch("/api/products/images/deleteAllImages",{
                    method: 'POST',
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body:JSON.stringify({
                        folder: folder,
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
            <Form onSubmitForm={onSubmitForm} categories={categories} formType={"modifying"} product={product}/>
        </>
    );
}
 
export default ModifyProduct;