import React, { useState } from "react";
import { assets } from "../assets/assets";

export default function MedCodeCertificate() {

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    countryCode: "+91"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/book-demo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: formData.email,
        country_code: formData.countryCode,
        phone: formData.phone
      })
    });

    const data = await response.json();

    if (data.success) {
      alert("Demo Booked Successfully ✅");
      window.open(
        "https://www.youtube.com/@NexusCorporateTrainingCentre/videos",
        "_blank"
      );
    } else {
      alert(data.message || "Invalid Email or Mobile ❌");
    }

  } catch (error) {
    console.error(error);
    alert("Server Error ❌");
  }
};



  return (
    <section className="w-full bg-[#2b2133] text-white" id="targetdiv">

      <div className="max-w-[1200px] mx-auto px-4 py-12 flex flex-col md:flex-row items-start gap-6">

        <div className="flex-1 flex justify-center md:justify-start">
          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
            medcode.tech<sup className="align-super">®</sup>
            <br />
            Ranks #1 for
            <br />
            Medical Coding
            <br />
            Course in India
          </h1>
        </div>

        <div className="w-full md:w-[420px]">
          <div className="bg-white text-gray-900 rounded-xl p-6 shadow-2xl border-4 border-[#f3eaff]">
            <h3 className="text-center text-xl font-semibold mb-4">
              Book A Demo Class,{" "}
              <span className="text-red-500">For 99$ Free !</span>
            </h3>

            {/* ✅ FORM UPDATED */}
            <form className="space-y-4" onSubmit={handleSubmit}>

              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 placeholder-gray-400"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />

              <div className="flex gap-3 flex-wrap">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="min-w-[110px] px-3 py-3 rounded-lg border border-gray-200"
                >
                  <option value="+91">India +91</option>
                  <option value="+1">USA +1</option>
                  <option value="+44">UK +44</option>
                  <option value="+81">Japan +81</option>
                </select>

                <input
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 placeholder-gray-400"
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <button className="w-full bg-[#4b2b78] text-white py-3 rounded-lg font-semibold hover:bg-blue-900 cursor-pointer">
                SUBMIT »
              </button>
            </form>

          </div>
        </div>

        <div className="flex-1 hidden md:flex justify-start">
          <div className="w-[420px] rounded-lg overflow-hidden shadow-lg border-4 border-[#f3eaff] bg-white">
            <img
              src={assets.certificate}
              alt="certificate"
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="md:hidden flex justify-center mt-6 px-4">
        <div className="w-[90%] max-w-[350px] rounded-lg overflow-hidden shadow-lg border-4 border-[#f3eaff] bg-white">
          <img
            src={assets.certificate}
            alt="certificate"
            className="w-full object-contain"
          />
        </div>
      </div>

    </section>
  );
}
