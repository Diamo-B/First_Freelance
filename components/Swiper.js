// import Swiper JS
import { Swiper,SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, EffectFade } from 'swiper';
import MySwiperSlide from './SwiperSlide';
import Link from 'next/link';



// import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

SwiperCore.use([Pagination,EffectFade]);

const MySwiper = ({products}) => {
    let [id,setId] = useState(products[0].Id);
    let ActiveSlideProductID = (index) => {
        return products[index].Id;
    }
    return ( 
        <Swiper
            effect="fade"
            fadeEffect={{
                crossFade: true
            }}
            speed= {2000}
            slidesPerView={1}
            centeredSlides={true}
            pagination={{clickable: true}}
            onSlideChange={(swiper) => {
                setId(ActiveSlideProductID(swiper.activeIndex));
            }
          }
        >
            {
                products.map((product)=>(                         
                    <SwiperSlide key={product.Id}>
                        <Link href={'/productDetails/'+id}>   
                            <MySwiperSlide product={product}/>
                        </Link>
                    </SwiperSlide>
                ))
            }
            <div style={{marginBottom: 24+'px'}}></div>
        </Swiper>
    );
}
 
export default MySwiper;