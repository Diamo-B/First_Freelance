import Styles from '/styles/Admin/Products/remove.module.css'
import { useState } from 'react';
import DeletionPrompt from '/components/Admin/Products/DeletionPrompt'

const SearchBar = ({products}) => {
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
        let data = await fetch("http://localhost:3000/api/products/deleteProduct",{
            method:"DELETE",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                Id: value.Id
            })
        });
        let deletedProduct = await data.json();
        console.log(deletedProduct);
        setPromptData(deletedProduct.Uuid);
    }

    return ( 
        <>
            <div className={Styles.search} style={{ marginBottom: 1+'em' }} > 
                <input type="text" placeholder="Rechercher un produit"  onChange={handleFilter}/>
            </div>
            {
                filteredData.length != 0 && (
                    <div className={Styles.extended}>
                        <div className={Styles.dataResult}>
                            {filteredData.slice(0, 15).map((value) => {
                                return (
                                <a className={Styles.dataItem}  key={value.Id} onClick={()=>deleteProduct(value)}>
                                    {value.Title}
                                </a>
                                );
                            })}
                        </div>
                    </div>
                )
            }
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