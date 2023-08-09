import { useState } from "react";
import LogInSlider from "./LogInSlider";
import { Link } from 'react-router-dom';

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
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            {isLoginMode ? "Login" : "Sign Up"}
                        </h2>
                        <form onSubmit={submitHandler}>
                            {/* Render appropriate form fields based on isLoginMode */}
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full p-2 border rounded-md"
                                // Add necessary input attributes here
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    className="w-full p-2 border rounded-md"
                                // Add necessary input attributes here
                                />
                            </div>
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
