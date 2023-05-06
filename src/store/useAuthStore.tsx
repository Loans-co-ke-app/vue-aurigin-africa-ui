import {
  SignInFormPropType,
  SignUpFormPropType,
  AuthStateType,
  UserType,
  AuthUser,
} from "@/types";
import jwtDecode, { JwtPayload } from "jwt-decode";

import { Router } from "vue-router";
import { defineStore } from "pinia";
import { stateKeys } from "@/constants/stateKeys";
import { removeToken } from "@/api/cookieService";
import router from "@/router";
const initialState: AuthStateType = JSON.parse(
  localStorage.getItem(stateKeys["aurigin-afica-app-authState"])!
)
  ? JSON.parse(localStorage.getItem(stateKeys["aurigin-afica-app-authState"])!)
  : ({
      user: null,
      loading: false,
      refreshToken: "",
      isAuthenticated: false,
    } as unknown as AuthStateType);

export type AuthStateTypeWithRouter = AuthStateType & {
  router: Router;
};

export const useAuthStore = defineStore({
  id: "authState",
  state: (): AuthStateType =>
    localStorage.getItem(stateKeys["aurigin-afica-app-authState"])
      ? JSON.parse(
          localStorage.getItem(stateKeys["aurigin-afica-app-authState"]) as string
        )
      : {
          loading: false,
          user: null,
          authenticated: false,
          refreshToken: null,
        },
  getters: {
    isAuthStateLoading: (state: AuthStateType) => state.loading,
    authStateUser: (state: AuthStateType) => state.user,
    isAuthenticated: (state: AuthStateType) => state.authenticated,
    getRefreshToken: (state: AuthStateType) => state.refreshToken,
    isRefreshTokenValid: (state: AuthStateType) => {
      const tokenDecoded = jwtDecode(
        state.refreshToken as string
      ) as JwtPayload;
      const currentTime = new Date().getTime() / 1000;
      return tokenDecoded.exp! > currentTime;
    },
  },
  actions: {
    async loginUser(payload: AuthStateType) {
      this.loading = false;
      this.user = payload.user;
      this.refreshToken = payload.refreshToken;
      this.authenticated = true;
      localStorage.setItem(
        stateKeys["aurigin-afica-app-authState"],
        JSON.stringify(this.$state)
      );
    },
    updateRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken;
      localStorage.setItem(
        stateKeys["aurigin-afica-app-authState"],
        JSON.stringify(this.$state)
      );
    },
    updateUser(user: AuthUser) {
      this.user = user
      localStorage.setItem(
        stateKeys["aurigin-afica-app-authState"],
        JSON.stringify(this.$state)
      );
    },
    async logoutUser() {
      removeToken("tka-369340a21d88d03d9509")
      this.user = null;
      this.refreshToken = null;
      this.authenticated = false;
      localStorage.removeItem(stateKeys["aurigin-afica-app-authState"]);
      await router.push({ name: "login" });
    },
  },
});
