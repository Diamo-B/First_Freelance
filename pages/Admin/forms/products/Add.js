import styles from '../../../../styles/Admin/Products/add.module.css'
import {useSession} from 'next-auth/react';
import { PrismaClient } from '@prisma/client'
import {useForm} from 'react-hook-form';
import { useState } from 'react';
import AddSuccess from '/components/Admin/Products/AddingSuccessPanel';

const prisma = new PrismaClient()

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

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    };

    let addNewPicName = () => {
        let span = document.getElementById('imagesnames');
        let inputImages =  document.getElementById("images").files;
        for (let i = 0; i < inputImages.length; i++) 
        {
            if (i == inputImages.length-1) 
                span.innerHTML+=(inputImages[i].name);
            else                    
                span.innerHTML+=(inputImages[i].name)+'<br/>';
        }
        return inputImages;
    }
    
    let removeAllImages = () => {
        let span = document.getElementById('imagesnames');
        span.innerHTML = "";
        document.getElementById("images").value = null
    }

    const {register, handleSubmit, formState:{errors} , trigger, reset, setValue} = useForm();

    let onSubmitForm = async (values) => { 
        let Brand = values.Brand===""?null:values.Brand
        let Discount = values.Discount===""?null:values.Discount
        await fetch("http://localhost:3000/api/products/addProduct",{
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
                    await fetch ("http://localhost:3000/api/products/saveFile",{
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
            <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}  encType="multipart/form-data">

                <label>
                    <span>Titre du Produit <span className={styles.asterisk}>*</span></span>
                    <input 
                    className={styles.Textinput} 
                    type="text" 
                    {...register("Title",{required: "Le titre est obligatoire"})}
                    onKeyUp = {()=>{
                        trigger("Title")
                    }}
                    />
                    {errors.Title&&<small className={styles.error}>{errors.Title.message}</small>}
                </label>
                <label>
                    Marque
                    <input className={styles.Textinput} type="text" {...register("Brand")}/>
                </label>

                <label>
                    <span>Prix <span className={styles.asterisk}>*</span></span>
                    <input className={styles.Textinput} type="number" 
                    {
                        ...register("Price",
                            {
                                required: "Le prix est obligatoire",
                                min:{value: 0,message: "Le prix ne peut pas être négatif"},
                                pattern:{value: /^[0-9]*$/, message:"Le prix doit absolument être un nombre"}
                            }
                        )
                    }
                    onKeyUp = {()=>{
                        trigger("Price")
                    }}
                    />
                    {errors.Price&&<small className={styles.error}>{errors.Price.message}</small>}
                </label>

                <label className={styles.percent_holder}>
                    Réduction
                    <input className={styles.Textinput} type="number" id='Reduction' 
                    {...register("Discount",
                        {
                            min:{value: 0,message: "La réduction ne peut pas être négative"},
                            pattern:{value: /^[0-9]*$/, message:"La réduction doit absolument être un nombre"}
                        }
                    )}
                    onKeyUp = {()=>{
                        trigger("Discount")
                    }}
                    />
                    <p className={styles.percent_text}>%</p>
                    {errors.Discount&&<small className={styles.error}>{errors.Discount.message}</small>}
                </label>

                <label>
                    <span>Catégorie <span className={styles.asterisk}>*</span></span>
                    <select className={styles.Textinput} 
                        {...register("Category",{required: "La catégorie est obligatoire"})}
                        onKeyUp = {()=>{
                            trigger("Category")
                        }}
                    >
                        {
                            categories.map(category => (
                                <option key={category.Id} value={category.Title}>{category.Title}</option>
                            ))
                        }
                    </select>
                    {errors.Category&&<small className={styles.error}>{errors.Category.message}</small>}
                </label>

                <label>
                    <span>Stock <span className={styles.asterisk}>*</span></span>
                    <input className={styles.Textinput} type="number" 
                    {...register("Stock",
                        {
                            required: "Le stock est obligatoire",
                            min:{value:0,message:"Le stock ne peut pas être négatif"},
                            pattern:{value: /^[0-9]*$/, message:"Le stock doit absolument être un nombre"}
                        })
                    }
                    onKeyUp = {()=>{
                        trigger("Stock")
                    }}
                    />
                    {errors.Stock&&<small className={styles.error}>{errors.Stock.message}</small>}
                </label>

                <label className={styles.row_flex}>
                    Ajouter aux favoris? 
                    <input type="checkbox" id="Fav" {...register("Favorite")} onKeyUp = {()=>{trigger("Favorite")}}/>
                </label>

                <label htmlFor="images" className={styles.pics_gap}>
                    <span className={styles.submit}>Ajouter des Photos <span className={styles.asterisk}>*</span></span>
                    <input className={styles.images} id="images" name="images_toUpload"  type="file" accept="image/*" multiple
                    {...register("Img",
                        {
                            required: "Les images sont obligatoires",
                            onChange: ()=>addNewPicName(),
                        }
                    )}
                    onKeyUp = {()=>{
                        trigger("Img")
                    }}
                    />
                    {errors.Img&&<small className={styles.error}>{errors.Img.message}</small>}
                    <span {...register("Images")}></span>
                    <span id='imagesnames'></span>
                </label>
                <span className={styles.submit} onClick={()=>removeAllImages()}>Clear Images</span>

                <button className={[styles.submit,styles.margin_bottom].join(' ')} type='submit' onClick={()=>{
                    let imageText = document.getElementById('imagesnames').innerText;
                    let imagesArray = imageText.replace(/[\r\n]/gm, ',').split(',');
                    setValue("Images",imagesArray);
                }}>Ajouter un nouveau produit</button>
            </form>
        </>
    );
}
 
export default AddProduct;