import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";
// Icons
import { FaStar } from "react-icons/fa";
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      if (data?.success) {
        setReviews(data?.data);
      }
    })();
  }, []);

  return (
    <div className="text-white bg-gradient-to-r w-full max-w-screen-xl mx-auto from-richblack-900 via-richblack-800 to-richblack-900 py-10 px-4">
      <div className="my-[50px] max-w-[90%] lg:max-w-maxContent mx-auto">
        <Swiper
          slidesPerView={reviews.length === 1 ? 1 : 1.5}
          centeredSlides={reviews.length === 1} // Center single slide
          breakpoints={{
            640: { slidesPerView: reviews.length === 1 ? 1 : 2 }, 
            1024: { slidesPerView: reviews.length === 1 ? 1 : 3 },
            1280: { slidesPerView: reviews.length === 1 ? 1 : 4 },
          }}
          spaceBetween={reviews.length === 1 ? 0 : 25}
          loop={reviews.length > 1}
          freeMode={reviews.length > 1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 rounded-lg bg-gradient-to-b from-richblack-800 via-richblack-700 to-richblack-800 p-6 text-[14px] text-richblack-25 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-12 w-12 rounded-full object-cover border-2 border-richblack-500"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5 text-lg">
                        {`${review?.user?.firstName} ${review?.user?.lastName}`}
                      </h1>
                      <h2 className="text-[12px] font-medium text-richblack-400">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  {/* Review Text */}
                  <p className="font-medium text-richblack-300 leading-6">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  {/* Rating Section */}
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-yellow-100 text-lg">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
