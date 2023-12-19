import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/LayoutArea/Layout/Layout";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import interceptors from "./Utils/Interceptors";

interceptors.create();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Layout />
    <ToastContainer />
  </BrowserRouter>
);
