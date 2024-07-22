import dynamic from "next/dynamic";
import React from "react";

const ProfileContent = dynamic(() => import("../../components/Profile"), {
  ssr: false,
});

const Profile: React.FC = () => {
  return (
    <>
      <ProfileContent />
    </>
  );
};

export default Profile;
