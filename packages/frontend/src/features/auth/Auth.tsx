// https://dev.to/kdhttps/appauth-js-integration-in-react-1m3e

import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleCallback, login, logout } from "./authService";
import { checkAuth, selectAuth } from "./authSlice";

export const Callback = () => {
  const dispatch = useAppDispatch();
  const [done, setDone] = useState(false);

  useEffect(
    function () {
      handleCallback(
        () => {
          dispatch(checkAuth());
          setDone(true);
        },
        error => console.error(error)
      );
    },
    [dispatch]
  );

  return done ? (<Redirect to="/dashboard" />) : (<div></div>)
};

export const AuthBox = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const authState = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(
    function () {
      dispatch(checkAuth());
    },
    [dispatch]
  );

  return authState.isAuthenticated ? (
    <Button onClick={() => { logout(); dispatch(checkAuth()); history.push('/'); }}>
      {t("app.logout")}
    </Button>
  ) : (
    <Button onClick={async () => await login()}>
      {t("app.login")}
    </Button>
  );
}