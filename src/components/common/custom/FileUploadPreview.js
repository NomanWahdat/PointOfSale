/* eslint-disable react/prop-types */
import { useDropzone } from "react-dropzone";
import { Image, Dropdown } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import Flex from "components/common/Flex";
import cloudUpload from "assets/img/icons/cloud-upload.svg";
import React, { useEffect, useMemo, useState } from "react";
import { getSize } from "helpers/utils";
import CardDropdown from "components/common/CardDropdown";

function FileUploadPreview({
  onChange,
  files,
  previewUrl,
  setFiles
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const maxSize = 1048576;
  const errorMessage = "File type not Supported";
  const isFileError = false;
  const [isInputMounted, setIsInputMounted] = useState(true);
  useEffect(
    function remountInput() {
      if (!isInputMounted) {
        setIsInputMounted(true);
      }
    },
    [isInputMounted]
  );
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxSize,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });
  const lightboxImages = useMemo(
    () =>
      previewUrl ? [previewUrl] : files.map(file => file.preview),
    [files, previewUrl]
  );

  // if (fileRejections.length > 0) {
  //   isFileError = fileRejections.length > 0;
  //   errorMessage =
  //     fileRejections[0].errors[0].code == 'file-invalid-type'
  //       ? 'File type is not Supported please upload only image '
  //       : 'File size is greater then 1MB';
  // }

  const handleRemove = removedFile => {
    setFiles(files.filter(file => file.path !== removedFile.path));
    setIsInputMounted(false);
    onChange();
  };

  return (
    <>
      <div {...getRootProps({ className: "dropzone-area py-6" })}>
        <input {...getInputProps({ onChange })} />
        <Flex justifyContent="center">
          <img
            src={cloudUpload}
            alt=""
            width={25}
            className="me-2"
          />
          <p className="fs-0 mb-0 text-700">Drop your images here</p>
        </Flex>
      </div>
      {isFileError && (
        <div className="text-danger mt-2">{errorMessage}</div>
      )}
      <div className="mt-3">
        {previewUrl && (
          <Flex
            alignItems="center"
            className="py-3 border-bottom btn-reveal-trigger"
          >
            <Image
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
              rounded
              width={60}
              height={60}
              src={previewUrl}
              alt={previewUrl}
            />
          </Flex>
        )}
        {files.map(file => (
          <Flex
            alignItems="center"
            className="py-3 border-bottom btn-reveal-trigger"
            key={file.path}
          >
            <Image
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
              rounded
              width={40}
              height={40}
              src={file.preview}
              alt={file.path}
            />
            <Flex
              justifyContent="between"
              alignItems="center"
              className="ms-3 flex-1"
            >
              <div>
                <h6>{file.path}</h6>
                <Flex
                  className="position-relative"
                  alignItems="center"
                >
                  <p className="mb-0 fs--1 text-400 line-height-1">
                    <strong>{getSize(file.size)}</strong>
                  </p>
                </Flex>
              </div>
            </Flex>
            <CardDropdown>
              <div className="py-2">
                <Dropdown.Item
                  className="text-danger"
                  onClick={() => handleRemove(file)}
                >
                  Remove
                </Dropdown.Item>
              </div>
            </CardDropdown>
          </Flex>
        ))}
        {isOpen && (
          <Lightbox
            mainSrc={lightboxImages[lightboxIndex]}
            nextSrc={
              lightboxImages[
                (lightboxIndex + 1) % lightboxImages.length
              ]
            }
            prevSrc={
              lightboxImages[
                (lightboxIndex + lightboxImages.length - 1) %
                  lightboxImages.length
              ]
            }
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setLightboxIndex(
                (lightboxIndex + lightboxImages.length - 1) %
                  lightboxImages.length
              )
            }
            onMoveNextRequest={() =>
              setLightboxIndex(
                (lightboxIndex + 1) % lightboxImages.length
              )
            }
          />
        )}
      </div>
    </>
  );
}
export default FileUploadPreview;
