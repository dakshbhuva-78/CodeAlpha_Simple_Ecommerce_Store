import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getUserProfile,
    updateUserProfile
} from "../services/authService";
import Loader from "../components/Loader";

function EditProfile() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const data = await getUserProfile(token);

            setName(data.name);

            setEmail(data.email);
            setLoading(false);

        }

        catch (error) {

            console.log(error);

        } finally {
            setLoading(false);
        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const data = await updateUserProfile(

                {

                    name

                },

                token

            );

            toast.message(data.message);

            navigate("/profile");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Update Failed"

            );

        }

    };
    
    if (loading) {
        return <Loader />;
    }
    return (

        <section className="max-w-4xl mx-auto py-16 px-6">

            <div className="bg-white rounded-3xl shadow-xl p-10">

                <h1 className="text-4xl font-bold mb-8">

                    Edit Profile

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div>

                        <label className="font-semibold">

                            Full Name

                        </label>

                        <input

                            type="text"

                            value={name}

                            onChange={(e) =>
                                setName(e.target.value)
                            }

                            className="w-full border rounded-xl p-3 mt-2"

                            required

                        />

                    </div>

                    <div>

                        <label className="font-semibold">

                            Email Address

                        </label>

                        <input

                            type="email"

                            value={email}

                            readOnly

                            className="w-full border rounded-xl p-3 mt-2 bg-gray-100"

                        />

                    </div>

                    <div className="flex gap-4">

                        <button

                            type="button"

                            onClick={() =>
                                navigate("/profile")
                            }

                            className="px-6 py-3 rounded-xl border"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl"

                        >

                            Save Changes

                        </button>

                    </div>

                </form>

            </div>

        </section>

    );

}

export default EditProfile;