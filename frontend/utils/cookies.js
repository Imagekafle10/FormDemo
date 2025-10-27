import Cookies from "js-cookie";

export const getCookie = ({ cookieName }) => Cookies.get(cookieName);
