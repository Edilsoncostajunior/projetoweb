'use client'
import React from "react";
import { useRouter } from "next/navigation";

import Home from "../home/page";

export default function App() {
  const router = useRouter();

  return (
    <>
      {router.pathname === "employee/home" && <Home />}
      {router.pathname === "employee/core" && <Home />}
    </>
  );
}
