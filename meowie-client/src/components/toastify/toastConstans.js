import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}
export const toaster = {
    default: (message) =>{
        toast(message, ToastOptions);
    },
    info: (message) =>{
        toast.info(message, ToastOptions);
    },
    success: (message) =>{
        toast.success(message, ToastOptions);
    },
    warning: (message) =>{
        toast.warning(message, ToastOptions);
    },
    error: (message) =>{
        toast.error(message, ToastOptions);
    }
}
