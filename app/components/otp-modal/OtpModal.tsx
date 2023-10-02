import Image from "next/image";
import Modal from "../modal/Modal";
import OtpInput from "../otp/OtpInput";
import Button from "../buttons/Button";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import baseUrl from "../../api/config";

import MobileIcon from "@/public/outline-icons/sms-notification.svg";

type Props = {
  isModalOpen: boolean;
  closeModal: (confirmed: boolean) => void;
  // values?: any;
  successVerify?: () => void;
  api?: string;
  identifier?: string;
  handleResentClick?: () => void;
  sample?: boolean;
};

const OtpModal: React.FC<Props> = ({
  isModalOpen,
  closeModal,
  successVerify,
  api,
  identifier,
  handleResentClick,
  sample,
}) => {
  const [otpModal, setOtpModal] = useState(false);
  const [modalError, setModalError] = useState<boolean | null>(null);
  const [wrongOtpError, setWrongOtpError] = useState<string>("");
  const [resend, setResend] = useState(false);
  const [resendActive, setResendActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [zoomInAnimation, setZoomInAnimation] = useState<boolean>(false);
  const [typeOfIdentifier, setTypeOfIdentifier] = useState<string>("");
  const host = baseUrl.baseUrl;

  useEffect(() => {
    setOtpModal(isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    if (identifier?.includes("@")) {
      setTypeOfIdentifier("email");
    }
    else {
      setTypeOfIdentifier("mobile");
    }
  }
  , [identifier]);

  useEffect(() => {
    setZoomInAnimation(true);

    setTimeout(() => {
      setZoomInAnimation(false);
    }, 4000);
  }, [otpModal]);

  const otpValidationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d{6}$/, "OTP must be 6 digits.")
      .required("OTP is required."),
  });

  const otpFormik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpValidationSchema,
    onSubmit: (values) => {},
  });

  const handleOtpVerify = async () => {
    if (otp.length === 6) {
      setLoading(true);
      if (sample) {
        setTimeout(() => {
        setLoading(false);
        setOtpModal(false);
        closeModal(true);
        }, 2000);
        
        setResend(false);
        return;
      }

      axios
        .post(`${host}${api}`, {
          id: identifier,
          otp: otp,
        })
        .then(function (response) {
          if (response.data.status.code === 200) {
            successVerify && successVerify();
            setLoading(false);
            setOtpModal(false);
            setResend(false);
          }
        })
        .catch(function (error) {
          // console.log(error)
          setWrongOtpError(error.response.data.status.message);
          setModalError(true);
          setLoading(false);
        });
    }

    otpFormik.setFieldValue("otp", otp);
    setModalError(false);
    const errors = await otpFormik.validateForm();
    if (errors.otp) {
      setModalError(true);
      return;
    }
    if (otp.length < 6) {
      return;
    }
  };

  const handleOtpChange = (otp: string) => {
    otpFormik.setErrors({});
    setWrongOtpError("");
    setModalError(false);

    setOtp(otp);
    if (otp.length === 6) {
      otpFormik.setFieldValue("otp", otp);
    }
  };

  const handleResendOtp = () => {
    if (loading) {
      return;
    }
    setResend(true);
    setResendActive(30);
    const interval = setInterval(() => {
      setResendActive((resendActive) => resendActive - 1);
    }, 1000);

    setIntervalId(interval);

    setTimeout(() => {
      clearInterval(interval);
    }, 30000);
  };

  const handleModalClose = () => {
    setModalError(null);
    setWrongOtpError("");
    otpFormik.setErrors({});
    setResend(false);
    if (intervalId) {
      clearInterval(intervalId);
      setResendActive(0);
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    closeModal(false);
  };

  return (
    <Modal
      isOpen={otpModal}
      hasError={modalError}
      // className={`${zoomInAnimation && "zoomIn"}`}
    >
      <div className=" !w-max min-[300px]:w-[288px] tablet:w-[352px] text-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-100 to-blue-100 flex items-center justify-center m-auto">
          <div className="p-1 rounded-full bg-gradient-to-r from-primary-50 to-blue-50">
            <Image src={MobileIcon} alt="mail" />
          </div>
        </div>
        <h5 className="text-subtitle text-neutral-700 font-semibold mt-5 mb-2">
          Please check your message
        </h5>
        <p className="text-b2 text-neutral-600 mb-6">
          We’ve {resend ? "resent " : "sent "}an OTP to {typeOfIdentifier === "mobile" && "+91"} {identifier}
        </p>
        <form onSubmit={otpFormik.handleSubmit}>
          <OtpInput
            onOtpChange={handleOtpChange}
            hasError={otpFormik.errors.otp || wrongOtpError}
            size="md"
            inputsCount={6}
            className="tablet:w-[48px] tablet:h-[48px]"
            onComplete={handleOtpVerify}
          />

          {resendActive === 0 ? (
            <p className="text-b2 text-neutral-500 font-medium mt-6">
              Didn’t receive the code?{" "}
              <span
                className={`text-gradient-primary-500 cursor-pointer ${
                  loading && "!cursor-not-allowed"
                }`}
                onClick={()=>{handleResendOtp(); handleResentClick && handleResentClick();}}
              >
                Click to Resend.
              </span>
            </p>
          ) : (
            <p className="text-b2 text-neutral-500 font-medium mt-6">
              Resend code will be available after{" "}
              <span className="text-neutral-700">{resendActive} Seconds.</span>
            </p>
          )}

          <div className="flex flex-col-reverse tablet:flex-row gap-2 mt-6">
            <Button
              ghost
              color="secondary"
              size="md"
              type="button"
              onClick={handleModalClose}
              onKeyDown={handleModalClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              size="md"
              onClick={()=>{handleOtpVerify();}}
              loading={loading}
              className="w-full"
              type="submit"

            >
              Verify
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default OtpModal;
