import { useState,useEffect } from "react";
import Styles from '../styles/Admin/Products/remove.module.css'
import {useRouter} from "next/router";

const ProductSearchBar = ({searchData}) => {
    
    const [searchQuery, setSearchQuery] = useState("");
    let router = useRouter();
    let [found,setFound] = useState(true);

    let goToProductPage = (id) => {
        router.push(`/productDetails/${id}`)
    }

    // Update found state when searchData changes
    useEffect(() => {
        // Check if at least one item in searchData matches the search query
        const isFound = searchData?.some(data => data.Title.toLowerCase().includes(searchQuery.toLowerCase()));
        setFound(isFound);
    }, [searchData, searchQuery]);

    return (
        <>
            <div className="search">
                <input type="text" id="searchinput" autoComplete="off" placeholder="Rechercher un Produit"
                value={searchQuery}
                onChange={(event)=>{setSearchQuery(event.target.value)}}
                />
            </div>
            {
                (searchQuery.length > 0 && searchData !== null && found) &&
                <div className={[Styles.extended,Styles.Zindex].join(' ')}>
                    <div className={Styles.dataResult}>
                        {
                            searchData.map(data=>(
                                data.Title.toLowerCase().includes(searchQuery.toLowerCase()) ? 
                                (
                                    <p key={data.Id} className={Styles.dataItem} onClick={()=>goToProductPage(encodeURI(data.Id))}>
                                        {data.Title}
                                    </p>
                                )
                                :
                                null
                            ))
                        }
                    </div>
                </div>
            }
        </>
    );
}
 
export default ProductSearchBar;
