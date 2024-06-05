import useAuth from "../../../hooks/useAuth";

const OrganizerProfile = () => {
    const { user } = useAuth();
    return (
        <div>
            <div className="flex flex-col items-center py-12 bg-[#F5F5DC] ">
                <div className="avatar flex-1">
                    <div className="w-96 h-96 border-4 rounded-full">
                        <img src={user?.photoURL} />
                    </div>
                </div>
                <div className="card-body flex-1">
                    <h2 className="card-title"><span className="font-bold">Name:</span> {user?.displayName}</h2>
                    <p><span className="font-bold">Email:</span> {user?.email}</p>
                    {
                        user?.phoneNumber && <p><span className="font-bold">Phone:</span> {user?.phoneNumber}</p>
                    }
                    <div className="card-actions justify-center">
                        <button className="btn bg-[#6F42C1] text-white">Edit profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizerProfile;