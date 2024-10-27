import { Eye } from "lucide-react";
import React, { useState } from "react";
import { registerUser } from "../apiServices";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
    console.log(registerData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      const response = await registerUser({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      });
      setMessage(response.data.message);
      if (response.data.success) {
        navigate("/verify-email", { state: { email: registerData.email } });
      }
    } catch (error) {
      setIsSubmitted(false);
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-[80%] flex justify-center items-center">
      <div className="border border-black/40 rounded-lg md:w-[32%] px-12 py-8">
        <p className=" text-3xl font-semibold text-center">
          Create Your Account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="pt-8 pb-10 space-y-3">
            <div className=" space-y-1">
              <p>Name</p>
              <input
                name="name"
                placeholder="Enter your Name"
                className="border rounded-[4px] p-2 w-full border-black/30"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className=" space-y-1">
              <p>Email</p>
              <input
                name="email"
                placeholder="name@xyz.com"
                className="border rounded-[4px] p-2 w-full border-black/30"
                type="email"
                onChange={handleChange}
              />
            </div>
            <div className=" space-y-1">
              <p>Password</p>
              <div className="flex gap-1">
                <input
                  name="password"
                  placeholder="Enter Password"
                  className="border rounded-[4px] p-2 w-full border-black/30"
                  type={show ? "password" : "text"}
                  onChange={handleChange}
                />
                <div
                  role="button"
                  onClick={() => setShow(!show)}
                  className={` rounded-md flex justify-center items-center p-2 ${
                    show ? "bg-black/80" : "bg-black/10"
                  }`}
                >
                  <Eye color={show ? "white" : "black"} />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`uppercase flex items-center justify-center gap-2 select-none font-semibold w-full p-2 rounded-lg ${
              isSubmitted ? "bg-gray-400" : "bg-black text-white"
            }`}
          >
            {isSubmitted ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : null}
            Create Account
          </button>
          {message && (
            <p className="text-center w-full inline-flex justify-center bg-red-300 mt-2 p-1 rounded-md">
              {message}
            </p>
          )}
        </form>

        <div className="flex select-none gap-2 justify-center pt-3 text-black/70 ">
          <p>Have an account?</p>
          <a
            href="/login"
            className="hover:underline hover:text-black hover:cursor-pointer uppercase font-medium"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
