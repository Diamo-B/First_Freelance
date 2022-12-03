import { useState } from "react";
import Styles from '/styles/Admin/Products/remove.module.css'
import {useRouter} from "next/router";

const ProductSearchBar = ({searchData}) => {
    let [filteredData,setFilteredData] = useState([]);
    
    let handleFocus = () => {
        setFilteredData(searchData);
    }

    let handleFilter = (event) => {
        const searchWord = event.target.value;
        const newFilter = searchData.filter((value) => {
            return value.Title.toLowerCase().includes(searchWord.toLowerCase());
        });
        searchWord === ""?
            setFilteredData([])
        :
            setFilteredData(newFilter);
    }
    let router = useRouter();
    return (
        <>
            <div className="search">
                <input type="text" id="searchinput" onBlur={()=>{setFilteredData([])}} onFocus={handleFocus} onChange={(event)=>{handleFilter(event)}} placeholder="Rechercher un Produit"/>
            </div>
            {
                filteredData.length != 0 && (
                    <div className={[Styles.extended,Styles.Zindex].join(' ')}>
                        <div className={Styles.dataResult}>
                            {filteredData.slice(0, 15).map((value) => {
                                return (
                                <a className={Styles.dataItem}  key={value.Id} onClick={()=>{router.push("/productDetails/"+encodeURIComponent(value.Id)); setFilteredData([]); document.getElementById("searchinput").value = "";}}>
                                    {value.Title}
                                </a>
                                );
                            })}
                        </div>
                    </div>
                )
            }
        </>
    );
}
 
export default ProductSearchBar;