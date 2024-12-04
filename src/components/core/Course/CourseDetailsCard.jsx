import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify"
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/cartSlice";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { thumbnail: ThumbnailImage, price: CurrentPrice } = course;

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor, you can't buy a course");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in",
      text2: "Please login to add to cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied to Clipboard");
  };

  return (
    <div className="mx-auto w-full max-w-sm md:max-w-md lg:max-w-lg rounded-lg bg-richblack-800 p-4 shadow-md">
      {/* Thumbnail */}
      <div className="relative h-[200px] w-full overflow-hidden rounded-lg sm:h-[250px]">
        <img
          src={ThumbnailImage}
          alt="Thumbnail"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Price */}
      <div className="mt-4 text-center text-2xl font-semibold text-yellow-50 sm:text-3xl">
        Rs. {CurrentPrice}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-6">
        <button
          className={`w-full rounded-md py-2 text-lg font-medium shadow transition-all duration-200 ${
            user && course?.studentsEnrolled.includes(user?._id)
              ? "bg-yellow-500 text-white hover:bg-green-600"
              : "bg-yellow-50 text-richblack-900 hover:bg-yellow-600 hover:text-white"
          }`}
          onClick={
            user && course?.studentsEnrolled.includes(user?._id)
              ? () => navigate("/dashboard/enrolled-courses")
              : handleBuyCourse
          }
        >
          {user && course?.studentsEnrolled.includes(user?._id)
            ? "Go to Course"
            : "Buy Now"}
        </button>

        {!course?.studentsEnrolled.includes(user?._id) && (
          <button
            onClick={handleAddToCart}
            className="w-full rounded-md bg-richblack-700 py-2 text-lg font-medium text-yellow-50 shadow transition-all duration-200 hover:bg-yellow-600 hover:text-black"
          >
            Add to Cart
          </button>
        )}
      </div>

      {/* Course Details */}
      <div className="mt-6 text-center">
        <p className="text-lg text-richblack-300">30-Day Money-Back Guarantee</p>
        <p className="mt-4 text-xl font-semibold text-richblack-100">
          This Course Includes:
        </p>
        <div className="mt-4 flex flex-col gap-y-2 text-richblack-200">
          {course?.instructions?.map((item, index) => (
            <p key={index} className="flex items-center gap-2">
              <span className="text-yellow-50">✔</span> {item}
            </p>
          ))}
        </div>
      </div>

      {/* Share Button */}
      <div className="mt-6 flex justify-center">
        <button
          className="flex items-center gap-2 rounded-md border border-yellow-50 px-4 py-2 text-yellow-50 transition hover:bg-yellow-50 hover:text-richblack-900"
          onClick={handleShare}
        >
          Share
        </button>
      </div>
    </div>
  );
}

export default CourseDetailsCard;
