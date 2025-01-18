import { StudentFormData } from '../types';

export const validateStudentForm = (data: StudentFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Required field validation
  if (!data.studentId) errors.studentId = 'Student ID is required';
  if (!data.fullName) errors.fullName = 'Full name is required';
  if (!data.course) errors.course = 'Course is required';
  if (!data.batch) errors.batch = 'Batch is required';

  // Email validation
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  // Phone validation
  if (!data.phone) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10}$/.test(data.phone)) {
    errors.phone = 'Invalid phone number (must be 10 digits)';
  }

  // Date validation
  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const dob = new Date(data.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 15 || age > 30) {
      errors.dateOfBirth = 'Student must be between 15 and 30 years old';
    }
  }

  return errors;
};