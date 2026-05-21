export function loginAdmin(
  email: string,
  password: string
) {
  // temporary frontend auth

  if (
    email === "admin@cockroach.com" &&
    password === "123456"
  ) {
    localStorage.setItem(
      "adminAuth",
      "true"
    );

    return true;
  }

  return false;
}

export function isAdmin() {
  return (
    localStorage.getItem(
      "adminAuth"
    ) === "true"
  );
}

export function logoutAdmin() {
  localStorage.removeItem(
    "adminAuth"
  );
}