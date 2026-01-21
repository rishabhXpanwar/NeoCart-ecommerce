import "../styles/login.css"; // [UPDATE]: Same CSS reuse ho rahi hai isliye classes match rakhi hain
import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom"; // [UPDATE]: Link add kiya login par wapas jane ke liye
import { useAuth } from "../context/AuthContext";

function Register() {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async () => {
    try {
      const data = await registerUser(form);
      alert("Registration Successful");
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      setUser(data.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  }

  return (
    /* [UPDATE]: 'login-wrapper' class use ki hai login.css se consistency ke liye */
    <div className="login-wrapper"> 
      <div className="login-card">
        <div className="login-header">
          <h2>Join NeoShop</h2>
          <p>Create an account to start shopping</p>
        </div>

        <div className="login-form">
          {/* [UPDATE]: Har input ko 'input-field' wrapper aur label ke sath dala hai */}
          <div className="input-field">
            <label>Full Name</label>
            <input type="text" placeholder="Your Name" onChange={handleChange} name="name" />
          </div>

          <div className="input-field">
            <label>Email Address</label>
            <input type="email" placeholder="name@example.com" onChange={handleChange} name="email" />
          </div>

          <div className="input-field">
            <label>Password</label>
            <input type="password" placeholder="Min. 8 characters" onChange={handleChange} name="password" />
          </div>

          <button className="login-submit-btn" onClick={handleSubmit}>
            Create Account
          </button>
        </div>

        {/* [UPDATE]: Footer section add kiya login link ke liye */}
        <div className="login-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;