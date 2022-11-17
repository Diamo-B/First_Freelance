import styles from '../../../../styles/Admin/Products/add.module.css'
import {useSession} from 'next-auth/react';
import { PrismaClient } from '@prisma/client'
import {useForm} from 'react-hook-form';


const prisma = new PrismaClient()

export async function getStaticProps()
{
    let categories = await prisma.category.findMany({});
    return {
        props:{categories}
    }
}

const addProduct = ({categories}) => {
    const {data:session} = useSession({required: true});

    let addNewPicName = () => {
        let span = document.getElementById('imagesnames');
        let inputImages =  document.getElementById("images").files
        for (let i = 0; i < inputImages.length; i++) 
        {
            if (i == inputImages.length-1) 
                span.innerHTML+=(inputImages[i].name);
            else                    
                span.innerHTML+=(inputImages[i].name)+'<br/>';
        }
        return inputImages;
    }

    const {register, handleSubmit, error, reset, setValue} = useForm();
    
    let onSubmitForm = (values) => {
        console.log(values);
        fetch("http://localhost:3000/api/products/addProduct",{
            method: 'POST',
            headers:{
            'Content-type': 'application/json',
            },
            body: JSON.stringify({
                Title: values.Title,
                BrandName: values.Brand,
                Price: values.Price,
                DiscountRate: values.Discount,
                Category: values.Category,
                Stock: values.Stock,
                Favorite: values.Favorite,
                Images: values.Images
            }),
        })
        .then(()=>{
            //TODO: after response is ok and product is added add the thumbnails to the public folder
            
        })
        .catch((err)=>console.log(err))
    }

    if(!session)
    {
        return( // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
            <></>
        )
    }
    return ( 
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>

                <label>
                    <span>Titre du Produit <span className={styles.asterisk}>*</span></span>
                    <input className={styles.Textinput} type="text" {...register("Title")}/>
                </label>

                <label>
                    Marque
                    <input className={styles.Textinput} type="text" {...register("Brand")}/>
                </label>

                <label>
                    <span>Prix <span className={styles.asterisk}>*</span></span>
                    <input className={styles.Textinput} type="number" {...register("Price")}/>
                </label>

                <label className={styles.percent_holder}>
                    Réduction
                    <input className={styles.Textinput} type="number" id='Reduction' {...register("Discount")}/>
                    <p className={styles.percent_text}>%</p>
                </label>

                <label>
                    <span>Catégorie <span className={styles.asterisk}>*</span></span>
                    <select className={styles.Textinput} {...register("Category")}>
                        {
                            categories.map(category => (
                                <option key={category.Id} value={category.Title}>{category.Title}</option>
                            ))
                        }
                    </select>
                </label>

                <label>
                    <span>Stock <span className={styles.asterisk}>*</span></span>
                    <input className={styles.Textinput} type="number" {...register("Stock")}/>
                </label>

                <label className={styles.row_flex}>
                    Ajouter aux favoris? 
                    <input type="checkbox" id="Fav" {...register("Favorite")}/>
                </label>

                <label htmlFor="images" className={styles.pics_gap}>
                    <span>Ajouter des Photos <span className={styles.asterisk}>*</span></span>
                    <input className={styles.images} id="images" type="file" name="img" accept="image/*" multiple
                    {...register("Images",
                        {
                            onChange: ()=>addNewPicName(),
                        }
                    )}/>
                    <span id='imagesnames'></span>
                </label>

                <button className={styles.submit} type='submit' onClick={()=>{
                        let imageText = document.getElementById('imagesnames').innerText;
                        let imagesArray = imageText.replace(/[\r\n]/gm, ',').split(',');
                        setValue("Images",imagesArray);
                    }
                }>Ajouter un nouveau produit</button>
            </form>
        </>
    );
}
 
export default addProduct;