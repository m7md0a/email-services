'use client'
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import {reload } from "@/redux/slice/authSlice";
import { UserDateType } from "@/types";

interface AuthInitializerProps {
  children: ReactNode;
}

const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userFromLocalStorage = localStorage.getItem("user");
      if (userFromLocalStorage) {
        dispatch(reload(JSON.parse(userFromLocalStorage) as UserDateType));
      }
    }
  }, [dispatch]);
  return children;
};

export default AuthInitializer;