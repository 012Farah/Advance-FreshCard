import React, { useState } from "react";
import {
  faStar,
  faTruckFast,
  faShieldHalved,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import personReview from "../../assets/images/review-author.png";
import { data, Link } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { API_CONFIG } from "../../config";
import { SendDataToSignup } from "../../services/auth-services";
import { checkPasswordStrength } from "../../utils/Validation";

export default function SignUp() {
  const navigate = useNavigate();
  const [isExistError, setisExistError] = useState(null);

  //  Regex patterns
  const phoneRegex = /^(\+2)?01[0125][0-9]{8}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  //  Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(phoneRegex, "Invalid phone number"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Must be at least 8 characters with letters and numbers"
      ),
    rePassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    terms: Yup.boolean().oneOf([true], "You must agree to the conditions"),
  });

  //  Handle form submit
  async function handleSignup(values) {
    try {
      const { data } = await SendDataToSignup(values);
      if (data?.data?.message === "success") {
        toast.success("User Signed Up Successfully ✅");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      console.log("Signup Error:", error);
      if (error.response?.data?.message) {
        setisExistError(error.response.data.message);
      }
    }
  }

  // console.log("User Signed Up Successfully ✅");
  // console.log(values);

  //  useFormik hook
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
      terms: false,
    },
    validationSchema,
    onSubmit: handleSignup,
  });
  const passwordFeedback = checkPasswordStrength(formik.values.password); // Placeholder for password strength logic

  return (
    <main className="py-12 mx-28">
      <div className="container grid lg:grid-cols-2 lg:gap-24">
        {/* Left side */}
        <div className="space-y-8 py-10">
          <div className="welcome-message">
            <h2 className="text-4xl font-bold">
              Welcome to <span className="text-primary-600">FreshCart</span>
            </h2>
            <p className="text-lg mt-2">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorsteps
            </p>
          </div>

          <ul className="space-y-4 mt-8">
            <li className="flex space-x-2 items-start">
              <div className="size-12 rounded-full bg-primary-200 text-xl flex justify-center items-center text-primary-600">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div>
                <h3>Premium Quality</h3>
                <p className="text-gray-600">
                  Premium quality products from trusted suppliers
                </p>
              </div>
            </li>

            <li className="flex space-x-2 items-start">
              <div className="size-12 rounded-full bg-primary-200 text-xl flex justify-center items-center text-primary-600">
                <FontAwesomeIcon icon={faTruckFast} />
              </div>
              <div>
                <h3>Fast Delivery</h3>
                <p className="text-gray-500">
                  Same-day delivery available in most areas
                </p>
              </div>
            </li>

            <li className="flex space-x-2 items-start">
              <div className="size-12 rounded-full bg-primary-200 text-xl flex justify-center items-center text-primary-600">
                <FontAwesomeIcon icon={faShieldHalved} />
              </div>
              <div>
                <h3>Secure Shopping</h3>
                <p className="text-gray-500">
                  Your data and payment are completely secure
                </p>
              </div>
            </li>
          </ul>

          <div className="review p-6 rounded-xl mt-10 bg-white shadow-md">
            <div className="flex items-center gap-3">
              <img
                src={personReview}
                className="size-12 rounded-full"
                alt="Sarah Josn"
              />
              <div>
                <h3>Sarah Josn</h3>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>
            <blockquote className="text-gray-700 italic mt-4">
              “Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatum dolorem pariatur saepe esse dolores nemo at eius
              quisquam!”
            </blockquote>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="p-10 space-y-8 shadow-xl rounded-xl bg-white">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Create Your Account</h2>
            <p className="mt-1">Start your fresh journey with us today</p>
          </div>

          <div className="flex justify-between  gap-3">
            <button className="btn bg-transparent border border-gray-400/40 flex justify-center items-center gap-2 hover:bg-gray-100 w-full">
              <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
              <span>Google</span>
            </button>

            <button className="btn bg-transparent border border-gray-400/40 flex justify-center items-center gap-2 hover:bg-gray-100 w-full">
              <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
              <span>Facebook</span>
            </button>
          </div>

          <div className="relative w-full h-0.5 bg-gray-300/50">
            <span className="bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-gray-500">
              Or
            </span>
          </div>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Full Name</label>
              <input
                className="form-control border p-2 rounded-lg"
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                className="form-control border p-2 rounded-lg"
                type="email"
                id="email"
                name="email"
                placeholder="example@mail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}

              {isExistError && (
                <p className="text-red-500 text-sm">*{isExistError}</p>
              )}
            </div>

            {/* Password */}
            {/* Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                className="form-control border p-2 rounded-lg"
                type="password"
                id="password"
                name="password"
                placeholder="Create a strong password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="new-password"
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              ) : !formik.values.password ? (
                <p className="text-gray-500 text-sm">
                  Must be at least 8 characters with numbers and symbols
                </p>
              ) : null}
            </div>
            {/* password strength */}

            {formik.values.password && (
              <div className="password-strength flex items-center gap-2 mt-2">
                <div className="bar rounded-xl overflow-hidden w-full h-1 bg-gray-200">
                  <div
                    className={`progress h-1 transition-all duration-300 ${passwordFeedback.background} ${passwordFeedback.width}`}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  {passwordFeedback.text}
                </span>
              </div>
            )}

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="rePassword">Confirm Password</label>
              <input
                className="form-control border p-2 rounded-lg"
                type="password"
                id="rePassword"
                name="rePassword"
                placeholder="Confirm your password"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="new-password"
              />

              {formik.touched.rePassword && formik.errors.rePassword && (
                <p className="text-red-500 text-sm">
                  {formik.errors.rePassword}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label htmlFor="phone">Phone Number</label>
              <input
                className="form-control border p-2 rounded-lg"
                type="text"
                id="phone"
                name="phone"
                placeholder="+1234567890"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="accent-primary-600 size-5"
                checked={formik.values.terms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link to="/terms" className="text-primary-600 underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary-600 underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {formik.touched.terms && formik.errors.terms && (
              <p className="text-red-500 text-sm">{formik.errors.terms}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn bg-primary-600 text-white flex gap-2 items-center hover:bg-primary-700 w-full justify-center rounded-lg py-2"
            >
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Create My Account</span>
            </button>

            <p className="text-center pt-8 border-t border-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-600 underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
