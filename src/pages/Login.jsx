import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({}) {
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const { email, password } = userInput;

  useEffect(() => {
    if (token) {
      navigate("/products");
    }
  }, [token]);

  const onChange = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (email.length <= 0 || password.length <= 0) {
      alert("Please enter valid credentials, or signup to create an account.");
    } else {
      try {
        const response = await fetch(
          "https://strangers-things.herokuapp.com/api/2302-ACC-PT-WEB-PT-C/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                username: email,
                password,
              },
            }),
          }
        );
        const result = await response.json();
        console.log(result);
        setToken(result.data.token);
        setUserInput({ email: "", password: "" });
      } catch (error) {
        setError(error.message);
        navigate("/");
        alert("Invalid username or password, please try again.");
        setUserInput({ email: "", password: "" });
      }
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"></div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            onClick={() => navigate("/register")}
          >
            Create an Account
          </a>
        </p>
      </div>
      {/* /////////// */}
      {/* <div className="bg-gray flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Log In
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Username</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
            />
          </div>
          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          <button
            className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
            onClick={() => navigate("/products")}
          >
            Log In
          </button>
        </form>
      </div> */}
    </>
  );
}
