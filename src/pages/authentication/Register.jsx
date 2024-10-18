import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../api";
import "../../assets/css/Register.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const validationSchemaStep1 = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .matches(
      /^[a-zA-Z0-9_-]*$/,
      "Username must contain only letters, numbers, underscores, and hyphens"
    )
    .required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
    ),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  role: Yup.string().oneOf(["student", "instructor"]).required("Role is required"),
});

export const Register = () => {
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
        await handleRegister();
      }
    } catch (error) {
      toast.error('Invalid OTP or OTP has expired.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    const userData = {
      username: formik.values.username,
      password: formik.values.password,
      email: formik.values.email,
      profile: { role: formik.values.role },
    };

    try {
      await api.post("accounts/api/user/register/", userData);
      navigate("/login");
    } catch (error) {
      toast.error('Registration failed the username already exist.');
      console.error('Registration error:', error);
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
      username: "",
      password: "",
      email: "",
      role: "student",
    },
    validationSchema: validationSchemaStep1,
    onSubmit: (values) => {
      handleSendOTP(values);
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-blue-500 mb-4">Register</h1>
        {step === 1 && (
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Username"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-sm">{formik.errors.username}</div>
            ) : null}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
                autoComplete="new-password"
                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 cursor-pointer"
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
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
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
            {formik.touched.role && formik.errors.role ? (
              <div className="text-red-500 text-sm">{formik.errors.role}</div>
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
