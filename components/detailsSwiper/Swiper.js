import SwiperCore,{Pagination,EffectFade} from 'swiper';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import styles from '../../styles/productDetails.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

SwiperCore.use([Pagination,EffectFade]);

const DetailsSwiper = ({images}) => {
    return ( 
        <Swiper
            effect='fade'
            fadeEffect={{
                crossFade: true
            }}
            speed= {2000}
            slidesPerView={1}
            centeredSlides={true}
            pagination={{ clickable: true }}
        >
        {
            images.map((image)=>(
                <SwiperSlide key={image.Id}>
                    <img className={styles.img} src={image.Path} alt="product thumbnail"/>
                </SwiperSlide>
            ))
        }

        </Swiper>
     );
}
 
export default DetailsSwiper;