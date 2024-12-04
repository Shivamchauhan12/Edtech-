import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

import CountryCode from "../../data/countrycode.json";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  // Prepare country code options for the dropdown
  const countryCodeOptions = CountryCode.map((ele) => ({
    value: ele.code,
    label: `${ele.code} - ${ele.country}`,
  }));

  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countryCodeOptions[0]
  );

  const submitContactForm = async (data) => {
    try {
      setLoading(true);
      const formData = { ...data, countrycode: selectedCountryCode.value };
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        formData
      );
      console.log("Response: ", res);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
      setSelectedCountryCode(countryCodeOptions[0]);
    }
  }, [reset, isSubmitSuccessful, countryCodeOptions]);

  return (
    <form
      className="flex flex-col gap-8 bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto"
      onSubmit={handleSubmit(submitContactForm)}
    >
      {/* First Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="firstname" className="text-sm font-medium text-gray-300">
          First Name
        </label>
        <input
          type="text"
          id="firstname"
          placeholder="Enter first name"
          className="form-style rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-gray-100 focus:border-yellow-500 focus:ring-yellow-500"
          {...register("firstname", { required: true })}
        />
        {errors.firstname && (
          <span className="text-sm text-red-500">
            Please enter your first name.
          </span>
        )}
      </div>

      {/* Last Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="lastname" className="text-sm font-medium text-gray-300">
          Last Name
        </label>
        <input
          type="text"
          id="lastname"
          placeholder="Enter last name"
          className="form-style rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-gray-100 focus:border-yellow-500 focus:ring-yellow-500"
          {...register("lastname")}
        />
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-300">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className="form-style rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-gray-100 focus:border-yellow-500 focus:ring-yellow-500"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-sm text-red-500">
            Please enter your email address.
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
        <div className="w-full sm:w-[150px]">
          <Select
            options={countryCodeOptions}
            value={selectedCountryCode}
            onChange={setSelectedCountryCode}
            placeholder="Select Code"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#1F2937", // bg-gray-800
                color: "#D1D5DB", // text-gray-300
                borderColor: "#4B5563", // border-gray-600
                boxShadow: "none",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#D1D5DB", // text-gray-300
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#1F2937", // bg-gray-800
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#374151" : "#1F2937", // bg-gray-700
                color: "#D1D5DB", // text-gray-300
              }),
            }}
          />
        </div>
        <input
          type="number"
          id="phonenumber"
          placeholder="12345 67890"
          className="form-style flex-1 rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-gray-100 focus:border-yellow-500 focus:ring-yellow-500"
          {...register("phoneNo", {
            required: {
              value: true,
              message: "Please enter your Phone Number.",
            },
            maxLength: { value: 12, message: "Invalid Phone Number" },
            minLength: { value: 10, message: "Invalid Phone Number" },
          })}
        />
        {errors.phoneNo && (
          <span className="text-sm text-red-500">{errors.phoneNo.message}</span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          rows="5"
          placeholder="Enter your message here"
          className="form-style rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-gray-100 focus:border-yellow-500 focus:ring-yellow-500"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="text-sm text-red-500">
            Please enter your message.
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-500 px-6 py-3 text-sm font-bold text-black shadow-lg transition-all duration-200 hover:scale-95 hover:shadow-none disabled:bg-gray-600 sm:text-base ${
          loading ? "cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactUsForm;
