<<<<<<< HEAD

=======
import { FC } from "react";

// Correctly typing the props for Next.js Page
>>>>>>> 7cb497fe10acd4661ebc877c1c83c8ab8ac21d56
interface UserProfileProps {
  params: {
    id: string;
  };
}

<<<<<<< HEAD
const UserProfile = ({ params } : UserProfileProps) => {
=======
const UserProfile: FC<UserProfileProps> = ({ params }) => {
>>>>>>> 7cb497fe10acd4661ebc877c1c83c8ab8ac21d56
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <hr />
      <p className="text-2xl font-normal">
        YOUR PROFILE ID =
        <span className="p-2 text-black font-bold">{params.id}</span>
      </p>
    </div>
  );
};

export default UserProfile;
