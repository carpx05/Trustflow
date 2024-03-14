import React from "react";

import OneApp from "./one-app";
import SendReceive from "./send-receive";
import KYCStarts from "./hero";

export default function LandingPage() {
  return (
    <div className="px-[1rem]">
      <KYCStarts />
      <OneApp />
      <SendReceive />
    </div>
  );
}
