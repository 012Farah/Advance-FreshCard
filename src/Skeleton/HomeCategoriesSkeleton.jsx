import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { Link } from "react-router";
import { CategoriesContext } from "../Context/Categories.context";


function HomeCategoriesSkeleton( ) {
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

          {/* Categories Grid (skeleton placeholders while loading) */}
          <div className="grid py-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {(isLoading ? Array.from({ length: 6 }) : (categories ?? [])).map((categoryOrPlaceholder, idx) => (
              isLoading ? (
                <div
                  key={idx}
                  className="card p-4 rounded-xl bg-white shadow-md animate-pulse flex flex-col gap-2 items-center"
                  aria-hidden="true"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded mt-2"></div>
                </div>
              ) : (
                <Link
                  to={`/category/${categoryOrPlaceholder._id}`}
                  key={categoryOrPlaceholder._id}
                  className="card cursor-pointer p-4 rounded-xl hover:shadow-lg transition-shadow duration-200 shadow-md flex flex-col gap-2 bg-white items-center"
                >
                  <img
                    src={categoryOrPlaceholder.image}
                    alt={categoryOrPlaceholder.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <h3>{categoryOrPlaceholder.name}</h3>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeCategoriesSkeleton;

