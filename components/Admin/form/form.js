import styles from '/styles/Admin/Products/add.module.css'
import {useForm} from 'react-hook-form';
import { addNewPicName } from '/components/Admin/form/addNewPicName.js';
import { removeAllImages } from '/components/Admin/form/removeAllImages.js';
import { useState,useEffect } from 'react';

const Form = ({categories,onSubmitForm,formType,product}) => {
    let [filtredCats, setFiltredcats] = useState([]);
    const {register, handleSubmit, formState:{errors} , trigger, setValue} = useForm();
    
    useEffect(()=>{
        if (formType == "adding") {
            console.log("adding product");
        }
        else if (formType == "modifying")
        {
            console.log("modify product");
            filteredCats();
        }
    })

    let filteredCats = () => {
        let prodTitle = product.Category.Title;
        categories.map(cat => {
            if (cat.Title !== prodTitle) {
                setFiltredcats(oldArr => [...oldArr,cat]);
            }
        })
    }

    return ( 
            <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}  encType="multipart/form-data">

                <label>
                    <span>Titre du Produit <span className={styles.asterisk}>*</span></span>
                    <input 
                    className={styles.Textinput} 
                    type="text" 
                    {...register("Title",formType == "adding" &&{required: "Le titre est obligatoire"})}
                    onKeyUp = {()=>{
                        trigger("Title")
                    }}
                    defaultValue={formType == "modifying"?product.Title:""}
                    />
                    {errors.Title&&<small className={styles.error}>{errors.Title.message}</small>}
                </label>
                <label>
                    Marque
                    <input 
                    className={styles.Textinput} 
                    type="text" 
                    {...register("Brand")}
                    defaultValue={formType == "modifying"?product.BrandName:""}/>
                </label>

                <label>
                    <span>Prix <span className={styles.asterisk}>*</span></span>
                    <input 
                    className={styles.Textinput} 
                    type="number" 
                    {
                        ...register("Price", formType == "adding" &&
                            {
                                required: "Le prix est obligatoire",
                                min:{value: 0,message: "Le prix ne peut pas être négatif"},
                                pattern:{value: /^[0-9]*$/, message:"Le prix doit absolument être un nombre"}
                            }
                            || 
                            formType == "modifying" &&
                            {
                                min:{value: 0,message: "Le prix ne peut pas être négatif"},
                                pattern:{value: /^[0-9]*$/, message:"Le prix doit absolument être un nombre"},
                            }
                        )
                    }
                    onKeyUp = {()=>{
                        formType == "adding" &&
                        trigger("Price")
                    }}
                    defaultValue={formType == "modifying"?product.Price:""}
                    />
                    {errors.Price&&<small className={styles.error}>{errors.Price.message}</small>}
                </label>

                <label className={styles.percent_holder}>
                    Réduction
                    <input 
                    className={styles.Textinput} 
                    type="number" 
                    id='Reduction' 
                    {...register("Discount",
                        {
                            min:{value: 0,message: "La réduction ne peut pas être négative"},
                            max:{value: 100,message: "La réduction ne peut pas être plus que 100%"},
                            pattern:{value: /^[0-9]*$/, message:"La réduction doit absolument être un nombre"}
                        }
                    )}
                    onKeyUp = {()=>{
                        trigger("Discount")
                    }}
                    defaultValue={formType == "modifying"?product.DiscountRate:""}
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
                            formType == "modifying"?
                                <>
                                    <option value={product.Category.Title}>{product.Category.Title}</option>
                                    {
                                        filtredCats.map((cat) => (
                                            <option key={cat.Id} value={cat.Title}>{cat.Title}</option>
                                        ))
                                    }
                                </>
                            :
                                categories.map(category => (
                                    <option key={category.Id} value={category.Title}>{category.Title}</option>
                                ))
                        }
                    </select>
                    {errors.Category&&<small className={styles.error}>{errors.Category.message}</small>}
                </label>

                <label>
                    <span>Stock <span className={styles.asterisk}>*</span></span>
                    <input 
                    className={styles.Textinput} 
                    type="number" 
                    {...register("Stock",formType == "adding" &&
                        {
                            required: "Le stock est obligatoire",
                            min:{value:0,message:"Le stock ne peut pas être négatif"},
                            pattern:{value: /^[0-9]*$/, message:"Le stock doit absolument être un nombre"}
                        }
                        ||
                        formType == "modifying" &&
                        {
                            min:{value:0,message:"Le stock ne peut pas être négatif"},
                            pattern:{value: /^[0-9]*$/, message:"Le stock doit absolument être un nombre"}
                        }
                        )
                    }
                    onKeyUp = {()=>{
                        formType == "adding" &&
                        trigger("Stock")
                    }}
                    defaultValue = {formType == "modifying"?product.Stock:""}
                    />
                    {errors.Stock&&<small className={styles.error}>{errors.Stock.message}</small>}
                </label>

                <label className={styles.row_flex}>
                    Ajouter aux favoris? 
                    <input 
                    type="checkbox" 
                    id="Fav" 
                    defaultChecked={formType == "modifying"? product.Favorite : false}
                    {...register("Favorite")} 
                    onKeyUp = {()=>{formType == "adding" &&trigger("Favorite")}}
                    defaultValue={formType == "modifying"?product.favorite:""}
                    />
                </label>

                <label htmlFor="images" className={styles.pics_gap}>
                    <span className={styles.submit}>Ajouter des Photos <span className={styles.asterisk}>*</span></span>
                    <input className={styles.images} id="images" name="images_toUpload"  type="file" accept="image/*" multiple
                    {
                        ...register("Img",
                        {
                            required: {
                                value: formType == "adding"? true:false ,
                                message: "Les images sont obligatoires"
                            },
                            onChange: ()=>addNewPicName(),
                        }
                        )
                    }

                    onKeyUp = {()=>{
                        formType == "adding" &&trigger("Img")
                    }}
                    />
                    {errors.Img&&<small className={styles.error}>{errors.Img.message}</small>}
                    <span {...register("Images")}></span>
                    <span id='imagesnames'></span>
                </label>
                <span className={styles.submit} onClick={()=>removeAllImages()}>Clear Images</span>

                <button className={[styles.submit,styles.margin_bottom].join(' ')} type='submit' onClick={()=>{
                    let imageText = document.getElementById('imagesnames').innerText;
                    let imagesArray = imageText===""?[]:imageText.replace(/[\r\n]/gm, ',').split(',');
                    setValue("Images",imagesArray);
                }}>{formType == "adding"? "Ajouter un nouveau produit" : "Modifier ce produit" }</button>
            </form>
    );
}
 
export default Form;