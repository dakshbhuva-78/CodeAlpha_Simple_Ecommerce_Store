import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/authService";
import Loader from "../components/Loader";


function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const data = await getUserProfile(token);

            setUser(data);
            setLoading(false);

        }

        catch (error) {

            console.log(error);

        } finally {
            setLoading(false);
        }

    };

    if (loading) {
        return <Loader />;
    }
    return (

        <section className="max-w-5xl mx-auto py-10 md:py-16 px-4 md:px-6">

            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">

                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-black text-white flex items-center justify-center text-4xl md:text-5xl font-bold">

                        {user.name.charAt(0).toUpperCase()}

                    </div>

                    <div>

                        <h1 className="text-3xl md:text-5xl font-bold">

                            {user.name}

                        </h1>

                        <p className="text-gray-500 mt-3">

                            {user.email}

                        </p>

                        <span className="inline-block mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

                            {user.role}

                        </span>

                    </div>

                </div>

                <hr className="my-10" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                    <div className="bg-gray-100 rounded-2xl p-6 text-center">

                        <h3 className="text-gray-500">

                            Orders

                        </h3>

                        <p className="text-3xl md:text-4xl font-bold mt-2">
                            {user.orderCount}
                        </p>

                    </div>

                    <div className="bg-gray-100 rounded-2xl p-6 text-center">

                        <h3 className="text-gray-500">
                            Reviews
                        </h3>

                        <p className="text-4xl font-bold mt-2">
                            {user.reviewCount}
                        </p>

                    </div>

                    <div className="bg-gray-100 rounded-2xl p-6 text-center">

                        <h3 className="text-gray-500">

                            Joined

                        </h3>

                        <p className="text-lg font-semibold mt-2">

                            {new Date(user.createdAt).toLocaleDateString()}

                        </p>

                    </div>

                </div>

                <div className="mt-10 flex justify-center md:justify-start">

                    <button

                        onClick={() => navigate("/edit-profile")}

                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl"
                    >

                        Edit Profile

                    </button>

                </div>

            </div>

        </section>

    );

}

export default Profile;