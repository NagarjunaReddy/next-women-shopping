import SwiperCore, { EffectFlip, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const PageIntro = () => {
  SwiperCore.use([EffectFlip, Navigation]);

  return (
    <section className="page-intro">
      <Swiper navigation effect="cube" className="swiper-wrapper">
        <SwiperSlide>
          <div
            className="page-intro__slide"
            style={{ backgroundImage: "url('/images/slide-1.jpg')" }}
          >
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Sale of the summer collection</h2>
                <a href="/products" className="btn-shop">
                  <i className="icon-right" />
                  Shop now
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="page-intro__slide"
            style={{ backgroundImage: "url('/images/slide-2.jpg')" }}
          >
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>The summer Hitlist</h2>
                <a href="/products" className="btn-shop">
                  <i className="icon-right" />
                  Shop now
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      
    </section>
  );
};

export default PageIntro;
