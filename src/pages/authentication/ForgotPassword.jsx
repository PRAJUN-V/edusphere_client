import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../api";
import "../../assets/css/Register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
});

const ForgotPassword = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [timer, setTimer] = useState(60);
    const [timerActive, setTimerActive] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let interval = null;

        if (timerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        if (timer === 0) {
            setTimerActive(false);
        }

        return () => clearInterval(interval);
    }, [timerActive, timer]);

    const handleSendOTP = async (values) => {
        setLoading(true);
        try {
            const res = await api.post('/generate-otp/', { email: values.email });
            if (res.status === 201) {
                toast.success('OTP sent to your email.');
                setStep(2);
                setOtpSent(true);
                setTimer(60);
                setTimerActive(true);
            }
        } catch (error) {
            toast.error('Error sending OTP');
            console.error('Error sending OTP:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/verify-otp/', { email: formik.values.email, otp });
            if (res.status === 200) {
                toast.success('OTP verified successfully.');
                setStep(3);
            }
        } catch (error) {
            toast.error('Invalid OTP or OTP has expired.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (values) => {
        setLoading(true);
        try {
            const res = await api.post('/reset-password/', { email: formik.values.email, otp, new_password: values.newPassword });
            if (res.status === 200) {
                toast.success('Password reset successfully.');
                navigate("/login");
            }
        } catch (error) {
            const errorResponse = error.response ? error.response.data : 'Password reset failed.';
            if (typeof errorResponse === 'object') {
                const errorMessages = Object.values(errorResponse).flat();
                errorMessages.forEach(message => toast.error(message));
            } else {
                toast.error('Password reset failed.');
            }
            console.error('Password reset error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (timer === 0) {
            await handleSendOTP(formik.values);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (step === 1) {
                handleSendOTP(values);
            } else if (step === 2) {
                handleVerifyOTP(values);
            } else if (step === 3) {
                handleResetPassword(values);
            }
        },
    });

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-blue-500 mb-4">Forgot Password</h1>
                {step === 1 && (
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Email"
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        ) : null}
                        <button
                            className="w-full p-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                            type="submit"
                            disabled={loading}
                        >
                            Send OTP
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOTP}>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        <button
                            className="w-full p-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                            type="submit"
                            disabled={loading}
                        >
                            Verify OTP
                        </button>
                        <div className="flex justify-between items-center">
                            <span>
                                {timerActive ? `Resend OTP in ${timer}s` : "You can resend OTP now."}
                            </span>
                            {!timerActive && otpSent && (
                                <button
                                    className="text-blue-500 hover:underline"
                                    type="button"
                                    onClick={handleResendOTP}
                                >
                                    Resend OTP
                                </button>
                            )}
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="New Password"
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Confirm Password"
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                        ) : null}
                        <button
                            className="w-full p-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                            type="submit"
                            disabled={loading}
                        >
                            Reset Password
                        </button>
                    </form>
                )}

                <div className="text-center">
                    <Link to="/" className="text-blue-500 hover:underline">
                        Home
                    </Link>
                    {" | "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
