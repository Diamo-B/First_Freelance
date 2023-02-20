import styles from '/styles/Admin/Products/add.module.css'
import {useForm} from 'react-hook-form';
import { removeAllImages } from '/components/Admin/form/removeAllImages.js';
import { useState,useEffect, useRef } from 'react';
import useBetterMediaQuery from '/components/useBetterMediaQuery';
import {getPicNames} from '/components/Admin/form/getPicNames.js';

const Form = ({categories,onSubmitForm,formType,product}) => {
    let [filtredCats, setFiltredcats] = useState([]);
    const {register, handleSubmit, formState:{errors} , trigger, setValue} = useForm();
    let [photoCount,setCount] = useState(0);
    
    let filterCats = () => {
        let prodTitle = product.Category.Title;
        categories.map(cat => {
            if (cat.Title !== prodTitle) {
                setFiltredcats(oldArr => [...oldArr,cat]);
            }
        })
    }
    
    useEffect(()=>{
        if (formType == "modifying")
            filterCats();
    })

    const isMobile = useBetterMediaQuery('(max-width: 500px)');
    
    return ( 
            <form className={`${isMobile?'':styles.form1}`} onSubmit={handleSubmit(onSubmitForm)}  encType="multipart/form-data">
                <fieldset className={`${isMobile?styles.fieldset1M:styles.fieldset1D}`}>
                    <label> {/* Product Title */}
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
                        
                    <label> {/* Product brand */}
                        Marque
                        <input 
                        className={styles.Textinput} 
                        type="text" 
                        {...register("Brand")}
                        defaultValue={formType == "modifying"?product.BrandName:""}/>
                    </label>

                    <label> {/* Product Price */}
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

                    <label className={styles.percent_holder}> {/* Product discount */}
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

                    <label> {/* Product Category */}
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
                                        <option value={product.Category.Title} >{product.Category.Title}</option>
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
                </fieldset>

                <fieldset  className={`${isMobile?styles.fieldset1M:styles.fieldset1D}`}>
                    <label> {/* Product stock quantity */}
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

                    <label className={styles.row_flex}> {/* Add to favorites? */}
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


                    <div className={styles.buttons}>
                        <label className={styles.imagesContainer} htmlFor="images"> {/* Add files? */}
                            <span className={styles.btn}>Ajouter des Photos <span className={styles.asterisk}>*</span></span>
                            <input className={styles.imagesInput} id="images" name="images_toUpload"  type="file" accept="image/*" multiple 
                            {
                                ...register("Img",
                                {
                                    required: {
                                        value: formType == "adding"? true:false ,
                                        message: "Les images sont obligatoires"
                                    },
                                    onChange: ()=>setCount(document.getElementById("images").files.length),
                                }
                                )
                            }

                            onKeyUp = {()=>{
                                formType == "adding" &&trigger("Img")
                            }}
                            />
                            {errors.Img&&<small className={styles.error}>{errors.Img.message}</small>}
                            <span {...register("Images")}></span>
                            <span id='imagesnames' style={{ marginTop:0.5+'em', textAlign: 'center'}}>
                                {
                                    photoCount>0? photoCount+' Photos sélectionnée(s)' : ''
                                }
                            </span>
                        </label>
                        <button className={styles.btn} onClick={()=>removeAllImages()}>Clear Images</button>
                        {/* Submit */}
                        <button className={styles.btn} type='submit' onClick={()=>{
                            let imagesArray = getPicNames();
                            setValue("Images",imagesArray);
                        }}>{formType == "adding"? "Ajouter un nouveau produit" : "Modifier ce produit" }</button>    
                    </div>
                </fieldset>
            </form>
    );
}
 
export default Form;