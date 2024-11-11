"use client";

import Errors from "@/app/types/errors";
import React, { useState } from "react";
import { z, ZodError } from "zod";

const Validation = () => {
  const userSchema = z.object({
    idNumber: z.string().min(9, "ID must contain at least 9 characters"),
    firstName: z
      .string()
      .min(2, "First name must contain at least 2 characters"),
    lastName: z.string().min(2, "Last name must contain at least 2 characters"),
    dateOfBirth: z
      .date()
      .max(new Date(), { message: "Date of birth must be in the past" }),
    email: z.string().email("Invalid email"),
  });

  const [formData, setFormData] = useState({
    idNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validData = {
        ...formData,
        dateOfBirth: new Date(formData.dateOfBirth),
      };

      userSchema.parse(validData);
      alert("User registered successfully!");
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-xl rounded-xl p-8 mb-8"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Create Account
      </h2>

      <label className="block text-gray-700 text-sm font-medium mb-4">
        ID Number:
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          required
          className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-300"
        />
        {errors.idNumber && (
          <p className="text-red-500 text-xs italic mt-1">{errors.idNumber}</p>
        )}
      </label>

      <label className="block text-gray-700 text-sm font-medium mb-4">
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-300"
        />
        {errors.firstName && (
          <p className="text-red-500 text-xs italic mt-1">{errors.firstName}</p>
        )}
      </label>

      <label className="block text-gray-700 text-sm font-medium mb-4">
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-300"
        />
        {errors.lastName && (
          <p className="text-red-500 text-xs italic mt-1">{errors.lastName}</p>
        )}
      </label>

      <label className="block text-gray-700 text-sm font-medium mb-4">
        Date of Birth:
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
          className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-300"
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.dateOfBirth.toString()}
          </p>
        )}
      </label>

      <label className="block text-gray-700 text-sm font-medium mb-4">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-300"
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
        )}
      </label>

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 mt-6"
      >
        Register
      </button>
    </form>
  );
};

export default Validation;
