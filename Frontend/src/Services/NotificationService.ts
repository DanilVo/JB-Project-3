import { toast } from "react-toastify";

class NotificationService {
  public success(message: string): void {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  public error(err: string): void {
    const message = this.extractErrorMessage(err);
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  private extractErrorMessage(err: any): string {
    if (typeof err === "string") return err;

    if (typeof err.response?.data === "string") return err.response?.data;

    if (Array.isArray(err.response?.data)) return err.response?.data[0];

    if (typeof err.message === "string") return err.message;

    return "Unknown error";
  }
}

const notificationService = new NotificationService();

export default notificationService;
