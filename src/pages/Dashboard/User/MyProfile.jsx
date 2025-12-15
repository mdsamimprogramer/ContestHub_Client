import useAuth from "../../../hooks/useAuth";

export default function MyProfile() {
    const { user } = useAuth();

    return (
        <div className="max-w-md">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>

            <img src={user?.photoURL} className="w-24 rounded-full mb-4" />

            <p><strong>Name:</strong> {user?.displayName}</p>
            <p><strong>Email:</strong> {user?.email}</p>

            <div className="mt-4">
                <label className="label">Bio</label>
                <textarea className="textarea textarea-bordered w-full"></textarea>
                <button className="btn btn-primary mt-2">Update Profile</button>
            </div>
        </div>
    );
}
