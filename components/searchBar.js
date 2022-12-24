import Styles from '/styles/Admin/Products/remove.module.css'
import { useState } from 'react';
import DeletionPrompt from '/components/Admin/Products/DeletionPrompt'
import {useRouter} from 'next/router';

const SearchBar = ({products,modification}) => {
    let [filteredData,setFilteredData] = useState([]);
    let [promptData,setPromptData] = useState(false);

    let handleFilter = (event) => {
        const searchWord = event.target.value;
        const newFilter = products.filter((value) => {
            return value.Title.toLowerCase().includes(searchWord.toLowerCase());
        });
        searchWord === ""?
            setFilteredData([])
        :
            setFilteredData(newFilter);
    }

    let deleteProduct = async (value) => {
        let data = await fetch("/api/products/deleteProduct",{
            method:"DELETE",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                Id: value.Id
            })
        });
        let deletedProduct = await data.json();
        setPromptData(deletedProduct.Uuid);
    }

    let router = useRouter();
    let modifyProduct = (product) => {
       router.push({
        pathname: router.pathname.replace('[category]','')+'/product/'+product.Id,
        })
    }


    return ( 
        <>
            <div >
                <div className={Styles.search} style={{ marginBottom: 1+'em' }} > 
                    <input type="text" placeholder="Rechercher un produit" onChange={handleFilter}/>
                </div>
                {
                    filteredData.length != 0 && (
                        <div className={Styles.extended}>
                            <div className={Styles.dataResult}>
                                {filteredData.slice(0, 15).map((value) => {
                                    return (
                                    <a className={Styles.dataItem}  key={value.Id} 
                                        onClick={()=>{
                                            modification? modifyProduct(value) :deleteProduct(value)
                                        }}
                                    >
                                        {value.Title}
                                    </a>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            </div>
            {
                promptData && 
                (
                    <DeletionPrompt product={promptData} setPromptData={setPromptData}/>
                )
            }
        </>
    );
}
 
export default SearchBar;