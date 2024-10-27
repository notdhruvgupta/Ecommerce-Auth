import React, { useEffect, useRef, useState } from "react";
import { verifyEmail } from "../apiServices";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const emailId = location.state?.email;
  const [otp, setOtp] = useState(Array(8).fill(""));
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = async (e) => {
    const otpCode = otp.join("");
    console.log(otpCode);
    e.preventDefault();
    try {
      const response = await verifyEmail({
        code: otpCode,
      });
      setMessage(response.data.message);
      if(response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  function hideEmail(email) {
    const [username, domain] = email.split("@");

    const hiddenUsername =
      username.length > 2
        ? username.slice(0, 2) + "*".repeat(username.length - 2)
        : username;

    return `${hiddenUsername}@${domain}`;
  }

  return (
    <div className="min-h-[80%] flex items-center justify-center">
      <div className="w-[32%] border border-black/40 px-10 py-8 rounded-lg">
        <p className="text-3xl text-center font-semibold">Verify your email</p>
        <div className="py-5">
          <p className="text-lg text-center">
            Enter the 8 digit code you have received on
          </p>
          <p className=" font-medium text-lg text-center">
            {hideEmail(emailId)}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <p className="pb-1 font-semibold">Code</p>
            <div className="grid grid-cols-8 gap-2">
              {otp.map((_, index) => (
                <input
                  focus
                  className=" border border-black/20 p-2 text-center rounded-md"
                  key={index}
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="uppercase select-none font-semibold bg-black w-full text-white p-2 rounded-lg mt-10"
          >
            verify
          </button>
          {message && <p className="flex justify-center bg-red-300 mt-2 p-1 px-2 rounded-md">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
