import { useRef, useState } from "react";
import Image from "next/image";
import Cropper from "react-cropper";
import type { UploadProps } from "antd";
import { message, Upload as AntUpload, ConfigProvider } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile } from "antd/es/upload/interface";

const { Dragger } = AntUpload;

import "./Upload.css";
import "cropperjs/dist/cropper.css";
import Modal from "../modal/Modal";
import Button from "../buttons/Button";

import Cloud from "@/public/outline-icons/cloud.svg";

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

type uploadProps = {
  butttonText?: string;
  onImageSave?: (img: string) => void;
  isDragAndDrop?: boolean;
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const Upload: React.FC<uploadProps> = ({
  butttonText = "Upload",
  onImageSave,
  isDragAndDrop,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [croppedImg, setCroppedImg] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const cropperRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (typeof reader.result === "string") {
          setImgURL(reader.result);
        }
      });
      reader.readAsDataURL(event.target.files[0]);
      setShowModal(true);
    }
  };

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      setCroppedImg(cropper.getCroppedCanvas().toDataURL());
    }
  };
  const onCloseModal = () => setShowModal(false);

  const onSaveHandler = () => {
    setShowModal(false);
    if (onImageSave) {
      onImageSave(croppedImg);
    }
  };

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setUploaded(true);
        setImageUrl(url);
      });
    }
  };
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={onUploadFile}
        ref={inputRef}
        className="hidden"
      />
      {isDragAndDrop ? (
        !uploaded ? (
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#5f27cd",
              },
            }}
          >
            <Dragger {...props} onChange={handleChange}>
              <div className="rounded-lg min-w-[320px] py-[10px] flex flex-col items-center justify-center text-center">
                <Image
                  className="mb-[10px]"
                  width={25}
                  height={25}
                  src={Cloud}
                  alt="cloud"
                />
                <p className="text-neutral-500 text-b2 mb-2 ">
                  <span
                    // onClick={handleUpload}
                    className="cursor-pointer font-medium text-gradient-primary-500"
                  >
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-neutral-500 text-b2 ">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            </Dragger>
          </ConfigProvider>
        ) : (
          <div className="flex gap-6 items-center ">
            {" "}
            <img
              src={imageUrl ? imageUrl : ""}
              alt="sad"
              className="max-h-[100px] max-w-[200px]"
            />{" "}
            <Button
              onClick={() => {
                setUploaded(false);
              }}
              color="secondary"
              ghost
            >
              Remove logo
            </Button>{" "}
          </div>
        )
      ) : (
        <Button onClick={handleUpload} ghost>
          <span className="flex">
            Upload&nbsp;
            <span className="hidden min-[400px]:block">New&nbsp;</span>
            <span className="hidden mobile:block">Image</span>
          </span>
        </Button>
      )}
      {showModal && (
        <Modal isOpen top={0}>
          <Cropper
            src={imgURL}
            style={{ height: 300, width: "300px" }}
            initialAspectRatio={16 / 9}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            responsive={true}
            autoCropArea={1}
            aspectRatio={4 / 4}
            checkOrientation={false}
          />
          <div className="flex p-2 mt-6 gap-2">
            <Button onClick={onCloseModal} ghost color="secondary">
              Close
            </Button>
            <Button onClick={onSaveHandler}>Save</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Upload;
