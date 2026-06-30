import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


function VerifyOtp() {

    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");

    const [timer, setTimer] = useState(60);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (timer <= 0) return;

        const interval = setInterval(() => {

            setTimer((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(interval);

    }, [timer]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setLoading(true);
            const { data } = await axios.post(
                "http://localhost:5000/api/users/verify-otp",
                {
                    email,
                    otp,
                }
            );
            setLoading(false);
            toast.success("Email verified successfully.");

            navigate("/login", {

                state: {

                    verified: true,

                    email

                }

            });
        }

        catch (error) {
            setLoading(false);
            toast.error(
                error.response?.data?.message || "Verification Failed"
            );
        }
    };

    const resendOTP = async () => {

        try {

            const { data } = await axios.post(

                "http://localhost:5000/api/users/resend-otp",

                {

                    email,

                }

            );

            toast.message(data.message);

            setTimer(60);

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed"

            );

        }

    };
    return (

        <section className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white shadow-xl rounded-3xl p-10 w-[450px]">

                <h1 className="text-4xl font-bold mb-3">

                    Verify Email

                </h1>

                <p className="text-gray-500 mb-8">

                    Enter OTP sent to

                    <br />

                    <span className="font-semibold">

                        {email}

                    </span>

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        className="w-full border rounded-xl px-4 py-3"
                        type="text"
                        maxLength={6}
                        inputMode="numeric"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) =>
                            setOtp(e.target.value.replace(/\D/g, ""))
                        }
                        required
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-xl"
                    >
                        {
                            loading
                                ?
                                "Verifying..."
                                :
                                "Verify OTP"
                        }

                    </button>

                </form>

                <div className="mt-6 text-center">

                    {

                        timer > 0 ?

                            (

                                <p className="text-gray-500">

                                    Resend OTP in {timer}s

                                </p>

                            )

                            :

                            (

                                <button

                                    onClick={resendOTP}

                                    className="text-blue-600 font-semibold"

                                >

                                    Resend OTP

                                </button>

                            )

                    }

                </div>

            </div>

        </section>

    );

}

export default VerifyOtp;