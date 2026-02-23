import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "../config";

const InquiryPopup = ({
  autoOpenDelay = 2500,
  soundSrc = "/sounds/pop.mp3",
}) => {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    phone: "",
    inquiry: "",
    message: "",
  });

  const cardRef = useRef(null);
  const audioRef = useRef(null);

  // Auto-open popup
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), autoOpenDelay);
    return () => clearTimeout(t);
  }, [autoOpenDelay]);

  // Load sound
  useEffect(() => {
    audioRef.current = new Audio(soundSrc);
    audioRef.current.volume = 0.8;
  }, [soundSrc]);

  // Validation
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    else if (!/^\+?[\d\s()-]{7,20}$/.test(form.phone))
      e.phone = "Invalid number";
    if (!form.inquiry) e.inquiry = "Required";
    if (!form.message.trim() || form.message.trim().length < 6)
      e.message = "Min 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const change = (k) => (e) => {
    setForm((s) => ({ ...s, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  // ✅ API SUBMIT
  const submit = async (e) => {
  e.preventDefault();
  if (sending) return;

  if (!validate()) {
    cardRef.current.classList.remove("shake");
    void cardRef.current.offsetWidth;
    cardRef.current.classList.add("shake");
    return;
  }

  try {
    setSending(true);
    audioRef.current?.play().catch(() => {});

    const res = await axios.post(`${API_URL}/api/inquiry`, form);

    if (res.data.success) {
      setSuccess(true);
      setForm({ name: "", phone: "", inquiry: "", message: "" });
      setErrors({});
      setTimeout(() => setSuccess(false), 2000);
    }
  } catch (error) {
    console.error("Inquiry Error:", error);
    const msg = error.response?.data?.message || "Failed to send inquiry";

    // Show backend error on name/phone fields
    setErrors((prev) => ({ ...prev, name: msg, phone: msg }));

    // Shake animation
    cardRef.current.classList.remove("shake");
    void cardRef.current.offsetWidth;
    cardRef.current.classList.add("shake");
  } finally {
    setSending(false);
  }
};



  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-9999">
        <button
          onClick={() => setOpen((s) => !s)}
          className="w-12 h-12 rounded-full bg-linear-to-br from-purple-600 to-cyan-500
          text-white text-xl shadow-lg hover:scale-110 active:scale-95 transition cursor-pointer"
        >
          {open ? "×" : "💬"}
        </button>
      </div>

      {/* Popup Card */}
      {open && (
        <div
          ref={cardRef}
          className={`fixed bottom-20 right-6 w-64 p-4 z-9998
          bg-white rounded-xl border border-gray-200
          shadow-[0_5px_20px_rgba(0,0,0,0.15)]
          animate-popupScale ${Object.keys(errors).length ? "ring-1 ring-red-300" : ""}`}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg cursor-pointer"
          >
            ×
          </button>

          <h3 className="text-[16px] font-semibold text-gray-800 mb-1">
            Medical Coding Inquiry
          </h3>
          <p className="text-[11px] text-gray-500 mb-3">
            ICD-10 • CPT • Modifiers • Billing
          </p>

          <form className="flex flex-col gap-2" onSubmit={submit}>
  <div className="flex flex-col">
    <input
      value={form.name}
      onChange={change("name")}
      placeholder="Name"
      className={`w-full px-3 py-2 text-[13px] rounded-md bg-gray-50 text-gray-800
      ${errors.name ? "border border-red-400" : "border border-gray-300"}`}
    />
    {errors.name && <span className="text-red-500 text-xs mt-0.5">{errors.name}</span>}
  </div>

  <div className="flex flex-col">
    <input
      value={form.phone}
      onChange={change("phone")}
      placeholder="Phone"
      className={`w-full px-3 py-2 text-[13px] rounded-md bg-gray-50 text-gray-800
      ${errors.phone ? "border border-red-400" : "border border-gray-300"}`}
    />
    {errors.phone && <span className="text-red-500 text-xs mt-0.5">{errors.phone}</span>}
  </div>

  <select
    value={form.inquiry}
    onChange={change("inquiry")}
    className={`w-full px-3 py-2 text-[13px] rounded-md bg-gray-50 text-gray-800
    ${errors.inquiry ? "border border-red-400" : "border border-gray-300"}`}
  >
    <option value="">Select Inquiry</option>
    <option value="ICD-10">ICD-10</option>
    <option value="CPT">CPT</option>
    <option value="Modifier">Modifier</option>
    <option value="Billing">Billing</option>
  </select>
  {errors.inquiry && <span className="text-red-500 text-xs mt-0.5">{errors.inquiry}</span>}

  <textarea
    value={form.message}
    onChange={change("message")}
    rows={2}
    placeholder="Message"
    className={`w-full px-3 py-2 text-[13px] rounded-md bg-gray-50 text-gray-800 resize-none
    ${errors.message ? "border border-red-400" : "border border-gray-300"}`}
  />
  {errors.message && <span className="text-red-500 text-xs mt-0.5">{errors.message}</span>}

  <button
    type="submit"
    disabled={sending}
    className="w-full mt-1 py-2 rounded-full text-[13px] font-semibold
    bg-linear-to-r from-purple-500 to-cyan-500 text-white
    shadow-md hover:scale-[1.03] transition cursor-pointer"
  >
    {sending ? "Sending..." : "Send Inquiry"}
  </button>
</form>

        </div>
      )}

      {/* Success Toast */}
      {success && (
        <div className="fixed bottom-32 right-6 z-9999">
          <div className="bg-white px-3 py-2 rounded-md border border-gray-200 shadow-md text-gray-700 text-xs flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-[12px]">
              ✓
            </div>
            Sent successfully!
          </div>
        </div>
      )}

      <style>{`
        @keyframes popupIn {
          from { transform: translateY(12px) scale(.96); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-popupScale { animation: popupIn .25s ease-out; }

        .shake { animation: shake .25s ease-in-out; }
        @keyframes shake {
          25% { transform: translateX(-3px); }
          50% { transform: translateX(3px); }
          75% { transform: translateX(-3px); }
        }
      `}</style>
    </>
  );
};

export default InquiryPopup;
