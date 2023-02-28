import {useForm} from 'react-hook-form';
import styles from '../../styles/OrderForm.module.css';
import Image from 'next/image';

const OrderForm = ({submitAction,setOrderForm}) => {
    const {register, handleSubmit, formState:{errors} , trigger, getValues, watch} = useForm();
    const watchFields = watch(['PhoneNum', 'WtspNum']); 

    let testValue = (type) => {
        let phoneNum = watchFields[0];
        let wtsp = watchFields[1];
        if(type == "phone")
        {
            if (phoneNum == "" && wtsp !== "") {
                return false;
            }
            else if (phoneNum == "" && wtsp == ""){
                return true;
            }
        }
        else if (type == "wtsp")
        {
            if (wtsp == "" && phoneNum !== "") {
                return false;
            }
            else if(wtsp == "" && phoneNum == ""){
                return true;
            }
        }
    }

    return ( 
        <div className={styles.container}>
            <form className={styles.Form} onSubmit={handleSubmit(submitAction)} encType="multipart/form-data">
                <Image src={"/close.svg"} width={20} height={20} alt={"close button"}
                    onClick={()=>{
                        setOrderForm(false);
                    }}
                />
                <label className={styles.flex}>
                    <span>Prénom <span className={styles.asterisk}>*</span></span>
                    <input 
                    className={styles.Textinput}
                    type="text" 
                    {
                        ...register("FirstName",
                        {required: "Votre prénom est obligatoire"})
                    }
                    onKeyUp = {()=>{
                        trigger("FirstName")
                    }}
                    />
                    {errors.FirstName&&<small className={styles.errors}>{errors.FirstName.message}</small>}
                </label>

                <label className={styles.flex}>
                    <span>Nom <span className={styles.asterisk}>*</span></span>
                    <input 
                    className={styles.Textinput}
                    type="text" 
                    {
                        ...register("LastName",
                        {required: "Votre nom est obligatoire"})
                    }
                    onKeyUp = {()=>{
                        trigger("LastName")
                    }}
                    />
                    {errors.LastName&&<small className={styles.errors}>{errors.LastName.message}</small>}
                </label>

                <label>
                    <span>Numéro de téléphone</span>
                    <input 
                    className={styles.Textinput}
                    type="tel" 
                    {
                        ...register("PhoneNum",
                        { 
                            required:
                            {
                            value: testValue("phone"),
                            message:"Votre numéro de téléphone ou numéro Whatsapp est obligatoire"
                            } 
                            
                        })
                    }
                    />
                    {errors.PhoneNum&&<small className={styles.errors}>{errors.PhoneNum.message}</small>}
                </label>

                <label>
                    <span>Numéro Whatsapp</span>
                    <input 
                    className={styles.Textinput}
                    type="tel" 
                    {
                        ...register("WtspNum",
                        {
                            required:
                            {
                            value: testValue("wtsp"),
                            message:"Votre numéro Whatsapp ou numéro de téléphone est obligatoire"
                            } 
                        })
                    }
                    />
                    {errors.WtspNum&&<small className={styles.errors}>{errors.WtspNum.message}</small>}
                </label>

                <button type='submit' className={styles.submit}>Confirmer la commande</button>
            </form>
        </div>
    );
}
 
export default OrderForm;