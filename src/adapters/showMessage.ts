import { toast, type ToastOptions } from "react-toastify";

type MessageType = "success" | "error" | "info" | "warning";

export function showMessage(message: string, type: MessageType = "info") {
  const options: ToastOptions = {
    position: "top-center",
    autoClose: 3000,
  };

  switch (type) {
    case "success":
      return toast.success(message, options);
    case "error":
      return toast.error(message, options);
    case "warning":
      return toast.warning(message, options);
    case "info":
    default:
      return toast.info(message, options);
  }
}

export function dismiss() {
  toast.dismiss();
}
