import { faPinterest } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import freshCartFullLogo from "../../assets/images/freshcart-logo (1).svg";
import { Link } from "react-router";
import freshCartMiniLogo from "../../assets/images/mini-logo.png";

function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-10 border-t border-gray-400/30">
      <div className="container">
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8 py-5">
        {/* first div */}
        <div className="col-span-2 space-y-3 ">
          <img
            src={freshCartFullLogo}
            alt="Fresh Cart Logo"
            className="mb-4 w-32"
          />
          <p className="text-gray-600 max-w-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis
            molestiae cum suscipit quod culpa eos ab placeat.
          </p>

          <ul className="flex items-center gap-4  *:text-xl ">
            <li>
              <a href="#">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="text-gray-600 hover:text-blue-600 mx-2"
                />
              </a>
            </li>

            <li>
              <a href="#">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-gray-600 hover:text-blue-400 mx-2"
                />
              </a>
            </li>

            <li>
              <a href="#">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-gray-600 hover:text-pink-500 mx-2"
                />
              </a>
            </li>

            <li>
              <a href="#">
                <FontAwesomeIcon
                  icon={faPinterest}
                  className="text-gray-600 hover:text-blue-700 mx-2"
                />
              </a>
            </li>
          </ul>
        </div>

        {/* second div */}
        <div>
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
            <li>
              <Link to={``}>Men's Fashions</Link>
            </li>

            <li>
              <Link to={``}>Woman's Fashions</Link>
            </li>

            <li>
              <Link to={``}>Kid's Fashions</Link>
            </li>

            <li>
              <Link to={``}>Accessories</Link>
            </li>

            <li>
              <Link to={``}>Shoes</Link>
            </li>
          </ul>
          
        </div>

        {/* third div */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
            <li>
              <Link to={``}>About US</Link>
            </li>

            <li>
              <Link to={``}>Contact Us</Link>
            </li>

            <li>
              <Link to={``}>Privacy Policy</Link>
            </li>

            <li>
              <Link to={``}>Terms & Conditions</Link>
            </li>

            <li>
              <Link to={``}>Shipping Policy</Link>
            </li>
          </ul>
        </div>

        {/* forth div */}
        <div>
          <h2 className="text-xl font-bold mb-4">Customer Servies</h2>
          <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
            <li>
              <Link to={``}>My Account</Link>
            </li>

            <li>
              <Link to={``}>My Order</Link>
            </li>

            <li>
              <Link to={``}>WishList</Link>
            </li>

            <li>
              <Link to={``}>Returns & Refunds</Link>
            </li>

            <li>
              <Link to={``}>Help Center</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center border-t  py-5 border-gray-400/40  mt-8">
        <p> &copy;{new Date().getFullYear()} FreshCart All Rights Reserved</p>
        <img src={freshCartMiniLogo} alt="Mini Logo" className="w-8 " />
      </div>

      
      </div>
    </footer>
  );
}

export default Footer;
