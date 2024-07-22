import dynamic from "next/dynamic";
import React from "react";

const ProvablyFair = dynamic(() => import("../../components/ProvablyFair"), {
  ssr: false,
});

const ProvablyFairPage: React.FC = () => {
  return <ProvablyFair />;
};

export default ProvablyFairPage;
