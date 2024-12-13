export default function UserProfile({ params }: { params: { id: string } }) {

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      
      <hr />
      <p className="text-2xl font-normal">
        YOUR PROFILE ID = 
        <span className="p-2 text-black font-bold">
           {params.id}
        </span>
      </p>
    </div>
  );
}
