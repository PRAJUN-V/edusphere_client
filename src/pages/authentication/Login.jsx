import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { jwtDecode } from "jwt-decode";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
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
  });

  const reachGoogle = () => {
    const clientID = "410678163577-sg06a0kp4d8sgfh6g2ug4i771k5ri7ua.apps.googleusercontent.com"; // Replace with your actual Client ID
    const callBackURI = "http://localhost:5173/"; // Replace with your actual callback URI
    window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`);
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await api.post("accounts/api/token/", values);

      const { access, refresh } = res.data;
      localStorage.setItem(ACCESS_TOKEN, access);
      localStorage.setItem(REFRESH_TOKEN, refresh);

      const decoded = jwtDecode(access);
      const userRole = decoded.role;
      const id = decoded.user_id;
      console.log(id);

      if (userRole === "instructor") {
        const profileRes = await api.get(`http://127.0.0.1:8000/instructor/profiles/${id}`);
        const profile = profileRes.data;

        if (!profile.application_submitted) {
          navigate("/instructor/become_instructor");
        } else if (profile.application_submitted && !profile.admin_reviewed) {
          navigate("/instructor/awaiting-approval");
        } else if (profile.admin_approved) {
          navigate("/instructor/dashboard"); // Create this page
        } else if (profile.admin_rejected) {
          navigate("/instructor/become_instructor");
        }
      } else {
        switch (userRole) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "student":
            navigate("/");
            break;
          default:
            navigate("/login");
            break;
        }
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-blue-500 mb-4">Login</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div className="mb-4">
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4 relative">
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 pr-10"
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              {errors.submit && (
                <div className="text-red-500 text-sm mb-4">Incorrect username or password.</div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <button
          onClick={reachGoogle}
          className="w-full p-2 mb-4 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
        >
          Login with Google
        </button>
        <div className="flex justify-between text-center mt-4">
          <div>
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div>
            <Link to="/" className="text-blue-500 hover:underline">
              Home
            </Link>
            {" | "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
