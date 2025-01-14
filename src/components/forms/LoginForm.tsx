import React, { useState } from "react";

const LoginForm = ({
  title = "Student Login",
  usernameLabel = "Username:*",
  passwordLabel = "Password:*",
  forgotPasswordText = "Forgot Password?",
  submitText = "Login",
  cancelText = "Cancel",
  onSubmit = (p0: { username: string; password: string; }) => {},
  onCancel = () => {},
  onForgotPassword = () => {},
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-t-xl p-6">
          <h2 className="text-2xl font-bold text-center text-white">
            {title}
          </h2>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {usernameLabel}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-150 ease-in-out"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {passwordLabel}
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-150 ease-in-out"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div 
              className="text-sm text-teal-600 hover:text-teal-700 text-center cursor-pointer font-medium transition duration-150 ease-in-out"
              onClick={onForgotPassword}
            >
              {forgotPasswordText}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-150 ease-in-out"
              >
                {submitText}
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-150 ease-in-out"
                onClick={onCancel}
              >
                {cancelText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;