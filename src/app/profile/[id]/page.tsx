'use client';
import { GetServerSideProps } from "next";

interface UserProfileProps {
  id: string;
}

const UserProfile = ({ id }: UserProfileProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <hr />
      <p className="text-2xl font-normal">
        YOUR PROFILE ID =<span className="p-2 text-black font-bold">{id}</span>
      </p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!; // Ensure 'id' is safely accessed

  return {
    props: { id },
  };
};

export default UserProfile;
