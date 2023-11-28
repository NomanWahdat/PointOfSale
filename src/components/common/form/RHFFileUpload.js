/* eslint-disable react/prop-types */
import { Form, Image } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import propTypes from "prop-types";
import FileUploadPreview from "../custom/FileUploadPreview";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profilepicture from "assets/img/customer/profile-picture.png";
import { convertBase64 } from "helpers/utils";

export const RHFFileUpload = ({ name, label, ...rest }) => {
  const [productFile, setProductFile] = useState([]);
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error }
      }) => {
        // if value is url then set preview url
        let previewUrl = "";
        if (typeof value === "string" && value?.includes("http")) {
          previewUrl = value;
        }
        return (
          <Form.Group>
            <Form.Label>{label}</Form.Label>
            <FileUploadPreview
              onChange={e => onChange(e.target.files[0])}
              files={productFile}
              setFiles={setProductFile}
              previewUrl={previewUrl}
              {...rest}
            />
            {error && (
              <div className="invalid-feedback-custom">
                {error.message}
              </div>
            )}
          </Form.Group>
        );
      }}
    />
  );
};

RHFFileUpload.propTypes = {
  name: propTypes.string,
  label: propTypes.string
};

export const RHFAvatar = ({ name, ...rest }) => {
  const [base64, setBase64] = useState("");

  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <>
          <div className="circular-image-center cursor-pointer">
            <div className="circular-image mb-2">
              <label
                className="circular-image"
                htmlFor="upload-button"
              >
                <Image
                  src={base64 ? base64 : profilepicture}
                  style={{
                    opacity: ".6",
                    borderRadius: "200px",
                    backgroundColor: "none",
                    height: "100px",
                    width: "100px"
                  }}
                />
                <FontAwesomeIcon icon="camera" className="fs-1" />
              </label>
              <input
                type="file"
                id="upload-button"
                style={{ display: "none" }}
                accept="image/*"
                onChange={async e => {
                  const file = e.target.files[0];
                  onChange(file);
                  const base64 = await convertBase64(file);
                  setBase64(base64);
                }}
                {...rest}
              />
            </div>
          </div>
          {error && (
            <div className="invalid-feedback-custom">
              {error.message}
            </div>
          )}
        </>
      )}
    />
  );
};

RHFFileUpload.propTypes = {
  name: propTypes.string,
  label: propTypes.string
};
