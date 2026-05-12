import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/Category-service";
import React from "react";
import { Link } from "react-router";
import Loading from "../Loading/Loading";
import { useContext } from "react";
import { CategoriesContext } from "../../Context/Categoris.context";
import HomeCategoriesSkeleton from "../../Skeleton/HomeCategoriesSkeleton";


function HomeCategories( ) {
  // //^ Mounting phase => initial render
  // //^ then go to update phase when state changes and go to return part to re-render the component with new data
  // const [categories, setCategories] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // async function fetchCategories() {
  //   try {
  //     setIsLoading(true); // before sending the request, set loading to true
  //     const response = await getCategories();
  //     console.log("Fetched Categories Response:", response);

  //     // ✅ fix: make sure we set the correct array of categories
  //     if (response.success) {
  //       setIsLoading(false); // stop loading when data is received
  //       setCategories(response.data.data.data); // ✅ this targets the actual categories array
  //     }
  //   } catch (error) {
  //     // when failed to get categories
  //     setIsLoading(false);
  //     console.error("Error fetching categories:", error);
  //   }
  // }

  // // useEffect hook to fetch categories on component mount
  // // [] means it runs only once when the component mounts
  // //^ Mounting phase => after initial render
  // useEffect(() => {     //bnsha8l el function ba3d ma byrender el component awl mara
  //   fetchCategories();
  // }, []);

  //------------------------------Categoriescontext-------------------------------
  const { categories, isLoading ,isError, error } = useContext(CategoriesContext);

  if (isLoading) {
    return <HomeCategoriesSkeleton/>;
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black mb-8">
              Shop by Category 
            </h2>
            <Link
              to="/categories"
              className="text-primary-600 font-medium flex items-center transition-colors duration-200"
            >
              <span>View All Categories</span>
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </div>

          {/* Categories Grid */}
          <div className="grid py-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link to={`/category ${category._id}`}
                key={category._id}
                className="card cursor-pointer p-4 rounded-xl hover:shadow-lg transition-shadow duration-200 shadow-md flex flex-col gap-2 bg-white items-center"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="size-16 object-cover rounded-full"
                />
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeCategories;

