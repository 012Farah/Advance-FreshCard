import { useContext } from "react";
import { BrandContext } from "../../Context/Brands.context";

export default function Brands() {
  const { brands, isLoading, error } = useContext(BrandContext);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading brands</p>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Our Brands
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="border border-gray-500/25  shadow-primary-300 rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="h-24 object-contain mb-4"
            />
            <h3 className="font-medium">{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
