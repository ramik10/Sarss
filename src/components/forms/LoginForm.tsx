import React, { useState } from "react";

const LoginForm = ({
  title = "Student Login",
  usernameLabel = "Username:*",
  passwordLabel = "Password:*",
  forgotPasswordText = "Forgot Password!!",
  submitText = "Submit",
  cancelText = "Cancel",
  onSubmit = (p0: { username: string; password: string; }) => {},
  onCancel = () => {},
  onForgotPassword = () => {},
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e:any) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-80">
        <h2 className="text-lg font-bold text-center mb-4 bg-teal-700 text-white py-2 rounded">
          {title}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              {usernameLabel}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {passwordLabel}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div
            className="mb-4 text-sm text-teal-600 text-center cursor-pointer"
            onClick={onForgotPassword}
          >
            {forgotPasswordText}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {submitText}
            </button>
            <button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={onCancel}
            >
              {cancelText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

