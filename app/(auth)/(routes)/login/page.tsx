"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import baseUrl from "../../../api/config";
import axios from "axios";
import passwordEncryption from "../../../utils/passwordEncryption";

import RealTimeSync from "@/public/images/login/real-time-sync.png";
import Background from "@/public/images/login/login-image1.png";

import Logo from "@/public/logos/logo.svg";
import MailOutline from "@/public/input-icons/mail-outline.svg";
import PasswordOutline from "@/public/input-icons/password-outline.svg";
import EyeSlash from "@/public/outline-icons/eye-slash.svg";
import Eye from "@/public/outline-icons/eye.svg";
import SmsNotification from "@/public/outline-icons/sms-notification.svg";
import EmailNotification from "@/public/outline-icons/email-notification.svg";
import CallOutline from "@/public/outline-icons/call-calling.svg";
import Key from "@/public/outline-icons/key.svg";
import TickCircle from "@/public/custom-select/tick-circle.svg";
import X from "@/public/modal/x.svg";

import Button from "../../../components/buttons/Button";
import Input from "../../../components/input/Input";
import Divider from "../../../components/divider/Divider";
import Checkbox from "../../../components/checkbox/Checkbox";
import Modal from "../../../components/modal/Modal";
import OtpInput from "../../../components/otp/OtpInput";
import Carousel from "../../../components/carousel/Carousel";
import Svg from "../../../components/svg/Svg";
import RootLayout from "../../../(organization-selection)/layout";
import OtpModal from "../../../components/otp-modal/OtpModal";

const LoginPage: any = () => {
  const loginFormRef = useRef<HTMLDivElement | null>(null);
  const firstElementRef = useRef<HTMLButtonElement>(null);
  const host = baseUrl.baseUrl;

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [resendActive, setResendActive] = useState<number>(0);
  const [resendIntervalId, setResendIntervalId] =
    useState<NodeJS.Timeout | null>(null);
  const [submitError, setSubmitError] = useState<boolean | null>(null);
  const [loginMethod, setLoginMethod] = useState("password");
  const [inputMode, setInputMode] = useState("email");
  const [otpEmailInputMode, setOtpEmailInputMode] = useState("email");
  const [forgotPasswordEmailInputMode, setForgotPasswordEmailInputMode] =
    useState("email");
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] =
    useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [forgotPasswordStage, setForgotPasswordStage] = useState("email");
  const [wrongResetPasswordOtp, setWrongResetPasswordOtp] = useState("");

  useEffect(() => {
    const loginMethod = sessionStorage.getItem("loginMethod") || "password";
    setLoginMethod(loginMethod);
    // setVisible(true);
  }, []);

  useLayoutEffect(() => {
    const handleScroll = (e: any) => {
      if (e.target.scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const currentRef = loginFormRef.current;

    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const requiredString = (message: string): Yup.StringSchema<string> =>
    Yup.string().required(message);

  const matchPattern = (
    pattern: RegExp,
    message: string
  ): Yup.StringSchema<string> =>
    requiredString("This field is required").matches(pattern, message);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{10}$/;
  const otpRegex = /^\d{6}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  const emailOrPhoneNumberRegex =
    /^((\d{10})|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}))$/;

  const passwordErrorMessage =
    "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character";

  const getEmailOrPhoneSchema = (
    identifierName: string
  ): Yup.ObjectSchema<any> =>
    Yup.object().shape({
      [identifierName]: matchPattern(
        emailRegex,
        "Please enter a valid email address"
      ),
      password: matchPattern(passwordRegex, passwordErrorMessage),
    });

  const getPhoneSchema = (identifierName: string): Yup.ObjectSchema<any> =>
    Yup.object().shape({
      [identifierName]: matchPattern(
        phoneRegex,
        "Please enter a valid phone number"
      ),
      password: matchPattern(passwordRegex, passwordErrorMessage),
    });

  const getEmailOrPhoneNumberSchema = (
    identifierName: string
  ): Yup.ObjectSchema<any> =>
    Yup.object().shape({
      [identifierName]: matchPattern(
        emailOrPhoneNumberRegex,
        "Please enter a valid email address or phone number"
      ),
    });

  const getOtpSchema = (otpName: string): Yup.ObjectSchema<any> =>
    Yup.object().shape({
      [otpName]: matchPattern(otpRegex, "OTP must be 6 digits.").required(
        "OTP is required."
      ),
    });

  const getPasswordSchema = (): Yup.ObjectSchema<any> =>
    Yup.object().shape({
      newPassword: matchPattern(passwordRegex, passwordErrorMessage),
      confirmPassword: requiredString("This field is required").oneOf(
        [Yup.ref("newPassword")],
        "Passwords must match"
      ),
    });

  const emailSchema = getEmailOrPhoneSchema("identifier");
  const phoneSchema = getPhoneSchema("identifier");
  const emailValidationSchema = getEmailOrPhoneNumberSchema("otpIdentifier");
  const forgotPasswordEmailValidationSchema = getEmailOrPhoneNumberSchema(
    "forgotPasswordIdentifier"
  );
  const otpValidationSchema = getOtpSchema("otp");
  const forgotPasswordOtpValidationSchema = getOtpSchema("forgotPasswordOtp");
  const passwordValidationSchema = getPasswordSchema();

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: inputMode === "email" ? emailSchema : phoneSchema,
    onSubmit: (values) => {
      // console.log(values);

      formik.resetForm();
    },
  });

  const emailFormik = useFormik({
    initialValues: {
      otpIdentifier: "",
    },
    validationSchema: emailValidationSchema,
    onSubmit: (values) => {
      // console.log(values);
      // emailFormik.resetForm();
    },
  });

  const forgotPasswordEmailFormik = useFormik({
    initialValues: {
      forgotPasswordIdentifier: "",
    },
    validationSchema: forgotPasswordEmailValidationSchema,
    onSubmit: (values) => {
      // console.log(values);
      forgotPasswordEmailFormik.resetForm();
    },
  });

  const otpFormik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpValidationSchema,
    onSubmit: (values) => {
      // console.log("Otp submitted:", values);

      setLoading(true);
      setTimeout(() => {
        emailFormik.resetForm();
        handleModalClose();
        setLoading(false);
      }, 2000);
    },
  });

  const forgotPasswordOtpFormik = useFormik({
    initialValues: {
      forgotPasswordOtp: "",
    },
    validationSchema: forgotPasswordOtpValidationSchema,
    onSubmit: (values) => {
      // console.log("Otp submitted:", values);

      setLoading(true);
      axios
        .post(`${host}/api/forgot-password/verify`, {
          id: forgotPasswordEmailFormik.values.forgotPasswordIdentifier,
          otp: values.forgotPasswordOtp,
        })
        .then(function (response) {
          if (response.data.status.type === "success") {
            setForgotPasswordStage("resetPassword");
            localStorage.setItem("resetPasswordToken", response.data.token);
          }
          setLoading(false);
        })
        .catch(function (error) {
          // console.log(error);
          setSubmitError(true);
          setWrongResetPasswordOtp(error.response.data.status.message);
          setLoading(false);
        });

      // setTimeout(() => {
      //   // handleForgotPasswordModalClose();
      //   setForgotPasswordStage("resetPassword");
      //   setLoading(false);
      // }, 2000);
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => {
      // console.log(values);

      passwordFormik.resetForm();
    },
  });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // const onlyNumbersRegex = /^(\+)?[0-9]*$/;
    let newValue = value;

    if (value.length >= 3) {
      if (/^[0-9]+$/.test(value)) {
        setInputMode("mobile");
      } else {
        setInputMode("email");
      }
    } else if (value.length === 0) {
      setInputMode("email");
    }

    formik.setFieldValue("identifier", newValue, false);

    try {
      const schemaToUse = inputMode === "email" ? emailSchema : phoneSchema;
      await schemaToUse.validateAt("identifier", { identifier: newValue });
      // If it reaches here, it is valid. Clear the error.
      formik.setFieldError("identifier", undefined);
    } catch (err: any) {
      // If it reaches here, it is invalid. Set the error.
      if (err instanceof Yup.ValidationError) {
        formik.setFieldError("identifier", err.message);
      }
    }
  };

  const handleOtpEmailInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    // const onlyNumbersRegex = /^(\+)?[0-9]*$/;
    let newValue = value;

    if (value.length >= 3) {
      if (/^[0-9]+$/.test(value)) {
        setOtpEmailInputMode("mobile");
      } else {
        setOtpEmailInputMode("email");
      }
    } else if (value.length === 0) {
      setOtpEmailInputMode("email");
    }

    emailFormik.setFieldValue("otpIdentifier", newValue, false);

    try {
      await emailValidationSchema.validate({ otpIdentifier: newValue });
      // If it reaches here, it is valid. Clear the error.
      emailFormik.setFieldError("otpIdentifier", undefined);
    } catch (err) {
      // If it reaches here, it is invalid. Set the error.
      if (err instanceof Yup.ValidationError) {
        emailFormik.setFieldError("otpIdentifier", err.message);
      }
    }
  };

  const handleForgotPasswordEmailInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const onlyNumbersRegex = /^(\+)?[0-9]*$/;
    let newValue = value;

    if (value.length >= 3) {
      if (/^[0-9]+$/.test(value)) {
        setForgotPasswordEmailInputMode("mobile");
      } else {
        setForgotPasswordEmailInputMode("email");
      }
    } else if (value.length === 0) {
      setForgotPasswordEmailInputMode("email");
    }

    forgotPasswordEmailFormik.setFieldValue(
      "forgotPasswordIdentifier",
      newValue,
      false
    );

    try {
      await forgotPasswordEmailValidationSchema.validateAt(
        "forgotPasswordIdentifier",
        { forgotPasswordIdentifier: newValue }
      );
      // If it reaches here, it is valid. Clear the error.
      forgotPasswordEmailFormik.setFieldError(
        "forgotPasswordIdentifier",
        undefined
      );
    } catch (err) {
      // If it reaches here, it is invalid. Set the error.
      if (err instanceof Yup.ValidationError) {
        forgotPasswordEmailFormik.setFieldError(
          "forgotPasswordIdentifier",
          err.message
        );
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    formik.setFieldTouched("identifier");
    formik.setFieldTouched("password");
    const errors = await formik.validateForm();
    if (!errors.identifier && !errors.password) {
      const encryptedPassword = passwordEncryption(formik.values.password);
      // remove this on production
      router.push("/dashboard");
      axios
        .post(`${host}/api/login`, {
          id: formik.values.identifier,
          password: encryptedPassword,
        })
        .then(function (response) {
          localStorage.setItem("isLoggedIn", "true");
          router.push("/dashboard");
          setLoading(false);
        })
        .catch(function (error) {
          if (error.response) {
            if (
              error.response.data.status.message === "Username is incorrect."
            ) {
              formik.setErrors({
                identifier: error.response.data.status.message,
                password: "",
              });
            } else if (
              error.response.data.status.message === "Password is incorrect."
            ) {
              formik.setErrors({
                identifier: "",
                password: error.response.data.status.message,
              });
            } else {
              console.log(error);
            }
          }

          // setLoading(false);
          // enable in production and remove above
        });
    } else {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    emailFormik.setFieldTouched("otpIdentifier");
    const errors = await emailFormik.validateForm();
    if (!errors.otpIdentifier) {
      axios
        .post(
          `${host}/api/otp-login`,
          {},
          {
            params: {
              id: emailFormik.values.otpIdentifier,
            },
          }
        )
        .then(function (response) {
          // console.log(response);
          setLoading(false);
          setIsLoginModalVisible(true);
        })
        .catch(function (error) {
          // console.log(error);
          emailFormik.errors.otpIdentifier = error.response.data.status.message;
          setLoading(false);
        });

      // setTimeout(() => {
      //   emailFormik.handleSubmit();
      //   setIsLoginModalVisible(true);
      //   setLoading(false);
      // }, 2000);
    } else {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(false);
    otpFormik.setFieldTouched("otp");
    const errors = await otpFormik.validateForm();
    if (!errors.otp) {
      otpFormik.handleSubmit();
      emailFormik.resetForm();
      setIsLoginModalVisible(false);
    } else {
      setSubmitError(true);
    }
  };

  const handleForgotPasswordEmailSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitError(false);
    setLoading(true);
    forgotPasswordEmailFormik.setFieldTouched("forgotPasswordIdentifier");
    const errors = await forgotPasswordEmailFormik.validateForm();

    axios
      .get(`${host}/api/forgot-password`, {
        params: {
          id: forgotPasswordEmailFormik.values.forgotPasswordIdentifier,
        },
      })
      .then(function (response) {
        // console.log(response);
        setLoading(false);
        if (response.data.status.type === "success") {
          setForgotPasswordStage("otp");
        }
        // setIsForgotPasswordModalVisible(true);
      })
      .catch(function (error) {
        // console.log(error);
        forgotPasswordEmailFormik.errors.forgotPasswordIdentifier =
          error.response.data.status.message;
        setLoading(false);
      });

    // if (!errors.forgotPasswordIdentifier) {
    //   setTimeout(() => {
    //     forgotPasswordEmailFormik.handleSubmit();
    //     setForgotPasswordStage("otp");
    //     setLoading(false);
    //   }, 2000);
    // } else {
    //   setSubmitError(true);
    //   setLoading(false);
    // }
  };

  const handleForgotPasswordOtpSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (loading) return;
    setSubmitError(false);
    forgotPasswordOtpFormik.setFieldTouched("forgotPasswordOtp");
    const errors = await forgotPasswordOtpFormik.validateForm();
    if (!errors.forgotPasswordOtp) {
      forgotPasswordOtpFormik.handleSubmit();
      setForgotPasswordStage("resetPassword");
    } else {
      setSubmitError(true);
    }
  };

  const handleNewPasswordSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitError(false);
    setLoading(true);
    passwordFormik.setFieldTouched("newPassword");
    passwordFormik.setFieldTouched("confirmPassword");
    const errors = await passwordFormik.validateForm();
    if (!errors.newPassword && !errors.confirmPassword) {
      const encryptedResetPassword = passwordEncryption(
        passwordFormik.values.newPassword
      );
      axios
        .put(
          `${host}/api/reset-password`,
          {
            id: forgotPasswordEmailFormik.values.forgotPasswordIdentifier,
            password: encryptedResetPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "resetPasswordToken"
              )}`,
            },
          }
        )
        .then(function (response) {
          setLoading(false);
          if (response.data.status.type === "success") {
            setForgotPasswordStage("resetSuccess");
            localStorage.removeItem("resetPasswordToken");
          }
        })
        .catch(function (error) {
          setSubmitError(true);
          passwordFormik.setErrors({
            newPassword: " ",
            confirmPassword: error.response.data.status.message,
          });
          setLoading(false);
        });
      //   setTimeout(() => {
      //     passwordFormik.handleSubmit();
      //     setForgotPasswordStage("resetSuccess");
      //     setLoading(false);
      //   }, 2000);
      // } else {
      //   setSubmitError(true);
      //   setLoading(false);
    }
  };

  const handleOtpChange = async (otp: string) => {
    otpFormik.setFieldValue("otp", otp, false);

    if (otp.length === 6) {
      const error = await otpFormik.validateField("otp");
      if (!error) {
        otpFormik.handleSubmit();
      }
    }
  };

  const handleForgotPasswordOtpChange = async (otp: string) => {
    forgotPasswordOtpFormik.setFieldValue("forgotPasswordOtp", otp, false);

    if (otp.length === 6) {
      const error = await forgotPasswordOtpFormik.validateField(
        "forgotPasswordOtp"
      );
      if (!error) {
        forgotPasswordOtpFormik.handleSubmit();
      }
    }
  };

  const handleResendOtp = () => {
    setCodeSent(true);
    setResendActive(30);

    const intervalId = setInterval(() => {
      setResendActive((resendActive) => resendActive - 1);
    }, 1000);

    setResendIntervalId(intervalId);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 30000);
  };

  const handleOtpClick = () => {
    if (loginFormRef.current) {
      loginFormRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    sessionStorage.setItem("loginMethod", "otp");
    setLoginMethod("otp");
    emailFormik.resetForm();
    firstElementRef.current?.focus();
  };

  const handlePasswordClick = () => {
    if (loginFormRef.current) {
      loginFormRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setLoginMethod("password");
    sessionStorage.setItem("loginMethod", "password");
    formik.resetForm();
    firstElementRef.current?.focus();
  };

  const handleModalClose = () => {
    setIsLoginModalVisible(false);
    setOtpEmailInputMode("email");
    setCodeSent(false);
    otpFormik.resetForm();
    setResendActive(0);
    setSubmitError(null);

    if (resendIntervalId) {
      clearInterval(resendIntervalId);
    }
  };

  const handleForgotPasswordModalCloseWithoutLogin = () => {
    setIsForgotPasswordModalVisible(false);
    setCodeSent(false);
    setForgotPasswordStage("email");
    setForgotPasswordEmailInputMode("email");
    setResendActive(0);
    forgotPasswordEmailFormik.resetForm();
    forgotPasswordOtpFormik.resetForm();
    passwordFormik.resetForm();
    setSubmitError(null);
    setSubmitError(false);
    setWrongResetPasswordOtp("");

    if (resendIntervalId) {
      clearInterval(resendIntervalId);
    }
  };

  const handleForgotPasswordModalClose = () => {
    setIsForgotPasswordModalVisible(false);
    setCodeSent(false);
    setForgotPasswordStage("email");
    setForgotPasswordEmailInputMode("email");
    setResendActive(0);
    forgotPasswordEmailFormik.resetForm();
    forgotPasswordOtpFormik.resetForm();
    passwordFormik.resetForm();
    setSubmitError(null);
    setSubmitError(false);
    setWrongResetPasswordOtp("");

    if (resendIntervalId) {
      clearInterval(resendIntervalId);
    }
    if (forgotPasswordStage === "resetSuccess") {
      router.push("/dashboard");
    }
  };

  interface Slide {
    id: number;
    image: StaticImageData;
    label?: string;
    supportingText?: string;
  }

  const gradient = {
    id: "myGradient",
    colors: ["#5f27cd", "#0476f7"],
    direction: "horizontal" as const,
  };

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

  const handleLogin = () => {
    // axios.post(`${host}/api/login`, {
    //   id: 7877763051,
    //   password: "gAAAAABkkCV2UKEqYLKIAl5entrseUtwiToBpoM8EYjhNi8rTnSoI0S9w9kmGwxVX4nawqkYltIqKXlQhGYBq_MpLtMB1IbbUA==",
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   }
    //   )
    //   .catch(function (error) {
    //     console.log(error);
    //   }
    //   );
    // setLoading(true);
    // formik.setFieldTouched("identifier");
    // formik.setFieldTouched("password");
    // const errors = await formik.validateForm();
    // if (!errors.identifier && !errors.password) {
    //   setTimeout(() => {
    //     formik.handleSubmit();
    //     setInputMode("email");
    //     setLoading(false);
    //     localStorage.setItem("isLoggedIn", "true");
    //   }
    //   , 2000);
    // } else {
    //   setLoading(false);
    // }
  };

  //   const CryptoJS = require('crypto-js');
  // const { enc } = require('crypto-js');
  // const WordArray = CryptoJS.lib.WordArray;

  // const key = CryptoJS.enc.Hex.parse("47089c0b3fd0ba898cfd89cfa6b1de5a1bbd324cebd17a72f53c7df20cf8cf47"); // 128-bit key
  // let iv;

  // function encryptMessage(message: string, key: InstanceType<typeof WordArray>) {
  //   iv = CryptoJS.lib.WordArray.random(16); // 128-bit IV

  //   const encrypted = CryptoJS.AES.encrypt(message, key, { iv: iv });
  //   const encryptedMessage = iv.concat(encrypted.ciphertext).toString(enc.Base64);

  //   return encryptedMessage;
  // }

  // return visible ? (
  return (
    <>
      <button
        ref={firstElementRef}
        tabIndex={0}
        className="absolute left-[-9999px] focus:outline-none"
      />
      <div className="flex justify-center min-[2450px]:items-center">
        <div>
          <Image
            className="fixed left-0 hidden mobile:block tablet:block largeTablet:hidden !h-[100dvh]"
            src={Background}
            alt="background"
            width={1440}
            height={2000}
          />
        </div>
        {/* Login Form */}
        <div
          className="relative mobile:min-w-[524px] h-[100dvh] max-h-[850px] flex flex-col min-[1800px]:justify-center animated fadeIn tablet:min-w-[632px] largeTablet:min-w-[590px] max-w-[524px] tablet:max-w-[632px] 
                      largeTablet:max-w-[553px]   largeTablet:w-[787px] bg-white mobile:rounded-lg 
                      mobile:my-[80px] tablet:my-20 largeTablet:my-0 largeTablet:rounded-none mobile:shadow-xl largeTablet:shadow-none"
        >
          <div className="sticky bg-white px-4 mobile:px-10 pt-16 pb-0 p-10 mobile:pb-0 rounded-lg largeTablet:p-24 largeTablet:pt-[120px] largeTablet:pb-0 z-10 top-0 mb-8 mobile:mb-8">
            {isScrolled && (
              <div
                className={`w-full h-12 absolute bottom-[-80px] mobile:bottom-[-80px] largeTablet:bottom-[-80px] desktop:bottom-[-78px] left-0 ${
                  isScrolled && "linear-gradient"
                }`}
              ></div>
            )}
            <div className="m-auto mobile:ms-0 max-w-[153px] max-h-[33px] h-full w-full">
              <Image
                src={Logo}
                alt="logo"
                // width={153}
                height={33}
              />
            </div>
            <header className="mt-8 text-center mobile:!text-left largeTablet:mt-12 ">
              <h1 className="text-subtitle mobile:text-title font-semibold text-neutral-800">
                Sign in to your Account
              </h1>
              <p className="mt-2  text-b2 mobile:text-b1 text-neutral-500">
                Welcome back! Select method to log in.
              </p>
            </header>
          </div>
          <div
            className="p-4 overflow-y-auto grow largeTablet:grow-0 !pt-0 mobile:p-10 largeTablet:p-24 largeTablet:pb-0"
            ref={loginFormRef}
          >
            {loginMethod === "password" && (
              <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <div className="mb-6">
                    <div className="mb-6">
                      <div className="mb-6">
                        <Input
                          iconLeft={
                            inputMode === "email" ? MailOutline : CallOutline
                          }
                          onChange={handleInputChange}
                          type="emailMobile"
                          name="identifier"
                          placeholderValue={
                            inputMode === "email" ? "Email" : "Mobile Number"
                          }
                          labelTop={
                            inputMode === "email"
                              ? "Email or Mobile No."
                              : "Mobile Number"
                          }
                          value={formik.values.identifier}
                          hasError={
                            (formik.touched.identifier &&
                              formik.errors.identifier) ||
                            (formik.touched.identifier &&
                              !formik.values.identifier)
                              ? formik.errors.identifier
                              : ""
                          }
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <div>
                        <Input
                          onChange={formik.handleChange}
                          iconLeft={PasswordOutline}
                          type="password"
                          name="password"
                          placeholderValue="Password"
                          labelTop="Password"
                          value={formik.values.password}
                          hasError={
                            (formik.touched.password &&
                              formik.errors.password) ||
                            (formik.touched.password && !formik.values.password)
                              ? formik.errors.password
                              : ""
                          }
                          onBlur={formik.handleBlur}
                          id="password"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Checkbox
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                            }
                          }}
                          label="Remember me"
                        />
                      </div>
                      <div>
                        <a
                          href="#"
                          tabIndex={0}
                          onClick={() => setIsForgotPasswordModalVisible(true)}
                          className="text-b2 font-medium cursor-pointer text-gradient-primary-500 outline-[3px] outline-primary-50 rounded p-[2px]"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setIsForgotPasswordModalVisible(true);
                            }
                          }}
                        >
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    {loginMethod !== null && (
                      <Button
                        loading={!isForgotPasswordModalVisible && loading}
                        type="submit"
                        size="md"
                        onClick={handleLogin}
                      >
                        {" "}
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            )}
            {loginMethod === "otp" && (
              <form onSubmit={handleEmailSubmit}>
                <div className="mb-8">
                  <div className="mb-4">
                    <Input
                      iconLeft={
                        otpEmailInputMode === "email"
                          ? MailOutline
                          : CallOutline
                      }
                      onChange={handleOtpEmailInputChange}
                      type="emailMobile"
                      name="otpIdentifier"
                      placeholderValue={
                        otpEmailInputMode === "email" ? "Email" : "Phone Number"
                      }
                      labelTop={
                        otpEmailInputMode === "email"
                          ? "Email or Mobile No."
                          : "Phone Number"
                      }
                      value={emailFormik.values.otpIdentifier}
                      hasError={
                        (emailFormik.touched.otpIdentifier &&
                          emailFormik.errors.otpIdentifier) ||
                        (emailFormik.touched.otpIdentifier &&
                          !emailFormik.values.otpIdentifier)
                          ? emailFormik.errors.otpIdentifier
                          : ""
                      }
                      onBlur={emailFormik.handleBlur}
                      id="otpIdentifier"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  {loginMethod !== null && (
                    <Button
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          (e: React.FormEvent<HTMLFormElement>) =>
                            handleEmailSubmit(e);
                        }
                      }}
                      type="submit"
                      size="md"
                      loading={!isLoginModalVisible && loading}
                    >
                      {" "}
                      Get an OTP
                    </Button>
                  )}
                </div>
              </form>
            )}
            <div className="mb-8">
              <div className="mb-4">
                <Divider className="text-b2" centerText="or" />
              </div>
              <div className="">
                <Button
                  ghost
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      loginMethod === "password"
                        ? handleOtpClick()
                        : handlePasswordClick();
                    }
                  }}
                  onClick={
                    loginMethod === "password"
                      ? handleOtpClick
                      : handlePasswordClick
                  }
                  size="md"
                  color="secondary"
                >
                  {loginMethod === "password"
                    ? "Sign in via OTP"
                    : "Sign in via Password"}
                </Button>
              </div>
            </div>
            <div className="text-center mb-8">
              <p className="text-b2 font-medium text-neutral-600">
                Dont have and account?{" "}
                <Link
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push("/signup");
                    }
                  }}
                  href="/signup"
                  className="text-gradient-primary-500 cursor-pointer outline-[3px] outline-primary-50 rounded p-[2px]"
                >
                  Create an account
                </Link>
              </p>
            </div>
            <div className="text-center pb-10">
              <p className="text-b2 text-neutral-600 mb-8">
                By selecting Sign In or Sign Up, you agree to our{" "}
                <a
                  href="#"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                    }
                  }}
                  className="text-gradient-primary-500 font-medium cursor-pointer outline-[3px] outline-primary-50 rounded p-[2px]"
                >
                  Terms & Conditions
                </a>{" "}
                and have acknowledge our{" "}
                <a
                  href="#"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                    }
                  }}
                  className="text-gradient-primary-500 font-medium cursor-pointer outline-[3px] outline-primary-50 rounded p-[2px]"
                >
                  Privacy Statement.
                </a>
              </p>
              <div className="text-neutral-400 text-b2">
                Copyright 2023 AutomodeAI Consulting Pvt. Ltd.
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
        <div className="min-w-[400px] w-full h-[100dvh] overflow-hidden hidden largeTablet:block">
          <Image
            className="fixed w-full object-cover"
            src={Background}
            alt="background"
            // fill
          />
          {/* <div className="h-[100dvh] fixed min-[1980px]:w-full min-[1980px]:relative flex items-center"> */}
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
                {/* <div className="flex justify-center mt-2 items-center">
          {CarouselSlides.map((_, index) => (
            <div
              key={index}
              className={`w-[10px] h-[10px] mx-1 rounded-full ease-in-out duration-[1000ms] ${
                currentSlide % CarouselSlides.length === index
                  ? `bg-white !w-[29px]`
                  : `bg-secondary-400`
              }`}
            />
          ))}
        </div> */}
              </div>
            ))}
          </Carousel>
          {/* </div> */}
        </div>
        {isLoginModalVisible && (
          <OtpModal
            isModalOpen={isLoginModalVisible}
            successVerify={() => {
              router.push("/profile");
              emailFormik.resetForm();
            }}
            api="/api/verify-otp"
            identifier={emailFormik.values.otpIdentifier}
            closeModal={() => {
              setIsLoginModalVisible(false);
            }}
          />
        )}
        {/* {isLoginModalVisible && (
          <Modal
            isOpen={isLoginModalVisible}
            closeModal={handleModalClose}
            hasError={submitError}
            className="min-w-[320px] max-w-[400px] tablet:max-w-[400px]"
          >
            <>
              <form
                onSubmit={handleOtpSubmit}
                // className="max-w-[352px] w-[230px] min-[300px]:w-[288px] tablet:w-[352px] text-center"
              >
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-100 to-blue-100 flex items-center justify-center m-auto mb-5">
                    <div className="p-2 rounded-full bg-gradient-to-r from-primary-50 to-blue-50">
                      <Svg
                        height={24}
                        width={24}
                        icon={
                          otpEmailInputMode === "email"
                            ? SmsNotification
                            : EmailNotification
                        }
                        gradient={gradient}
                        // color="text-primary-500"
                        alt="icon"
                      />
                    </div>
                  </div>
                  <p className="text-subtitle text-neutral-700 font-semibold mb-2">
                    Please check your{" "}
                    {otpEmailInputMode === "email" ? "Email" : "SMS"}
                  </p>
                  <p className="text-b2 text-neutral-600 mb-6">
                    We’ve {codeSent ? "resent" : "sent"} a code to{" "}
                    {otpEmailInputMode === "email"
                      ? "vickbishnoi@gmail.com"
                      : "+918112215727"}
                  </p>
                </div>
                <div className="mb-6">
                  <div className="mb-2">
                    <OtpInput
                      // size="xl"
                      onOtpChange={(otp) => handleOtpChange(otp)}
                      hasError={otpFormik.errors.otp}
                      // className="tablet:w-[72px] tablet:h-[72px]"
                      customSizeClass="w-[40px] h-[40px] tablet:w-[48px] tablet:h-[48px]"
                      name="otp"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  {resendActive === 0 ? (
                    <div className="font-medium text-b2 mb-6">
                      Didn’t get a code?{" "}
                      <span
                        onClick={() => {
                          if (!loading) handleResendOtp();
                        }}
                        className={`text-primary-500 ${
                          loading ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        Click to resend.
                      </span>
                    </div>
                  ) : (
                    <p className="text-b2 text-neutral-500 font-medium mt-6">
                      Resend code will be available after{" "}
                      <span className="text-neutral-700">
                        {resendActive} Seconds.
                      </span>
                    </p>
                  )}
                </div>
                <div className="flex flex-col-reverse tablet:flex-row gap-3 mt-6">
                  <Button
                    onClick={handleModalClose}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleModalClose();
                      }
                    }}
                    size="md"
                    ghost
                    color="secondary"
                    className={`${
                      loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    disabled={loading}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button loading={loading} type="submit" size="md">
                    Verify
                  </Button>
                </div>
              </form>
            </>
          </Modal>
        )} */}
        {isForgotPasswordModalVisible && (
          <Modal
            isOpen={isForgotPasswordModalVisible}
            closeModal={handleForgotPasswordModalClose}
            hasError={submitError}
            className="min-w-[320px] max-w-[400px] tablet:max-w-[400px]"
          >
            <div className="relative text-center">
              <div className="flex flex-col items-center justify-center w-full">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-100 to-blue-100 flex items-center justify-center m-auto mb-5">
                  <div className="p-2 rounded-full bg-gradient-to-r from-primary-50 to-blue-50">
                    <Svg
                      height={24}
                      width={24}
                      icon={
                        forgotPasswordStage === "resetSuccess"
                          ? TickCircle
                          : forgotPasswordStage === "otp"
                          ? forgotPasswordEmailInputMode === "email"
                            ? SmsNotification
                            : EmailNotification
                          : Key
                      }
                      // color={
                      //   "text-primary-500"
                      //   // forgotPasswordStage === "resetSuccess"
                      //   //   ? "text-primary-500"
                      //   //   : forgotPasswordStage === "otp"
                      //   //   ? "text-primary-500"
                      //   //   : "text-primary-700"
                      // }
                      gradient={gradient}
                      alt="icon"
                    />
                  </div>
                </div>
                <p className="text-subtitle text-neutral-700 font-semibold mb-2">
                  {forgotPasswordStage === "email" && "Forgot Password"}
                  {forgotPasswordStage === "otp" &&
                    (forgotPasswordEmailInputMode === "email"
                      ? "Please check your Email"
                      : "Please check your SMS")}
                  {forgotPasswordStage === "resetPassword" &&
                    "Set a new password"}
                  {forgotPasswordStage === "resetSuccess" &&
                    "Password Reset Successful"}
                </p>
                <p className="text-b2 text-neutral-600 mb-6">
                  {forgotPasswordStage === "email" &&
                    "No worries, we’ll send you reset instructions."}
                  {forgotPasswordStage === "otp" &&
                    (forgotPasswordEmailInputMode === "email"
                      ? `${
                          codeSent
                            ? `We've resent a code to ${forgotPasswordEmailFormik.values.forgotPasswordIdentifier}`
                            : `We’ve sent a code to ${forgotPasswordEmailFormik.values.forgotPasswordIdentifier}`
                        }`
                      : `${
                          codeSent
                            ? `We've resent an OTP to +91 ${forgotPasswordEmailFormik.values.forgotPasswordIdentifier}`
                            : `We’ve sent an OTP to +91 ${forgotPasswordEmailFormik.values.forgotPasswordIdentifier}`
                        }`)}
                  {forgotPasswordStage === "resetPassword" &&
                    "Your new password must be different to previously used password."}
                  {forgotPasswordStage === "resetSuccess" &&
                    "Your password has been successfully reset. Click below to log in and feel the automation."}
                </p>
              </div>
              {forgotPasswordStage === "email" && (
                <>
                  <form onSubmit={handleForgotPasswordEmailSubmit}>
                    <div className="mb-6">
                      <Input
                        id="forgotPasswordIdentifier"
                        iconLeft={
                          forgotPasswordEmailInputMode === "email"
                            ? MailOutline
                            : CallOutline
                        }
                        onChange={handleForgotPasswordEmailInputChange}
                        type="emailMobile"
                        name="forgotPasswordIdentifier"
                        placeholderValue={
                          forgotPasswordEmailInputMode === "email"
                            ? "Email"
                            : "Phone Number"
                        }
                        labelTop={
                          forgotPasswordEmailInputMode === "email"
                            ? "Email or Mobile No."
                            : "Phone Number"
                        }
                        value={
                          forgotPasswordEmailFormik.values
                            .forgotPasswordIdentifier
                        }
                        hasError={
                          (forgotPasswordEmailFormik.touched
                            .forgotPasswordIdentifier &&
                            forgotPasswordEmailFormik.errors
                              .forgotPasswordIdentifier) ||
                          (forgotPasswordEmailFormik.touched
                            .forgotPasswordIdentifier &&
                            !forgotPasswordEmailFormik.values
                              .forgotPasswordIdentifier)
                            ? forgotPasswordEmailFormik.errors
                                .forgotPasswordIdentifier
                            : ""
                        }
                        onBlur={forgotPasswordEmailFormik.handleBlur}
                      />
                    </div>
                    <div>
                      <Button loading={loading} type="submit" size="md">
                        Continue
                      </Button>
                    </div>
                  </form>
                </>
              )}
              {forgotPasswordStage === "otp" && (
                <>
                  <form onSubmit={handleForgotPasswordOtpSubmit}>
                    <div className="mb-6">
                      <OtpInput
                        // size="md"
                        onOtpChange={(otp) =>
                          handleForgotPasswordOtpChange(otp)
                        }
                        // onBlur={handleOtpBlur}
                        hasError={
                          forgotPasswordOtpFormik.errors.forgotPasswordOtp ||
                          wrongResetPasswordOtp
                        }
                        // className="tablet:w-[72px] tablet:h-[72px]"
                        customSizeClass="w-[40px] h-[40px] tablet:w-[48px] tablet:h-[48px]"
                        name="forgotPasswordOtp"
                      />
                    </div>
                    <div>
                      <div className="mb-6">
                        {resendActive === 0 ? (
                          <div className="font-medium text-b2 mb-6">
                            Didn’t get a code?{" "}
                            <span
                              onClick={(e: any) => {
                                if (!loading) handleResendOtp();
                                handleForgotPasswordEmailSubmit(e);
                              }}
                              className={`text-primary-500 ${
                                loading
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                            >
                              Click to resend.
                            </span>
                          </div>
                        ) : (
                          <p className="text-b2 text-neutral-500 font-medium mt-6">
                            Resend code will be available after{" "}
                            <span className="text-neutral-700">
                              {resendActive} Seconds.
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col-reverse tablet:flex-row gap-3 mt-6">
                      <Button
                        onClick={handleForgotPasswordModalClose}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleForgotPasswordModalClose();
                          }
                        }}
                        size="md"
                        ghost
                        color="secondary"
                        className={`${
                          loading ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                        disabled={loading}
                        type="button"
                      >
                        Cancel
                      </Button>
                      <Button
                        // onClick={handleForgotPasswordOtpVerify}
                        type="submit"
                        loading={loading}
                        size="md"
                      >
                        Verify
                      </Button>
                    </div>
                  </form>
                </>
              )}
              {forgotPasswordStage === "resetPassword" && (
                <>
                  <form onSubmit={handleNewPasswordSubmit} className="mb-6">
                    <div className="mb-6">
                      <Input
                        id="newPassword"
                        onChange={passwordFormik.handleChange}
                        iconLeft={PasswordOutline}
                        type="password"
                        name="newPassword"
                        placeholderValue="Password"
                        labelTop="Password"
                        value={passwordFormik.values.newPassword}
                        hasError={
                          (passwordFormik.touched.newPassword &&
                            passwordFormik.errors.newPassword) ||
                          (passwordFormik.touched.newPassword &&
                            !passwordFormik.values.newPassword)
                            ? passwordFormik.errors.newPassword
                            : ""
                        }
                        onBlur={passwordFormik.handleBlur}
                      />
                    </div>
                    <div className="mb-6">
                      <Input
                        id="confirmPassword"
                        onChange={passwordFormik.handleChange}
                        iconLeft={PasswordOutline}
                        type="password"
                        name="confirmPassword"
                        placeholderValue="Confirm Password"
                        labelTop="Confirm Password"
                        value={passwordFormik.values.confirmPassword}
                        hasError={
                          (passwordFormik.touched.confirmPassword &&
                            passwordFormik.errors.confirmPassword) ||
                          (passwordFormik.touched.confirmPassword &&
                            !passwordFormik.values.confirmPassword)
                            ? passwordFormik.errors.confirmPassword
                            : ""
                        }
                        onBlur={passwordFormik.handleBlur}
                      />
                    </div>
                    <div>
                      <Button loading={loading} type="submit" size="md">
                        Continue
                      </Button>
                    </div>
                  </form>
                </>
              )}
              {forgotPasswordStage === "resetSuccess" && (
                <>
                  <div>
                    <Button
                      onClick={handleForgotPasswordModalClose}
                      type="submit"
                      size="md"
                    >
                      Continue
                    </Button>
                  </div>
                </>
              )}
              {forgotPasswordStage !== "otp" && (
                <div
                  onClick={() => {
                    if (!loading) handleForgotPasswordModalCloseWithoutLogin();
                  }}
                  className="absolute top-1 right-1"
                >
                  <Image
                    src={X}
                    width={20}
                    height={20}
                    alt="close"
                    className={`cursor-pointer ${
                      loading && "!cursor-not-allowed"
                    }`}
                  />
                </div>
              )}
            </div>
          </Modal>
        )}
      </div>
    </>
    // ) : (
    //   <div></div>
  );
};

export default LoginPage;
