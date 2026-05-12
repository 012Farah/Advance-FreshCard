import React, { useContext, useState } from "react";
import loginimg from "../../assets/images/login-img.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons/faPeopleGroup";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { API_CONFIG } from "../../config";
import { AuthContext } from "../../Context/Auth.context";


function Login() {
  const location = useLocation();
  const from = location?.state?.from || "/"; //h3ml ? 3a4an lw wa7d lesa da5l awl mra w m3ndho4 state y5od el default ely howa "/"

  const { setToken } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [inCorrectCredentialsMSG, setinCorrectCredentialsMSG] = useState("");

  // Define validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Handle login submission
  const handleLogin = async (values) => {
    try {
      const options = {
        method: "POST",
        url: `${API_CONFIG.BASEURL}/auth/signin`, // Fixed URL
        data: {
          email: values.email,
          password: values.password,
        },
      };
      const { data } = await axios.request(options);

      if (data.message === "success") {
        toast.success("Welcome Back! You Logged in Successfully ✅");
        setToken(data.token);

        if (values.rememberMe) {
          localStorage.setItem("token", data.token);
        }else{
          sessionStorage.setItem("token", data.token);
        }

        setTimeout(() => {
          navigate(from);
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        // السيرفر رد بخطأ (زي بيانات غلط)
        const errorMsg = error.response.data.message || "Login failed.";
        setinCorrectCredentialsMSG(errorMsg);
        console.error("Signup Error ❌", errorMsg);
        toast.error(errorMsg);
      } else {
        // السيرفر ماردش (CORS أو HTTPS أو انقطاع الإنترنت)
        console.error("Network Error:", error.message);
        toast.error("Network error. Please check your connection or URL.");
      }
    }
  };

  // Initialize Formik - this must be at the top level
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  function handleChange(event) {
    setinCorrectCredentialsMSG("");
    formik.handleChange(event);
  }

  return (
    <>
      <main className="py-12 mx-28">
        <div className="container grid lg:grid-cols-2 lg:gap-24">
          {/* left */}
          <div className="space-y-8 py-10">
            <img
              src={loginimg}
              alt="login image"
              className="shadow-xl rounded-xl bg-white"
            />
            <h2 className="text-black text-3xl font-semibold flex justify-center items-center">
              Fresh Groceries Delivered
            </h2>
            <p className="text-l text-gray-600 flex text-center justify-center">
              join thousands of happy customers who trust FreshCart for their
              daily groceries needs
            </p>
            <div>
              <ul className="flex flex-row justify-center gap-8 *:hover:text-primary-600 *:transition-colors *:duration-200">
                <li>
                  <Link to={``}>Free Delivery</Link>
                </li>
                <li>
                  <Link to={``}>Secure Payment</Link>
                </li>
                <li>
                  <Link to={``}>24/7 Support</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* right */}
          <div className="p-10 shadow-xl rounded-xl bg-white space-y-8 py-10">
            <div className="">
              <h2 className="text-primary-600 font-semibold text-3xl flex items-center justify-center">
                Fresh<span className="text-black">Cart</span>
              </h2>
              <h3 className="text-black text-3xl font-semibold flex justify-center items-center mt-4">
                Welcome Back!
              </h3>
              <p className="text-l text-gray-600 flex text-center justify-center mt-2">
                Login to your account to continue fresh Shopping experience
              </p>
            </div>

            <div className="flex flex-wrap justify-between gap-3">
              <button
                type="button"
                className="btn bg-transparent border border-gray-400/40 flex justify-center items-center gap-2 hover:bg-gray-100 w-full"
              >
                <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
                <span>Google</span>
              </button>

              <button
                type="button"
                className="btn bg-transparent border border-gray-400/40 flex justify-center items-center gap-2 hover:bg-gray-100 w-full"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
                <span>Facebook</span>
              </button>
            </div>

            <div className="relative w-full h-0.5 bg-gray-300/50">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-500 px-2">
                OR CONTINUE WITH EMAIL
              </span>
            </div>

            {/* form */}
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div className="space-y-6">
                {/* email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className="form-control border p-2 rounded-lg pl-10 w-full"
                      value={formik.values.email}
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="email"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-gray-400"
                      />
                    </div>
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">
                      *{formik.errors.email}
                    </p>
                  )}
                </div>

                {/* password */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password">Password</label>
                    <Link
                      to="/ForgetPassword"
                      className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="form-control border p-2 rounded-lg pl-10 pr-10 w-full bg-white"
                      value={formik.values.password}
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="current-password"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="text-gray-400"
                      />
                    </div>
                    {/* Password toggle button */}
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm">
                      *{formik.errors.password}
                    </p>
                  )}
                  {inCorrectCredentialsMSG && (
                    <p className="text-red-500 text-sm">
                      {" "}
                      *{inCorrectCredentialsMSG}
                    </p>
                  )}
                </div>

                {/* keep me signed in */}
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    className="accent-primary-600 size-5"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-gray-600 cursor-pointer"
                  >
                    Keep me signed in
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn bg-primary-600 hover:bg-primary-700 text-white w-full py-2 rounded-lg"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </div>

                <div className="w-full h-0.5 bg-gray-300/50 my-4"></div>

                <div>
                  <div className="flex items-center justify-center text-lg text-gray-600 gap-1">
                    <p>New To FreshCart?</p>
                    <Link
                      to="/signup"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Create an account
                    </Link>
                  </div>

                  <div className="flex items-center justify-center gap-5 mt-6 text-gray-500">
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faLock} />
                      <span>SSL Secured</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faPeopleGroup} />
                      <span>24/7 Support</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faStar} />
                      <span>Quality Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
//  async function handleLogin(values) {
//   try {
//     const response = await SendDataToLogin(values);

//     if (response.data.message === "success") {
//       toast.success("Welcome Back! You Logged in Successfully ✅");
//       localStorage.setItem("token", response.data.token);
//       setToken(response.data.token);

//       setTimeout(() => {
//         navigate(from);
//       }, 3000);
//     }
//   } catch (error) {
//     const msg = error.response?.data?.message || error.message;
//     setinCorrectCredentialsMSG(msg);
//     toast.error(msg);
//   }
// }
