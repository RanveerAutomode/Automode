"use client";

import { use, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import baseUrl from "../../../api/config";
import passwordEncryption from "../../../utils/passwordEncryption";

import Logo from "@/public/logos/logo.svg";
import MailOutline from "@/public/signup-page-icons/sms.svg";
import PasswordOutline from "@/public/input-icons/password-outline.svg";
import User from "@/public/signup-page-icons/user.svg";
import Buildings from "@/public/signup-page-icons/buildings-2.svg";
import Mobile from "@/public/input-icons/call-calling.svg";
import Background from "@/public/images/login/login-image1.png";
import RealTimeSync from "@/public/images/login/real-time-sync.png";

import Button from "../../../components/buttons/Button";
import Input from "../../../components/input/Input";
import CustomSelect from "../../../components/select/CustomSelect";
import Carousel from "../../../components/carousel/Carousel";
import OtpModal from "../../../components/otp-modal/OtpModal";
import axios from "axios";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { set } from "lodash";

const options = [
  { value: "textile", label: "Textile" },
  { value: "hotel", label: "Hotel" },
  { value: "travel", label: "Travel" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "others", label: "Others" },
];

interface Slide {
  id: number;
  image: StaticImageData;
  label?: string;
  supportingText?: string;
}

const CarouselSlides: Slide[] = [
  {
    id: 1,
    image: RealTimeSync,
    label: "Real-time sync",
    supportingText: "Sync your data in real-time across all devices.",
  },
  {
    id: 2,
    image: RealTimeSync,
    label: "Real-time sync",
    supportingText: "Sync your data in real-time across all devices.",
  },
  {
    id: 3,
    image: RealTimeSync,
    label: "Real-time sync",
    supportingText: "Sync your data in real-time across all devices.",
  },
  {
    id: 4,
    image: RealTimeSync,
    label: "Real-time sync",
    supportingText: "Sync your data in real-time across all devices.",
  },
];

const Signup: React.FC = () => {
  const [otpModal, setOtpModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [mobileError, setMobileError] = useState<boolean>(false);
  const host = baseUrl.baseUrl;
  const router = useRouter();

  useEffect(() => {
    const handleScroll = (e: any) => {
      if (e.target.scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const form = document.getElementById("form");
    form?.addEventListener("scroll", handleScroll);
    return () => {
      form?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .test("email", "Email already exists", function (value) {
        axios
          .post(
            `${host}/api/attempt-verification`,
            {},
            {
              params: {
                id: value,
              },
            }
          )
          .then(function (response) {
            if (response.status === 200) {
              setEmailError(false);
            }
          })
          .catch(function (error) {
            if (error && error.response) {
              if (error.response.data.status.code === 404) {
                setEmailError(true);
              }
            }
          });
        return !emailError;
      }),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,})/,
        "Password must be at least 8 characters, and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and a special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      })
      .required("Confirm Password is required"),
    mobileNo: Yup.string()
      .matches(/^\d{10}$/, "Please enter a valid mobile number")
      .required("Mobile No. is required")
      .test("mobile", "Mobile already exists", function (value) {
        axios
          .post(
            `${host}/api/attempt-verification`,
            {},
            {
              params: {
                id: value,
              },
            }
          )
          .then(function (response) {
            if (response.status === 200) {
              setMobileError(false);
            }
          })
          .catch(function (error) {
            if (error && error.response) {
              if (error.response.data.status.code === 404) {
                setMobileError(true);
              }
            }
          });
        return !mobileError;
      }),
    industry: Yup.string().required("Industry is required"),
  });

  const otpValidationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d{6}$/, "OTP must be 6 digits.")
      .required("OTP is required."),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobileNo: "",
      industry: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const encryptedPassword = passwordEncryption(values.password);
      setLoading(true);
      if (formik.isValid) {
        let currentError = formik.errors;
        axios
          .post(`${host}/api/signup`, {
            firstname: formik.values.firstName,
            lastname: formik.values.lastName,
            email: formik.values.email,
            password: encryptedPassword,
            phone_number: formik.values.mobileNo,
            industry: formik.values.industry,
          })
          .then(function (response) {
            setLoading(false);
            setOtpModal(true);
          })
          .catch(function (error) {
            setLoading(false);

            if (
              error.response.data.status.message ===
              "Account with this Phone Number and Email already exists"
            ) {
              formik.setErrors({
                ...currentError,
                email: `User ${formik.values.email} already exsits.`,
                mobileNo: `User ${formik.values.mobileNo} already exsits.`,
              });
            } else if (
              error.response.data.status.message ===
              "Account with this Phone Number already exists"
            ) {
              formik.setErrors({
                ...currentError,
                mobileNo: `User ${formik.values.mobileNo} already exsits.`,
              });
            } else if (
              error.response.data.status.message ===
              "Account with this Email already exists"
            ) {
              formik.setErrors({
                ...currentError,
                email: `User ${formik.values.email} already exsits.`,
              });
            } else {
              console.log(error);
            }
          });
      }
    },
  });

  const handleAttempt = (identifier: string) => {
    let currentErrors = formik.errors;
    let clearErrors = false;

    if (identifier) {
      if (currentErrors.email && currentErrors.mobileNo && !clearErrors) {
        clearErrors = true;
      }

      axios
        .post(
          `${host}/api/attempt-verification`,
          {},
          {
            params: {
              id: identifier,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          setEmailError(false);
          if (response.data.status.code === 404) {
            if (clearErrors) {
              clearErrors = false;
            }
            formik.setErrors({ email: response.data.status.message });
          }
        })
        .catch(function (error) {
          if (error && error.response) {
            if (error.response.data.status.code === 404) {
              if (identifier.includes("@")) {
                setEmailError(true);
              } else {
              }
            }
          }
        });
    }
  };

  const otpFormik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpValidationSchema,
    onSubmit: (values) => {},
  });

  const handleClick = () => {};

  const handleSelectChange = (selectedOption: any) => {
    formik.setFieldValue("industry", selectedOption.value);
  };

  const handleOtpSubmit = () => {
    formik.resetForm();
    router.push("dashboard");
  };

  const handleResend = () => {
    formik.handleSubmit();
  };
  return (
    <div className="flex justify-center min-[2450px]:items-center ">
      <div>
        <Image
          className="fixed left-0 hidden mobile:block tablet:block largeTablet:hidden !h-[100dvh] "
          src={Background}
          alt="background"
          width={1440}
          height={3000}
        />
      </div>

      {/* signup from */}
      <div
        className="relative mobile:min-w-[524px] h-[100dvh] max-h-[1110px] mobile:max-h-[800px] tablet:max-h-[1000px] largeTablet:max-h-[1080px] flex flex-col min-[1800px]:justify-center animated fadeIn tablet:min-w-[632px] largeTablet:min-w-[590px] max-w-[524px] tablet:max-w-[632px] 
                      largeTablet:max-w-[553px]   largeTablet:w-[787px] bg-white mobile:rounded-lg 
                      mobile:my-[80px] tablet:my-20 largeTablet:my-0 largeTablet:rounded-none mobile:shadow-xl largeTablet:shadow-none"
      >
        <div className="sticky bg-white px-4 pt-10 pb-0 mobile:p-10 mobile:pb-0 rounded-lg largeTablet:p-24 largeTablet:pt-[84px] largeTablet:pb-0 z-10 top-0 mb-8 mobile:mb-8">
          {isScrolled && (
            <div
              className={`w-full h-12 absolute bottom-[-80px] mobile:bottom-[-80px] largeTablet:bottom-[-80px] desktop:bottom-[-78px] left-0 ${
                isScrolled && "linear-gradient"
              }`}
            ></div>
          )}

          <Image
            src={Logo}
            alt="logo"
            height={31}
            className="m-auto mobile:m-0 w-[110px] mobile:w-[148px] largeTablet:w-[153px] "
          />

          <header className="mt-8  text-center mobile:!text-left mobile:mt-8 ">
            <h1 className="text-subtitle mobile:text-title tablet:text-title font-semibold text-neutral-800">
              Create an Account
            </h1>
            <p className="mt-2  text-b2 mobile:text-b1 text-neutral-500">
              Let’s get started with your 15 day free trial.
            </p>
          </header>
        </div>

        <div
          className="p-4 overflow-y-auto grow largeTablet:grow-0  !pt-0 mobile:p-10 largeTablet:p-24"
          id="form"
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-4 mb-4 mobile:flex-row">
              <Input
                type="text"
                placeholderValue="First Name"
                labelTop="First Name"
                iconLeft={User}
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                hasError={
                  (formik.touched.firstName && formik.errors.firstName) ||
                  (formik.touched.firstName && !formik.values.firstName)
                    ? formik.errors.firstName
                    : ""
                }
              />
              <Input
                type="text"
                placeholderValue="Last Name"
                labelTop="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                hasError={
                  (formik.touched.lastName && formik.errors.lastName) ||
                  (formik.touched.lastName && !formik.values.lastName)
                    ? formik.errors.lastName
                    : ""
                }
              />
            </div>
            <Input
              type="email"
              placeholderValue="Email"
              labelTop="Email"
              className="mb-4"
              iconLeft={MailOutline}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                handleAttempt(formik.values.email);
              }}
              hasError={
                (formik.touched.email && formik.errors.email) ||
                (formik.touched.email && !formik.values.email)
                  ? formik.errors.email
                  : ""
              }
            />
            <Input
              type="password"
              placeholderValue="Password"
              labelTop="Password"
              className="mb-4"
              iconLeft={PasswordOutline}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              hasError={
                (formik.touched.password && formik.errors.password) ||
                (formik.touched.password && !formik.values.password)
                  ? formik.errors.password
                  : ""
              }
            />
            <Input
              type="password"
              placeholderValue="Confirm Password"
              labelTop="Confirm Password"
              className="mb-4"
              iconLeft={PasswordOutline}
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              hasError={
                (formik.touched.confirmPassword &&
                  formik.errors.confirmPassword) ||
                (formik.touched.confirmPassword &&
                  !formik.values.confirmPassword)
                  ? formik.errors.confirmPassword
                  : ""
              }
            />
            <Input
              type="mobile"
              placeholderValue="Mobile No."
              labelTop="Mobile No."
              className="mb-4"
              iconLeft={Mobile}
              name="mobileNo"
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                handleAttempt(formik.values.mobileNo);
              }}
              hasError={
                (formik.touched.mobileNo && formik.errors.mobileNo) ||
                (formik.touched.mobileNo && !formik.values.mobileNo)
                  ? formik.errors.mobileNo
                  : ""
              }
            />
            <CustomSelect
              options={options}
              labelTop="Industry"
              iconLeft={Buildings}
              onChange={handleSelectChange}
              onBlur={() => {
                formik.setFieldTouched("industry", true);
              }}
              hasError={
                formik.touched.industry && formik.errors.industry
                  ? formik.errors.industry
                  : ""
              }
            />
            <Button
              size="md"
              type="submit"
              className="mt-6"
              onClick={handleClick}
              loading={!otpModal && loading}
            >
              Create Account
            </Button>
          </form>
          <p className="text-b2 text-neutral-600 font-medium text-center mt-8">
            Already have an account?{" "}
            <Link
              href="login"
              className="text-gradient-primary-500 cursor-pointer outline-[3px] outline-primary-50 rounded p-[2px]"
              onClick={() => {
                sessionStorage.removeItem("loginMethod");
              }}
            >
              Sign in
            </Link>
          </p>
          <p className="text-b2 text-neutral-600 text-center mt-8 mb-8">
            By selecting Sign In or Sign Up, you agree to our{" "}
            <a
              href="#"
              className="text-gradient-primary-500 cursor-pointer outline-[3px] outline-primary-50 rounded p-[2px] font-medium"
            >
              Terms & Conditions
            </a>{" "}
            and have acknowledge our{" "}
            <a
              href="#"
              className="text-gradient-primary-500 cursor-pointer outline-[3px] outline-primary-50 rounded p-[2px] font-medium"
            >
              Privacy Statement.
            </a>
          </p>
          <p className="text-b2 text-neutral-400 text-center">
            Copyright 2023 Automode
          </p>
        </div>
      </div>

      {/* carousel  */}
      <div className="min-w-[400px] w-full h-[100dvh] overflow-hidden hidden largeTablet:block">
        <Image
          className="fixed w-full object-cover"
          src={Background}
          alt="background"
        />
        <Carousel
          fullScreen
          dotsPrimary="bg-white !w-[29px]"
          dotsSecondary="bg-secondary-400"
        >
          {CarouselSlides.map((slide) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 flex flex-col justify-center items-center"
            >
              <div className="w-[500px] h-[500px] flex-shrink-0 flex justify-center">
                <Image
                  src={slide.image}
                  alt="slide"
                  className="object-contain"
                />
              </div>
              <h4 className="text-h4 text-white font-medium text-center mt-8 mb-3">
                {slide.label}
              </h4>
              <p className="text-b2 text-neutral-100 text-center mb-5">
                {slide.supportingText}
              </p>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Otp Modal  */}
      <OtpModal
        isModalOpen={otpModal}
        successVerify={handleOtpSubmit}
        handleResentClick={() => handleResend()}
        api="/api/verify-signup"
        identifier={formik.values.mobileNo}
        closeModal={() => setOtpModal(false)}
      />
    </div>
  );
};

export default Signup;
