import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';

const OTPVerificationForm = ({ email }) => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleVerifyOTP = async () => {
        setLoading(true);
        try {
            const res = await api.post('/verify-otp/', { email, otp });
            if (res.status === 200) {
                toast.success('OTP verified successfully.');
                navigate("/login"); // Redirect to login after OTP verification
            }
        } catch (error) {
            toast.error('Invalid OTP or OTP has expired.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-gray-600 mb-6 text-center">Verify OTP</h1>
            
            <input
                className="form-input w-full mb-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
            />

            <button
                className="form-button w-full py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300"
                type="button"
                onClick={handleVerifyOTP}
                disabled={loading}
            >
                Verify OTP
            </button>
        </form>
    );
};

export default OTPVerificationForm;
