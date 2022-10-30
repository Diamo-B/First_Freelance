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
            slidesBetween={50}
            slidesPerView={1}
            centeredSlides={true}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >

        {
            images.map((src)=>(
                <SwiperSlide>
                    <img className={styles.img} src={src} alt="product thumbnail"/>
                </SwiperSlide>
            ))
        }

        </Swiper>
     );
}
 
export default DetailsSwiper;