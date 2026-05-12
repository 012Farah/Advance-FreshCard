import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBabyCarriage,
  faBolt,
  faPersonDress,
  faPhone,
  faSuitcaseMedical,
  faUserPlus,
  faWifi,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import freshcartLogo from "../../assets/images/freshcart-logo (1).svg";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/Auth.context";
import { cartContext } from "../../Context/Cart.Context";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";


function NavBar() {
  const isOnline = useOnlineStatus();
  const { Logout, token } = useContext(AuthContext);
  const { cartInfo, isLoading } = useContext(cartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // console.log(cartInfo);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);  //yft7 el offcanves w y2flha
  }
  return (
    <>
      <header>
        <div className="container    ">
          {/* top navbar */}
          <div className=" hidden lg:flex text-sm    py-2   items-center justify-between border-b border-gray-300/30">
            <ul className=" flex items-center gap-5  *:flex *:items-center *:gap-2">
              <li>
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:+201006888888"> 01006888888</a>
              </li>

              <li>
                <a href="mailto:support@freshmarket.com">
                  support@freshmarket.com
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
              </li>

              {isOnline === true && (
                <li className="flex items-center gap-2 text-green-600">
                  <FontAwesomeIcon icon={faWifi} />
                  <span>Online</span>
                </li>
              )}
            </ul>

            <ul className=" flex items-center gap-5">
              <li>
                <Link to="track-order">Track Order</Link>
              </li>
              <li>
                <Link to="About">About</Link>
              </li>
              <li>
                <Link to="Contact">Contact</Link>
              </li>
              <li>
                <select>
                  <option value="EGP">EGP</option>
                  <option value="SAR">SAR</option>
                  <option value="AED">AED</option>
                </select>
              </li>

              <li>
                <select>
                  <option value="EN">EN</option>
                  <option value="AR">AR</option>
                  <option value="FR">FR</option>
                </select>
              </li>
            </ul>
          </div>

          {/* main navigation */}
          <nav className="   py-4 flex items-center  justify-between">
            <h1>
              <NavLink to={"/"}>
                <img src={freshcartLogo} alt="freshcart Logo" />
              </NavLink>
            </h1>

            <search className=" relative  hidden lg:block ">
              <input
                className="form-control min-w-96 "
                type="text"
                placeholder="Search for products..."
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute right-2 top-1/2 -translate-1/2  "
              />
            </search>

            <ul className=" hidden  lg:flex items-center gap-8  ">
              <li>
                <NavLink
                  to="wishlist"
                  className={({ isActive }) => {
                    return `${
                      isActive ? "text-primary-600" : ""
                    } flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`;
                  }}
                >
                  <FontAwesomeIcon className="text-xl" icon={faHeart} />
                  <span className="text-sm">Wishlist</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="cart"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-primary-600" : ""
                    } flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`
                  }
                >
                  <div className=" relative">
                    <FontAwesomeIcon
                      className="text-xl"
                      icon={faCartShopping}
                    />
                    <span className=" absolute right-0 top-0 -translate-y-1/2  size-5 flex justify-center items-center rounded-full bg-primary-600 text-white text-xs">
                      {isLoading ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      ) : (
                        cartInfo?.numOfCartItems || 0
                      )}
                    </span>
                  </div>
                  <span className="text-sm">Cart</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="account"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-primary-600" : ""
                    } flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`
                  }
                >
                  <FontAwesomeIcon className="text-xl" icon={faUser} />
                  <span className="text-sm">Account</span>
                </NavLink>
              </li>
              {!token ? (
                <>
                  <li>
                    <NavLink
                      to="signup"
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-primary-600" : ""
                        } flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`
                      }
                    >
                      <FontAwesomeIcon className="text-xl" icon={faUserPlus} />
                      <span>Signup</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="login"
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-primary-600" : ""
                        } flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`
                      }
                    >
                      <FontAwesomeIcon
                        className="text-xl"
                        icon={faAddressCard}
                      />
                      <span className="text-sm">Login</span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <li
                  className=" cursor-pointer flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200"
                  onClick={Logout}
                >
                  <FontAwesomeIcon
                    className="text-xl"
                    icon={faRightFromBracket}
                  />
                  <span className="text-sm">Logout</span>
                </li>
              )}
            </ul>
            {/*canva button  */}
            <button
              className="btn bg-primary-600 text-white lg:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>

            {/* nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn */}
          </nav>
        </div>
        {/* categori navigation */}
        <nav className="hidden lg:block bg-gray-100 py-2">
          <div className="container flex gap-8 items-center py-2  border-gray-300/30">
            <div className=" relative group z-50">
              <button className="btn flex items-center gap-8 bg-primary-600 text-white hover:bg-primary-700">
                <FontAwesomeIcon icon={faBars} />
                <span>All Categories</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </button>

              <menu className="hidden group-hover:block  absolute top-10 min-w-60  bg-white shadow   *:py-3 *:px-3  *:hover:bg-gray-100  rounded-lg z-50  divide-y-2 divide-gray-300/50">
                <Link className="flex items-center gap-2">
                  <li>
                    <FontAwesomeIcon
                      className="text-primary-600 text-xl "
                      icon={faPerson}
                    />
                    <span>Men's Fashions</span>
                  </li>
                </Link>

                <Link className="flex items-center gap-2">
                  <li>
                    <FontAwesomeIcon
                      className="text-primary-600 text-xl "
                      icon={faPersonDress}
                    />
                    <span>Women's Fashions</span>
                  </li>
                </Link>

                <Link className="flex items-center gap-2">
                  <li>
                    <FontAwesomeIcon
                      className="text-primary-600 text-xl "
                      icon={faBabyCarriage}
                    />
                    <span>Baby & Toys</span>
                  </li>
                </Link>

                <Link className="flex items-center gap-2">
                  <li>
                    <FontAwesomeIcon
                      className="text-primary-600 text-xl "
                      icon={faSuitcaseMedical}
                    />
                    <span>Beauty & Health</span>
                  </li>
                </Link>

                <Link className="flex items-center gap-2 ">
                  <li>
                    <FontAwesomeIcon
                      className="text-primary-600 text-xl "
                      icon={faBolt}
                    />
                    <span>Electronics</span>
                  </li>
                </Link>

                <Link className="flex items-center gap-2">
                  <li>
                    <FontAwesomeIcon
                      className=" text-primary-600 text-xl"
                      icon={faEllipsis}
                    />
                    <span>view All Categories</span>
                  </li>
                </Link>
              </menu>
            </div>

            <ul className=" flex items-center gap-8  justify-center   ">
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>

              <li>
                <NavLink to={"/RecentlyAdded"}>Recently Added</NavLink>
              </li>

              <li>
                <NavLink to={"/FeaturedProduct"}>Features Products</NavLink>
              </li>

              <li>
                <NavLink to={"/HomeDeals"}>Offers</NavLink>
              </li>

              <li>
                <NavLink to={"/brands"}>Brands</NavLink>
              </li>
            </ul>
          </div>
        </nav>

        {/* offCanves */}
        {isMenuOpen && (
          <>
            <div
              className=" background fixed inset-0  cursor-pointer z-30 bg-black/50  "
              onClick={toggleMenu}
            ></div>
            <div className=" offcanves space-y-7 fixed z-40 bg-white top-0 bottom-0 p-5 animate-slide-in">
              <div className=" flex items-center justify-between mb-8  borde-b  border-gray-300/50 pt-4">
                <img src={freshcartLogo} alt="Fresh Cart Logo" />
                <button className="btn rounded-full " onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              <search className=" relative  ">
                <input
                  className="form-control min-w-80 "
                  type="text"
                  placeholder="Search for products..."
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute right-2 top-1/2 -translate-1/2  "
                />
              </search>

              <div className="border  border-gray-300/20 pt-5">
                <h2 className="text-xl font-bold">Main Menu</h2>
                <ul className=" *:hover:bg-gray-100 transition-colors duration-200 space-y-2 mt-3">
                  <li>
                    <NavLink
                      to="wishlist"
                      className={({ isActive }) => {
                        return `${
                          isActive ? "text-primary-600 bg-primary-100" : ""
                        } flex  items-center gap-2 hover:text-primary-600 transition-colors duration-200 px-2 py-3`;
                      }}
                    >
                      <FontAwesomeIcon className="text-xl" icon={faHeart} />
                      <span className="text-sm">Wishlist</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="cart"
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-primary-600   bg-primary-100" : ""
                        } flex  items-center gap-2 hover:text-primary-600 transition-colors duration-200  px-2 py-3`
                      }
                    >
                      <div className=" relative">
                        <FontAwesomeIcon
                          className="text-xl"
                          icon={faCartShopping}
                        />
                        <span className=" absolute right-0 top-0 -translate-y-1/2  size-5 flex justify-center items-center rounded-full bg-primary-600 text-white text-xs">
                          3
                        </span>
                      </div>
                      <span className="text-sm">Cart</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="account"
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-primary-600   bg-primary-100" : ""
                        } flex  items-center gap-2 hover:text-primary-600 transition-colors duration-200  px-2 py-3`
                      }
                    >
                      <FontAwesomeIcon className="text-xl" icon={faUser} />
                      <span className="text-sm">Account</span>
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold">Account</h2>
                <ul className=" *:hover:bg-gray-100 transition-colors duration-200 space-y-2 mt-3">
                  {!token ? (
                    <>
                      <li>
                        <NavLink
                          to="signup"
                          className={({ isActive }) =>
                            `${
                              isActive
                                ? "text-primary-600   bg-primary-100"
                                : ""
                            } flex  items-center gap-2 hover:text-primary-600 transition-colors duration-200  px-2 py-3`
                          }
                        >
                          <FontAwesomeIcon
                            className="text-xl"
                            icon={faUserPlus}
                          />
                          <span>Signup</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="login"
                          className={({ isActive }) =>
                            `${
                              isActive
                                ? "text-primary-600   bg-primary-100"
                                : ""
                            } flex  items-center gap-2 hover:text-primary-600 transition-colors duration-200  px-2 py-3`
                          }
                        >
                          <FontAwesomeIcon
                            className="text-xl"
                            icon={faAddressCard}
                          />
                          <span className="text-sm">Login</span>
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <li
                      className=" cursor-pointer flex items-center gap-2 hover:text-primary-600  transition-colors duration-200  px-2 py-3"
                      onClick={Logout}
                    >
                      <FontAwesomeIcon
                        className="text-xl"
                        icon={faRightFromBracket}
                      />
                      <span className="text-sm">Logout</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}

export default NavBar;
