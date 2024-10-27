import { Eye } from "lucide-react";
import React, { useState } from "react";
import { loginUser } from "../apiServices";
import { useNavigate } from "react-router-dom";

function LoginTab() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    console.log(loginData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await loginUser({
        email: loginData.email,
        password: loginData.password,
      });

      if (response.data.success) {
        localStorage.setItem("userId", response.data.userId);
        navigate("/category");
      } 
    } catch (error) {
      setMessage(`${error.response?.data?.message || error.message}`);
    }
  }

  return (
    <div className="min-h-[80%] flex items-center justify-center">
      <div className="border border-black/40 rounded-lg w-[32%] px-12 py-8">
        <p className=" text-3xl font-semibold text-center">Login</p>
        <p className=" text-xl pt-5 font-semibold text-center">
          Welcome back to ECOMMERCE
        </p>
        <p className=" text-md text-center">
          The next gen business marketplace
        </p>

        <form onSubmit={handleSubmit}>
          <div className="pt-8 pb-10 space-y-3">
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
            className="uppercase select-none font-semibold bg-black w-full text-white p-2 rounded-lg"
          >
            LOGIN
          </button>
          {message && <p className="text-center w-full inline-flex justify-center bg-red-300 mt-2 p-1 rounded-md">{message}</p>}
        </form>
        <div className="flex select-none gap-2 justify-center pt-3 text-black/70 ">
          <p>Don't have an account?</p>
          <a
            href="/register"
            className="hover:underline hover:text-black hover:cursor-pointer uppercase font-medium"
          >
            SIGN UP
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginTab;
