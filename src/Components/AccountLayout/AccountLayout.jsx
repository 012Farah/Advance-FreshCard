import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faShoppingBag,
  faHeart,
  faStar,
  faMapMarkerAlt,
  faCreditCard,
  
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { useContext } from "react";
import { AuthContext } from "../../Context/Auth.context";

export default function AccountLayout() {
  const { userInfo } = useContext(AuthContext);
  return (
    <section className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white rounded-xl  shadow-sm p-6 space-y-6 relative">
          <div className="flex items-center  gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="font-semibold"><FontAwesomeIcon className="text-primary-600"  icon={faUser}/></span>
            </div>
            <div>
              <p className="font-semibold text-sm lg:text-base">
                {userInfo?.name || "User"}
              </p>
            </div>  
          </div>

          <ul className="space-y-1 text-lg relative">
            <li>
              <div
                className="text-xl  relative flex items-center gap-3 px-4 py-3 rounded-md transition-all"
               >
                <FontAwesomeIcon icon={faTachometerAlt} />
                Dashboard
              </div>
            </li>
            <li>
              <NavLink
                to="orders"
                end
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-4 py-3 rounded-md transition-all
                  ${
                    isActive
                      ? "bg-green-50 text-green-600 font-semibold before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-green-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
                  }`
                }
              >
                <FontAwesomeIcon icon={faShoppingBag} />
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="wishlist"
                end
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-4 py-3 rounded-md transition-all
                  ${
                    isActive
                      ? "bg-green-50 text-green-600 font-semibold before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-green-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
                  }`
                }
              >
                <FontAwesomeIcon icon={faHeart} />
                Wishlist
              </NavLink>
            </li>
           
            <li>
              <NavLink
                to="addresses"
                end
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-4 py-3 rounded-md transition-all
                  ${
                    isActive
                      ? "bg-green-50 text-green-600 font-semibold before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-green-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
                  }`
                }
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                Addresses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="payment"
                end
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-4 py-3 rounded-md transition-all
                  ${
                    isActive
                      ? "bg-green-50 text-green-600 font-semibold before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-green-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
                  }`
                }
              >
                <FontAwesomeIcon icon={faCreditCard} />
                Payment Method
              </NavLink>
            </li>
            
            <li>
              <NavLink
                to="logout"
                end
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-4 py-3 rounded-md transition-all
                  ${
                    isActive
                      ? "bg-green-50 text-green-600 font-semibold before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-green-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
                  }`
                }
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </NavLink>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 bg-white rounded-xl shadow-sm p-6 space-y-6 relative">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
