import React, { useState } from "react";

interface Field {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

interface StudentDetailsFormProps {
  title?: string;
  fields?: Field[];
  submitText?: string;
  onSubmit?: (formData: Record<string, string>) => void;
}

const StudentDetailsForm: React.FC<StudentDetailsFormProps> = ({
  title = "Student Details",
  fields = [
    { id: "name", label: "Name", type: "text", placeholder: "Enter your name" },
    { id: "rollNo", label: "Roll No", type: "text", placeholder: "Enter roll number" },
    { id: "stream", label: "Stream", type: "text", placeholder: "Enter stream" },
    { id: "passingYear", label: "Passing Year", type: "text", placeholder: "Enter passing year" },
    { id: "email", label: "Email Id", type: "email", placeholder: "Enter email ID" },
    { id: "phone", label: "Phone No", type: "text", placeholder: "Enter phone number" },
  ],
  submitText = "Submit",
  onSubmit = () => {},
}) => {

  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {})
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
      <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-[751px] max-h-[916px]">
        <h2 className="text-lg font-bold text-center mb-4 bg-teal-700 text-white py-2 rounded">
          {title}
        </h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div className="mb-4" key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}:
              </label>
              <input
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
                value={formData[field.id]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                required
              />
            </div>
          ))}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
  );
};

export default StudentDetailsForm;
