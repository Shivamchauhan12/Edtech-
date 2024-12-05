import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getPasswordResetToken } from "../services/operations/authAPI";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900 text-richblack-50">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-[500px] rounded-lg bg-richblack-800 p-6 lg:p-8 shadow-lg">
          <h1 className="text-2xl font-bold leading-7">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="my-4 text-base leading-6 text-richblack-200">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit} className="space-y-6">
            {!emailSent && (
              <label className="block">
                <p className="mb-2 text-sm font-medium">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full rounded-lg bg-richblack-800 border border-richblack-700 p-3 text-richblack-50 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
                />
              </label>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-50 py-3 font-medium text-richblack-900 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-richblack-800"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-50 hover:text-yellow-50">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
