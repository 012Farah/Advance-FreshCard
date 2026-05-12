import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import homeSlider from "../../assets/images/home-slider-1.png";

function HomeSlider() {
  return (
    <>
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
      >
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url('${homeSlider}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className=" overplay text-white py-24 bg-gradient-to-r from-primary-600/95 to-primary-600/20">
              <div className=" container space-y-4 ">
                <h2 className="text-3xl font-bold">
                  Fresh Products delivered <br /> to your Door
                </h2>
                <p>Get 20% off for your first order</p>

                <div className="space-x-3">
                  <button className="btn bg-white hover:bg-gray-300 text-primary-600 border-2 border-white">
                    Shop Now
                  </button>
                  <button className="btn border-2 hover:bg-white hover:text-primary-600 border-white bg-transparent text-white">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url('${homeSlider}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className=" overplay text-white py-24 bg-gradient-to-r from-primary-600/95 to-primary-600/20">
              <div className=" container space-y-4 ">
                <h2 className="text-3xl font-bold">
                  Fresh Products delivered <br /> to your Door
                </h2>
                <p>Get 20% off for your first order</p>

                <div className="space-x-3">
                  <button className="btn bg-white hover:bg-gray-300 text-primary-600 border-2 border-white">
                    Shop Now
                  </button>
                  <button className="btn border-2 hover:bg-white hover:text-primary-600 border-white bg-transparent text-white">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url('${homeSlider}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className=" overplay text-white py-24 bg-gradient-to-r from-primary-600/95 to-primary-600/20">
              <div className=" container space-y-4 ">
                <h2 className="text-3xl font-bold">
                  Fresh Products delivered <br /> to your Door
                </h2>
                <p>Get 20% off for your first order</p>

                <div className="space-x-3">
                  <button className="btn bg-white hover:bg-gray-300 text-primary-600 border-2 border-white">
                    Shop Now
                  </button>
                  <button className="btn border-2 hover:bg-white hover:text-primary-600 border-white bg-transparent text-white">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url('${homeSlider}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className=" overplay text-white py-24 bg-gradient-to-r from-primary-600/95 to-primary-600/20">
              <div className=" container space-y-4 ">
                <h2 className="text-3xl font-bold">
                  Fresh Products delivered <br /> to your Door
                </h2>
                <p>Get 20% off for your first order</p>

                <div className="space-x-3">
                  <button className="btn bg-white hover:bg-gray-300 text-primary-600 border-2 border-white">
                    Shop Now
                  </button>
                  <button className="btn border-2 hover:bg-white hover:text-primary-600 border-white bg-transparent text-white">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
       
      </Swiper>
    </>
  );
}

export default HomeSlider;
