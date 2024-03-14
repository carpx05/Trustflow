import React from "react";
import LandingPage from "@/components/landing";
import Account from "../../components/user/account";
import FAQ from "../../components/user/faq";

export default function User() {
  return (
    <>
      <LandingPage />
      <Account />
      <FAQ />
    </>
  );
}
