

type tParams = Promise<{ id: string }>;

const UserProfile = async ({ params }: { params: tParams }) => {
  const { id } = await params; // Await the promise to resolve the params

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
