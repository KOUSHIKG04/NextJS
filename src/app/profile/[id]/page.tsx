import { useRouter, useParams } from "next/navigation";

const UserProfile = () => {
  const router = useRouter();
  const { id } = useParams();

  if (!id) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <hr />
      <p className="text-2xl font-normal">
        YOUR PROFILE ID =<span className="p-2 text-black font-bold">{id}</span>
      </p>
    </div>
  );
};

export default UserProfile;
