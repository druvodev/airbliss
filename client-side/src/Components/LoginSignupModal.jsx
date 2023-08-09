import { useState } from "react";

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
            <div className="modal-container bg-white p-6 rounded-lg w-80 relative">
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 absolute top-4 right-4"
                >
                    X {/* Close icon */}
                </button>
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
        </div>
    );
};

export default LoginSignupModal;
