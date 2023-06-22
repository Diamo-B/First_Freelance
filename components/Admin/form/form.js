import styles from '../../../styles/Admin/Products/add.module.css'
import { useState,useMemo, createRef } from 'react';
import {useForm} from 'react-hook-form';
import Image from 'next/image';
import useBetterMediaQuery from '../../useBetterMediaQuery';

const Form = ({categories,onSubmitForm,formType,product,images,setImages}) => {

    const {register, handleSubmit, formState:{errors} , trigger, setValue} = useForm();
    let [showImagesPanel, setShowImagesPanel] = useState(false);

    register("Title",formType == "adding" &&{required: "Le titre est obligatoire"})
    register("Price", formType == "adding" && {required: "Le prix est obligatoire",min:{value: 0,message: "Le prix ne peut pas être négatif"},pattern:{value: /^[0-9]*$/, message:"Le prix doit absolument être un nombre"}}||formType == "modifying" && {min:{value: 0,message: "Le prix ne peut pas être négatif"},pattern:{value: /^[0-9]*$/, message:"Le prix doit absolument être un nombre"},})
    register("Discount",{min:{value: 0,message: "La réduction ne peut pas être négative"},max:{value: 100,message: "La réduction ne peut pas être plus que 100%"},pattern:{value: /^[0-9]*$/, message:"La réduction doit absolument être un nombre"}})
    register("Category",{required: "La catégorie est obligatoire"})
    register("Stock",formType == "adding" && {required: "Le stock est obligatoire", min:{value:0,message:"Le stock ne peut pas être négatif"},pattern:{value: /^[0-9]*$/, message:"Le stock doit absolument être un nombre"}} || formType == "modifying" && {min:{value:0,message:"Le stock ne peut pas être négatif"}, pattern:{value: /^[0-9]*$/, message:"Le stock doit absolument être un nombre"}})
    const inputRef = createRef();

    let filtredCats = [];

    filtredCats = useMemo(() => {
        if (formType === "modifying") 
        {
            let prodTitle = product[0].Category.Title;
            return categories.filter(cat => cat.Title !== prodTitle);
        }
    }, [categories, product, formType]);    

    function removeFile(fileToRemove) {
        const updatedFiles = images.filter(file => file.name !== fileToRemove.name);
        setImages(updatedFiles);
    }
    const isMobile = useBetterMediaQuery('(max-width: 500px)');

    return ( 
            <form className={`${isMobile?'':styles.form1}`} onSubmit={handleSubmit(onSubmitForm)}  encType="multipart/form-data">
                <div className={`${isMobile?styles.fieldset1M:styles.fieldset1D}`}>
                    <label> {/* Product Title */}
                        <span>Titre du Produit <span className={styles.asterisk}>*</span></span>
                        <input 
                        className={styles.Textinput} 
                        type="text" 
                        {...register("Title")}
                        onKeyUp = {()=>{
                            trigger("Title")
                        }}
                        defaultValue={formType == "modifying"?product[0].Title:""}
                        />
                        {errors.Title&&<small className={styles.error}>{errors.Title.message}</small>}
                    </label>
                        
                    <label> {/* Product brand */}
                        Marque
                        <input 
                        className={styles.Textinput} 
                        type="text" 
                        {...register("Brand")}
                        defaultValue={formType == "modifying"?product[0].BrandName:""}/>
                    </label>

                    <label> {/* Product Price */}
                        <span>Prix <span className={styles.asterisk}>*</span></span>
                        <input 
                        className={styles.Textinput} 
                        type="number" 
                        {...register("Price")}
                        onKeyUp = {()=>{ formType == "adding" && trigger("Price") }}
                        defaultValue={formType == "modifying"?product[0].Price:""}
                        />
                        {errors.Price&&<small className={styles.error}>{errors.Price.message}</small>}
                    </label>

                    <label className={styles.percent_holder}> {/* Product discount */}
                        Réduction
                        <input 
                        className={styles.Textinput} 
                        type="number" 
                        id='Reduction' 
                        {...register("Discount")}
                        onKeyUp = {()=>{
                            trigger("Discount")
                        }}
                        defaultValue={formType == "modifying"?product[0].DiscountRate:""}
                        />
                        <p className={styles.percent_text}>%</p>
                        {errors.Discount&&<small className={styles.error}>{errors.Discount.message}</small>}
                    </label>

                    <label> {/* Product Category */}
                        <span>Catégorie <span className={styles.asterisk}>*</span></span>
                        <select className={styles.Textinput} 
                            {...register("Category")}
                            onKeyUp = {()=>{
                                trigger("Category")
                            }}
                        >
                            {
                                formType == "modifying"?
                                    <>
                                        <option value={product[0].Category.Title} >{product[0].Category.Title}</option>
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
                </div>

                <div  className={`${isMobile?styles.fieldset1M:styles.fieldset1D}`}>
                    <label> {/* Product stock quantity */}
                        <span>Stock <span className={styles.asterisk}>*</span></span>
                        <input 
                        className={styles.Textinput} 
                        type="number" 
                        {...register("Stock")}
                        onKeyUp = {()=>{
                            formType == "adding" &&
                            trigger("Stock")
                        }}
                        defaultValue = {formType == "modifying"?product[0].Stock:""}
                        />
                        {errors.Stock&&<small className={styles.error}>{errors.Stock.message}</small>}
                    </label>

                    <label className={styles.row_flex}> {/* Add to favorites? */}
                        Ajouter aux favoris? 
                        <input 
                        type="checkbox" 
                        id="Fav" 
                        defaultChecked={formType == "modifying"? product[0].Favorite : false}
                        {...register("Favorite")} 
                        onKeyUp = {()=>{formType == "adding" &&trigger("Favorite")}}
                        defaultValue={formType == "modifying"?product.favorite:""}
                        />
                    </label>


                    <div className={styles.buttons}>
                        <span className={styles.btn} onClick={()=>setShowImagesPanel(true)}>Gérer les images</span>
                        {
                            showImagesPanel?
                                <div className={styles.Nullpanel}>
                                    <div className={styles.popUp}>
                                        <Image className={styles.closeButton} onClick={()=>{setShowImagesPanel(false)}} src="/close.svg" alt="close button" width={20} height={20}/>
                                        <span className={styles.btn} onClick={(e)=>{inputRef.current.click()}}>Ajouter des images<span className={styles.asterisk}>*</span></span>
                                        <input className={styles.imagesInput} type='file' multiple 
                                            ref={inputRef}
                                            onChange={(e) => {
                                                const newFiles = [...e.target.files];
                                                const distinctFiles = [];
                                                newFiles.forEach((file) => {
                                                  const isExist = images.some((f) => (f.name === file.name && f.size === f.size));
                                                  if (!isExist) {
                                                    distinctFiles.push(file);
                                                  }
                                                });
                                                setImages((prev) => [...prev, ...distinctFiles]);
                                            }}
                                        />
                                        {
                                            images.length > 0 &&
                                            <table className={styles.mt_1}>
                                                <thead>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Supprimer</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        images.map((file,index)=>(
                                                            <tr key={index}>
                                                                <td>
                                                                    { 
                                                                        formType == "modifying"?
                                                                            //open the image in a new tab onClick
                                                                            <a href={`/productsImages/product_${product[0].Id}/${file.name}`} target="_blank" rel="noreferrer">
                                                                                <Image className={styles.centerImage} src={`/productsImages/product_${product[0].Id}/${file.name}`} width={"100"} height={"100"} alt={file.name}/>
                                                                            </a>
                                                                        :
                                                                            //open the image in a new tab onClick
                                                                            <a href={URL.createObjectURL(file)} target="_blank">
                                                                                <Image className={styles.centerImage} src={URL.createObjectURL(file)} width={"100"} height={"100"}/>
                                                                            </a>
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <Image className={styles.centerImage} src="/remove.svg" alt="remove" width={20} height={20} onClick={()=>{removeFile(file)}}/>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        }
                                    </div>
                                </div>
                            :
                            ""
                        }
                        {/* Submit */}
                        <button className={styles.btn} type='submit' disabled={images.length==0? true : false}>
                            {formType == "adding"? "Ajouter un nouveau produit" : "Modifier ce produit" }
                        </button>    
                    </div>
                </div>
            </form>
    );
}
 
export default Form;
