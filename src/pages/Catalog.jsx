import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

// import CourseCard from "../components/Catalog/CourseCard"
// import CourseSlider from "../components/Catalog/CourseSlider"
import {Footer} from "../components/Common/Footer"
import Course_Card from "../components/core/Catalog/Course_Card"
import Course_Slider from "../components/core/Catalog/CourseSlider"
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import { getCatalogaPageData } from "../services/operations/pageAndComponentData"
import Error from "./Error"

function Catalog() {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // Fetch All Categories
  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id;
        setCategoryId(category_id);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
    })();
  }, [catalogName]);

  useEffect(() => {
    if (categoryId) {
      (async () => {
        try {
          const res = await getCatalogaPageData(categoryId);
          setCatalogPageData(res);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-richblack-900 via-richblack-800 to-richblack-900 px-4 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-gray-400 text-white">
            Home / Catalog /{" "}
            <span className="text-yellow-500 font-semibold">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>
          <p className="mt-6 text-lg text-gray-300 text-white">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Courses Section */}
      <div className="mx-auto w-full max-w-7xl px-4 py-12">
        <h2 className="section_heading text-3xl font-bold text-white">
          Courses to get you started
        </h2>
        <div className="mt-6 flex border-b border-gray-600 text-sm">
          {["Most Popular", "New"].map((tab, index) => (
            <p
              key={index}
              className={`cursor-pointer px-6 py-2 transition-colors ${
                active === index + 1
                  ? "border-b-4 border-yellow-500 text-yellow-500 font-medium"
                  : "text-gray-400 hover:text-gray-200 text-white"
              }`}
              onClick={() => setActive(index + 1)}
            >
              {tab}
            </p>
          ))}
        </div>
        <div className="mt-8">
          <Course_Slider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      {/* Top Courses Section */}
      <div className="mx-auto w-full max-w-7xl px-4 py-12 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="section_heading text-3xl font-bold text-white">
          Top courses in{" "}
          <span className="text-yellow-500">
            {catalogPageData?.data?.differentCategory?.name}
          </span>
        </h2>
        <div className="mt-8   ">
          <Course_Slider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Frequently Bought */}
      <div className="mx-auto w-full max-w-7xl px-4 py-12">
        <h2 className="section_heading text-3xl font-bold text-white">
          Frequently Bought
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {catalogPageData?.data?.mostSellingCourses
            ?.slice(0, 4)
            .map((course, i) => (
              <Course_Card
                course={course}
                key={i}
                Height={"h-[400px]"}
                className="text-white"
              />
            ))}
        </div>
      </div>

      <Footer className="text-white" />
    </>
  );
}

 


export default Catalog
