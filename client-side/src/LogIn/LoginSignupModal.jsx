import { useContext, useRef, useState } from "react";
import LogInSlider from "./LogInSlider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { saveUser } from "../Api/auth";

const LoginSignupModal = ({ onClose, setIsLoginSignupModalOpen }) => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {
    resetPassword,
    signInWithGoogle,
    signIn,
    setLoading,
    loading,
    createUser,
    updateUserProfile,
    signInWithFacebook,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const emailRef = useRef();

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const handleReset = () => {
    const email = emailRef.current.value;
    resetPassword(email)
      .then(() => {
        toast.success("Please check your email for reset link");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const handleSubmitSignUp = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const image = event.target.image.files[0];

    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageUrl = imageData.data.display_url;
        createUser(email, password)
          .then((result) => {
            console.log(result.user);
            updateUserProfile(name, imageUrl)
              .then(() => {
                toast.success("User Created Successfully");
                saveUser(result.user);
                navigate(from, { replace: true });
              })
              .catch((err) => {
                setLoading(false);
              });
            navigate(from, { replace: true });
            setIsLoginSignupModalOpen(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err.message);
      });

    // console.log(name, email, password, formData);
    return;
  };

  const handleSubmitLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signIn(email, password)
      .then((result) => {
        // console.log(result.user);
        saveUser(result.user);
        navigate(from, { replace: true });
        setIsLoginSignupModalOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        // console.log(result.user);
        saveUser(result.user);
        navigate(from, { replace: true });
        setIsLoginSignupModalOpen(false);
      })
      .catch((err) => {
        setLoading(false);

        // console.log(err);
      });
  };

  const handleFacebookSignIn = () => {
    signInWithFacebook()
      .then((result) => {
        // console.log(result.user);
        saveUser(result.user);
        navigate(from, { replace: true });
        setIsLoginSignupModalOpen(false);
      })
      .catch((err) => {
        setLoading(false);

        // console.log(err);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-900">
      <div className="modal-container h-fit bg-white rounded-lg lg:w-[830px] relative overflow-hidden">
        <button
          onClick={onClose}
          // className="text-red-500 z-50 hover:text-gray-700 absolute top-4 right-4"
          className="btn z-50 btn-circle border-white text-white hover:bg-white hover:text-black btn-outline absolute top-4 right-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="p-6">
            <h2 className="text-3xl font-semibold mb-5">
              {isLoginMode
                ? "Sign in or Join AirBliss"
                : "Sign Up or Join AirBliss"}
            </h2>
            <div className="grid grid-cols-2 gap-10">
              <span
                onClick={handleFacebookSignIn}
                className="flex rounded py-1 cursor-pointer hover:bg-blue-500 hover:text-white justify-center text-blue-500 items-center gap-2 border-2 border-blue-500"
              >
                <FaFacebook /> <p>Facebook</p>
              </span>
              <span
                onClick={handleGoogleSignIn}
                className="flex rounded py-1 cursor-pointer justify-center items-center gap-2 border-2 border-[#f14336] text-[#f14336] hover:bg-[#f14336] hover:text-white"
              >
                <FaGoogle /> <p>Google</p>
              </span>
            </div>
            <div className="divider py-6">OR</div>
            {isLoginMode ? (
              <form onSubmit={handleSubmitLogIn}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      ref={emailRef}
                      id="email"
                      required
                      placeholder="Enter Your Email Here"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-cyan-500 bg-gray-50 text-gray-900"
                      data-temp-mail-org="0"
                    />
                  </div>
                  <div>
                    <div className="flex relative justify-between">
                      <label htmlFor="password" className="text-sm mb-2">
                        Password
                      </label>
                    </div>
                    <input
                      type={show ? "text" : "password"}
                      name="password"
                      id="password"
                      required
                      placeholder="Enter Your Password Here"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-cyan-500 bg-gray-50 text-gray-900"
                    />
                    <span
                      className="text-[20px] inline-block absolute lg:right-[472px] top-[320px] right-[40px] lg:top-[321px] cursor-pointer text-gray-900"
                      onClick={() => setShow(!show)}
                    >
                      <span>
                        {show ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-10 items-center mb-4">
                  <div>
                    <button
                      type="submit"
                      className="bg-cyan-500 w-full rounded-md px-5 py-2 text-white"
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <TbFidgetSpinner
                            size={24}
                            className="m-auto animate-spin"
                          />
                          Loading...
                        </div>
                      ) : (
                        "SignIn"
                      )}
                    </button>
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={handleReset}
                      className="text-xs hover:underline hover:text-cyan-500 text-gray-400"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form
                noValidate=""
                action=""
                className="space-y-6 ng-untouched ng-pristine ng-valid"
                onSubmit={handleSubmitSignUp}
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Your Name Here"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-cyan-500 bg-gray-50 text-gray-900"
                      data-temp-mail-org="0"
                    />
                  </div>
                  <div>
                    <label htmlFor="image" className="block mb-2 text-sm">
                      Select Image:
                    </label>
                    <input
                      required
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="Enter Your Email Here"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-cyan-500 bg-gray-50 text-gray-900"
                      data-temp-mail-org="0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label htmlFor="password" className="text-sm mb-2">
                        Password
                      </label>
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      required
                      placeholder="Enter Your Password Here"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-cyan-500 bg-gray-50 text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-cyan-500 w-full rounded-md px-5 py-2 text-white"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <TbFidgetSpinner
                          size={24}
                          className="m-auto animate-spin"
                        />
                        Loading...
                      </div>
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </form>
            )}
            <div
              type="button"
              onClick={switchModeHandler}
              className="text-cyan-500 -mt-0 cursor-pointer underline text-center"
            >
              {isLoginMode
                ? "You have No Account Switch to Sign Up"
                : "You have Account Switch to Login"}
            </div>
          </div>
          <div className="hidden md:flex flex-col">
            <LogInSlider />
            <Link className="flex justify-center mt-2">
              <button className="text-cyan-500 btn btn-sm btn-outline hover:bg-cyan-500 hover:text-white hover:border-cyan-500 my-5">
                Learn about Our Service
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupModal;
