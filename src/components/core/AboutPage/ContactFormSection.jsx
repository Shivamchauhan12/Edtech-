import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-center text-3xl sm:text-4xl font-semibold">Get in Touch</h1>
      <p className="text-center text-richblack-300 mt-3 text-sm sm:text-base md:text-lg">
        We&apos;d love to hear from you. Please fill out this form.
      </p>
      <div className="mt-12 mx-auto max-w-3xl">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
