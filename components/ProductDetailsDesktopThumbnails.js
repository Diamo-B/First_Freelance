import styles from "../styles/productDetails.module.css";
import {useState} from "react";
import Image from "next/image";

const ProductThumbnails = ({Thumbnails}) => {
  let [mainImage, setMainImage] = useState(Thumbnails[0].Path);

  return(
      <div className={styles.desktopImages}>
          <Image className={styles.mainImage} src={mainImage} alt="product's first image" width={1000} height={1000}/>
          <div className={styles.littleImages}>
            {
              Thumbnails.slice(0,5).map(thumbnail=>(
                mainImage !== thumbnail.Path?
                <Image key={thumbnail.Id}
                src={thumbnail.Path} alt="product's first image"
                onClick={()=>(
                  setMainImage(thumbnail.Path)                  
                )}
                width={1000}
                height={1000}
                />
                :
                ""
              ))
            }
          </div>
      </div>
  );
}

export default ProductThumbnails;