import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setMessage("Invalid verification link.");
      return;
    }

    // Send the token to backend for verification
    fetch(`http://localhost:5000/api/auth/verify-email?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setMessage("✅ Email Verified! Redirecting to login...");
          setTimeout(() => navigate("/login"), 3000); // Redirect after 3s
        } else {
          setMessage("❌ Invalid or expired token.");
        }
      })
      .catch(() => setMessage("❌ Verification failed. Try again later."));
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyEmail;
