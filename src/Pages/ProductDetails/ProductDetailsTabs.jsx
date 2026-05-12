import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Rating from "../Rating/Rating";

export default function ProductDetailsTabs({ productDetails }) {
  const { 
    ratingsAverage,
     ratingsQuantity,
    description
   } = productDetails;

  return (
    <>
      <div className="container mx-auto mt-10">
        <Tabs>
          <TabList className="border-b flex gap-6 text-gray-600 font-medium text-lg">
            <Tab
              className="pb-3 cursor-pointer outline-none"
              selectedClassName="border-b-2 border-green-600 text-green-600"
            >
                Description
            </Tab>

            <Tab
              className="pb-3 cursor-pointer outline-none"
              selectedClassName="border-b-2 border-green-600 text-green-600"
            >
              Additional Info
            </Tab>

            <Tab
              className="pb-3 cursor-pointer outline-none"
              selectedClassName="border-b-2 border-green-600 text-green-600"
            >
              Reviews ({ratingsQuantity})
            </Tab>
          </TabList>

          {/* ------ Description Panel ------ */}
          <TabPanel>
            <div className="mt-6 text-gray-700 leading-relaxed">
              <h2 className="text-xl font-semibold mb-3">
                Product Description
              </h2>

              <p>
                {description}
              </p>

              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>100% organic and pesticide-free</li>
                <li>Sweet, juicy, and rich in antioxidants</li>
                <li>Hand-picked from certified farms</li>
                <li>Perfect for snacking, recipes, and smoothies</li>
              </ul>
            </div>
          </TabPanel>

          {/* ------ Additional Info Panel ------ */}
          <TabPanel>
            <div className="mt-8 text-gray-700 leading-relaxed">
              <h2 className="text-2xl font-bold mb-8 tracking-wide">
                Additional Information
              </h2>

              <div className="relative border-l-2 border-green-400 pl-8 space-y-10">

                <div className="relative group">
                  <div className="absolute -left-[11px] top-1.5 h-4 w-4 rounded-full bg-white border-2 border-green-500 shadow group-hover:scale-110 transition-transform"></div>
                  <h3 className="text-lg font-semibold mx-4 group-hover:text-green-600 transition-colors">
                    Weight
                  </h3>
                  <p className="text-gray-600 mx-4 mt-1 text-[15px]">
                    250g / 500g / 1kg
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute -left-[11px] top-1.5 h-4 w-4 rounded-full bg-white border-2 border-green-500 shadow group-hover:scale-110 transition-transform"></div>
                  <h3 className="text-lg font-semibold mx-4 group-hover:text-green-600 transition-colors">
                    Origin
                  </h3>
                  <p className="text-gray-600 mx-4 mt-1 text-[15px]">
                    Organic Farms, California
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute -left-[8px] top-1.5 h-4 w-4 rounded-full bg-white border-2 border-green-500 shadow group-hover:scale-110 transition-transform"></div>
                  <h3 className="text-lg font-semibold mx-4 group-hover:text-green-600 transition-colors">
                    Storage
                  </h3>
                  <p className="text-gray-600 mx-4 mt-1 text-[15px]">
                    Keep refrigerated
                  </p>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* ------ Reviews Panel ------ */}
          <TabPanel>
            <div className="mt-6 text-gray-700">
              <h2 className="text-xl font-semibold mb-3">
                Customer Reviews ({ratingsQuantity})
              </h2>

              <div className="Rating flex gap-2 items-center mt-2">
                <Rating rating={ratingsAverage} />
                <span>{ratingsAverage}</span>
                <span>({ratingsQuantity} reviews)</span>
              </div>

              <div className="mt-4">
                <p className="font-semibold">Write a Review</p>
                <textarea
                  placeholder="Share your experience..."
                  className="border p-3 rounded-lg w-full mt-2"
                  rows={4}
                ></textarea>

                <button className="bg-green-600 text-white px-5 py-2 rounded-lg mt-3">
                  Submit Review
                </button>
              </div>
            </div>
          </TabPanel>

        </Tabs>
      </div>
    </>
  );
}
