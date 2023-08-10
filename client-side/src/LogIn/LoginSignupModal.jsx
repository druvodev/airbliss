import { useState } from "react";
import LogInSlider from "./LogInSlider";
import { Link } from 'react-router-dom';
import { FaFacebook, FaGoogle } from "react-icons/fa";

const LoginSignupModal = ({ onClose }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const switchModeHandler = () => {
        setIsLoginMode((prevMode) => !prevMode);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        // Handle login or signup submission here
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-900">
            <div className="modal-container bg-white rounded-lg w-[830px] relative">
                <button
                    onClick={onClose}
                    // className="text-red-500 z-50 hover:text-gray-700 absolute top-4 right-4"
                    className="btn z-50 btn-circle border-white text-white hover:bg-white hover:text-black btn-outline absolute top-4 right-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="grid grid-cols-2 gap-5">
                    <div className="p-6">
                        <h2 className="text-3xl font-semibold mb-5">
                            {isLoginMode ? "Sign in or Join ClubMiles" : "Sign Up or Join ClubMiles"}
                        </h2>
                        <div className="grid grid-cols-2 gap-10">
                            <span className="flex rounded py-1 cursor-pointer hover:bg-blue-500 hover:text-white justify-center text-blue-500 items-center gap-2 border-2 border-blue-500">
                                <FaFacebook /> <p>Facebook</p>
                            </span>
                            <span className="flex rounded py-1 cursor-pointer justify-center items-center gap-2 border-2 border-[#f14336] text-[#f14336] hover:bg-[#f14336] hover:text-white">
                                <FaGoogle /> <p>Google</p>
                            </span>
                        </div>
                        <div className="divider py-6">OR</div>
                        <form onSubmit={submitHandler}>
                            {/* Render appropriate form fields based on isLoginMode */}
                            
                            <div className="flex justify-between items-center mb-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    {isLoginMode ? "Login" : "Sign Up"}
                                </button>
                                <button
                                    type="button"
                                    onClick={switchModeHandler}
                                    className="text-blue-500 underline"
                                >
                                    {isLoginMode ? "Switch to Sign Up" : "Switch to Login"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <LogInSlider />
                        <Link className="flex justify-center">
                            <button className="text-cyan-500 btn btn-sm btn-outline hover:bg-cyan-500 hover:text-white hover:border-cyan-500 my-5">Learn about Our Service</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignupModal;
