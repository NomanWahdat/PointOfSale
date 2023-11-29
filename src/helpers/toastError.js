import { toast } from "react-toastify";

export const toastError = err => {
  if (err?.response?.status === 400) {
    if (err.response.data.errors) {
      let message = "";
      err.response.data.errors.forEach(item => {
        message += item.msg + ", ";
      });
      toast.error(message.slice(0, message.length - 2), {
        theme: "error",
        position: "bottom-left"
      });
    } else {
      toast.error(err.response.data.message, {
        theme: "error",
        position: "bottom-left"
      });
    }
  } else {
    toast.error(
      err?.response?.data.message ||
        err.message ||
        err?.response?.data?.error,
      {
        theme: "error",
        position: "bottom-left"
      }
    );
  }
};
