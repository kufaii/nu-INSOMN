import axios from "../config";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ }) {
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCredential({
      ...credential,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios({
        method: "post",
        url: "/login",
        data: credential,
      });
      // console.log(">>>>>>>>>>>>>>>>>>>", data);
      localStorage.access_token = data.data.access_token;
      localStorage.username = data.data.username;

      navigate("/home");
    } catch (error) {
      console.log();
      error;
    }
  };

  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const { data } = await axios({
      method: "post",
      url: "/login/google",
      headers: {
        google_token: response.credential,
      },
    });
    localStorage.access_token = data.accessToken;
    navigate("/home");
  }

  const fetchImage = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "/images",
        headers: {
          authorization: `Bearer ` + localStorage.access_token,
        },
      });
      console.log(">>>>>>>>>>>>>>>", data);
      setImage(data[0]);
      console.log(">>>>>>>>>>>>>>>asdasd", image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImage();
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "1068992585646-c999odkmkj95j9pppb95logkd1qsp8ia.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }, []);
  return (
    <>
      <div className="flex h-screen">
        <div className="hidden lg:flex items-center justify-center flex-1 bg-gray-800 text-black">
          <div className="max-w-md text-center">
            <img src={image?.urls?.small ?? ""} className="w-20%" alt="" />
            <h1 className="text-8xl font-bold mb-6 text-white text-center">
              INSOMN
            </h1>
            <h3 className="text-2xl font-semibold mb-6 text-slate-300 text-center">
              Verily, why must thou sleep when thou canst idle away time here?
            </h3>
          </div>
        </div>
        <div className="w-full bg-gray-900 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-white text-center">
              Login
            </h1>
            <form className="max-w-sm mx-auto" onSubmit={submitHandler}>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email:
                </label>
                <input
                  type="email"
                  value={credential.email}
                  name="email"
                  onChange={changeHandler}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="user@mail.com"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  value={credential.password}
                  name="password"
                  onChange={changeHandler}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
            <div className="flex justify-center items-center">
            <div id="buttonDiv"></div>
            </div>
            <div className="mt-4 text-sm text-slate-400 text-center mt-10">
              <p>
                Hast thou not an account?{" "}
                <Link to="/register" className="text-slate-100 hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
