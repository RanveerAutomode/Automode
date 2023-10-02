import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  closeModal?: () => void;
  shouldCloseOnOverlayClick?: boolean;
  className?: string;
  hasError?: boolean | null;
  top?: number;
  rounded?: "sm" | "md" | "lg" | "xl";
  id?: string;
  heading?: string;
  supportingText?: string;
}
import X from "@/public/modal/x.svg";
import Image from "next/image";

const Modal: ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (
  {
    children,
    isOpen,
    closeModal,
    shouldCloseOnOverlayClick = false,
    className = "",
    hasError = false,
    top = 20,
    rounded = "xl",
    id,
    heading,
    supportingText,
  }: ModalProps,
  forwardedRef
) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const focusableElements = useRef<Array<HTMLElement>>([]);
  const firstFocusableElement = useRef<HTMLElement | null>(null);
  const lastFocusableElement = useRef<HTMLElement | null>(null);
  const [shake, setShake] = useState<boolean | null>(null);

  useImperativeHandle(
    forwardedRef,
    () => modalRef.current || document.createElement("div")
  );

  const marginTop: { [key: string]: string } = {
    0: "mt-0",
    10: "mt-10",
    20: "mt-20",
    30: "mt-[120px]",
    40: "mt-[160px]",
    50: "mt-[200px]",
  };

  const roundedSize: { [key: string]: string } = {
    sm: (top !== 0 && "rounded-sm") || "rounded-b-sm",
    md: (top !== 0 && "rounded-md") || "rounded-b-md",
    lg: (top !== 0 && "rounded-lg") || "rounded-b-lg",
    xl: (top !== 0 && "rounded-xl") || "rounded-b-xl",
  };

  const [animate, scope] = useAnimate();

  useEffect(() => {
    if (hasError) setShake(true);
    if (hasError === null) setShake(null);
  }, [hasError]);

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => {
        setShake(false);
      }, 1000); // time of shake animation duration

      return () => clearTimeout(timer);
    }
  }, [shake]);

  const closeOnEscapeKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.charCode || e.keyCode) === 27) {
        closeModal && closeModal();
      }
    },
    [closeModal]
  );

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (
      event.code !== "Tab" ||
      !firstFocusableElement.current ||
      !lastFocusableElement.current
    )
      return;
    if (event.shiftKey) {
      if (document.activeElement === firstFocusableElement.current) {
        lastFocusableElement.current.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement.current) {
        firstFocusableElement.current.focus();
        event.preventDefault();
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (modalRef.current) {
        // Disable focus for all focusable elements outside the modal
        document
          .querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          .forEach((element) => {
            if (!modalRef.current?.contains(element)) {
              element.setAttribute("tabindex", "-1");
            }
          });

        // Enable focus for all focusable elements inside the modal
        focusableElements.current = Array.from(
          modalRef.current.querySelectorAll(
            "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
          )
        );
        firstFocusableElement.current = focusableElements.current[0];
        lastFocusableElement.current =
          focusableElements.current[focusableElements.current.length - 1];
      }

      document.body.addEventListener("keydown", closeOnEscapeKeyDown);
      document.body.addEventListener("keydown", handleKeyDown);
    } else {
      // When the modal is closed, restore the focusability
      document.querySelectorAll('[tabindex="-1"]').forEach((element) => {
        element.removeAttribute("tabindex");
      });
    }

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
      document.body.removeEventListener("keydown", handleKeyDown);
      document.querySelectorAll('[tabindex="-1"]').forEach((element) => {
        element.removeAttribute("tabindex");
      });
    };
  }, [isOpen, closeOnEscapeKeyDown, handleKeyDown]);

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (shouldCloseOnOverlayClick && e.target === e.currentTarget) {
      closeModal && closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className={`fixed inset-0 flex items-start ${marginTop[top]} justify-center z-[1100] `}
      >
        <div
          className="modal-background fixed inset-0 bg-black opacity-75"
          onClick={handleClickOutside}
        ></div>
        {isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ scale: 0, transition: { duration: 0.2 } }}
            id={id}
            className={`modal-content fixed bg-white p-4 tablet:p-6 ${
              roundedSize[rounded]
            }  items-center justify-center shadow-lg-6 z-[1200] animated ${className} ${
              shake ? "shake" : ""
            }`}
            ref={modalRef}
          >
            {(heading || supportingText) && (
              <div className="px-6 mx-[-16px] tablet:mx-[-24px]">
                <header className="px-6 py-2 bg-neutral-100 mx-[-24px] -mt-[8px] tablet:mt-[-16px] flex justify-between items-baseline">
                  <div>
                    <h1 className="text-subtitle font-medium text-neutral-700">
                      {heading}
                    </h1>
                    <p className="text-b2 text-neutral-500">{supportingText}</p>
                  </div>
                  {closeModal && (
                    <Image
                      src={X}
                      alt="delete"
                      className="cursor-pointer"
                      onClick={() => closeModal && closeModal()}
                    />
                  )}
                </header>
              </div>
            )}
            {children}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default forwardRef(Modal);
