import styles from "../styles/productDetails.module.css"; import {useState} from "react";

const ProductThumbnails = ({Thumbnails}) => {
  let [mainImage, setMainImage] = useState(Thumbnails[0].Path);

  return(
      <div className={styles.desktopImages}>
          <img className={styles.mainImage} src={mainImage} alt="product's first image" width="1000px" height="1000px"/>
          <div className={styles.littleImages}>
            {
              Thumbnails.slice(0,5).map(thumbnail=>(
                mainImage !== thumbnail.Path?
                <img key={thumbnail.Id}
                src={thumbnail.Path} alt="product's first image"
                onClick={()=>(
                  setMainImage(thumbnail.Path)
                )}
                width='1000px'
                height='1000px'
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
