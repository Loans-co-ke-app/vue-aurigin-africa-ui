import {
  getCookieToken,
  removeToken,
  setCookieToken,
} from "@/api/cookieService";
import jwtDecode, { JwtPayload } from "jwt-decode";

import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/store/useAuthStore";

const { MODE, VITE_PROD_API_URL, VITE_DEV_API_URL } = import.meta.env;
const isDev = MODE === "development";
const baseURL = isDev ? VITE_DEV_API_URL : VITE_PROD_API_URL;

const publicAuriginAfricaRequest = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials",
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true,
});

const privateAuriginAfricaRequest = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials",
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true,
});

// Add a request interceptor to add the JWT token to the authorization header
privateAuriginAfricaRequest.interceptors.request.use(
  async (config) => {
    const token = getCookieToken("tka-369340a21d88d03d9509");
    // console.log("token: " + JSON.stringify(token));
    
    if (!token) {
      return Promise.reject(config);
    }
    if (token) {
      config.headers.Authorization = `JWT ${token.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to refresh the JWT token if it's expired
privateAuriginAfricaRequest.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokenPayload = getCookieToken("tka-369340a21d88d03d9509");
      if (!tokenPayload) {
        return Promise.reject(error);
      }
      const decodedToken = jwtDecode<JwtPayload>(tokenPayload.refreshToken);
      console.log("decodedToken: " + JSON.stringify(decodedToken));
      
      const currentTime = new Date().getTime() / 1000;
      if (decodedToken.exp! < currentTime) {
        removeToken("tka-369340a21d88d03d9509");
        await router.push({ name: "Login" });
        return Promise.reject(error);
      }
      if (!decodedToken) {
        removeToken("tka-369340a21d88d03d9509");
        await router.push({ name: "Login" });
        return Promise.reject(error);
      }
      const refreshToken = tokenPayload.refreshToken;
      const res = await publicAuriginAfricaRequest.post("/auth/refresh-token", {
        refreshToken,
      });

      if (res.status === 201 || res.status === 200) {
        // console.log("New token received: " + JSON.stringify(res.data));
        const authStore = useAuthStore();
        authStore.updateRefreshToken(res.data.refreshToken);
        setCookieToken(res.data as any);
        privateAuriginAfricaRequest.defaults.headers.common["Authorization"] =
          "JWT " + res.data.accessToken;
        originalRequest.headers["Authorization"] =
          "JWT " + res.data.accessToken;
        return privateAuriginAfricaRequest(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
function getWebSocketAddress(url: string): string {
  const devRegex = new RegExp(/(http|https):\/\/([^:]+):(\d+)/);
  const prodRegex = new RegExp(/(http|https):\/\/([\w\.]+)/);
  const match = url.match(isDev ? devRegex : prodRegex);
  if (match) {
    const protocol = match[1] === "http" ? "ws" : "wss";
    const hostname = match[2];
    const port = match[3];
    const prodUrl = `${protocol}://${hostname}`;
    return isDev ? `${protocol}://${hostname}:${port}` : prodUrl;
  } else {
    console.log("Invalid Websocket URL format");
    return "";
  }
}
export { publicAuriginAfricaRequest, privateAuriginAfricaRequest };
export default privateAuriginAfricaRequest;
export const wsURL = getWebSocketAddress(baseURL);
