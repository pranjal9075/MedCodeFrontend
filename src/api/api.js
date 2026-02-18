const BASE_URL = "https://medcodebackend.onrender.com";

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/api/users`);
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
