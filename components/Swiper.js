// import Swiper JS
import { Swiper,SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, EffectFade } from 'swiper';
import MySwiperSlide from './SwiperSlide';

// import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

SwiperCore.use([Pagination,EffectFade]);

const MySwiper = ({products}) => {
    return ( 
        <Swiper
          effect="fade"
          fadeEffect={ { // Add this
            crossFade: true
          }}
          speed= {2000}
          spaceBetween={50}
          slidesPerView={1}
          centeredSlides={true}
          pagination={{clickable: true}}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
            {
                products.map((product)=>(
                    <SwiperSlide key={product.id}>
                        <MySwiperSlide product={product}/>
                    </SwiperSlide>
                ))
            }
            <div style={{marginBottom: 24+'px'}}></div>
        </Swiper>
    );
}
 
export default MySwiper;