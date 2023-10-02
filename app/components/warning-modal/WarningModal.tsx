"use client";

import { useRef, useState } from "react";
import Modal from "../modal/Modal";
import Image from "next/image";
import Button from "../buttons/Button";

import InfoCircle from "@/public/security-icons/info-circle.svg";


type WarningModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    supportingText?: string;
    };

const WarningModal: React.FC<WarningModalProps> = ({isOpen, setIsOpen, onConfirm, title, supportingText, onCancel}) => {
    // const [terminateModal, setTerminateModal] = useState(false);

  return (
    <Modal isOpen={isOpen}>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center bg-red-100 border-8 border-red-50 w-12 h-12 rounded-full">
            <Image src={InfoCircle} alt="info" />
          </div>
          <p className="subtitle font-semibold text-neutral-700 mt-5 mb-2">
            {title}
          </p>
          <p className="text-b2 text-neutral-400 max-w-[350px] mb-6">
            {supportingText}
          </p>
          <div className="flex gap-2 w-[250px] mobile:w-[352px]">
            <Button
              color="secondary"
              ghost
              size="md"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
            <Button
              color="red"
              size="md"
              onClick={() => onConfirm()}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
  );
};

export default WarningModal;
