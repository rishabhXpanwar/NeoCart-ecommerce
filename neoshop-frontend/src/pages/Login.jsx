import "../styles/login.css";
import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom"; /* [UPDATE]: Link import kiya register ke liye */
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [form, setform] = useState({
    email: "",
    password: ""
  });

  const { setUser } = useAuth();

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const data = await loginUser(form);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      setUser(data.data);
      alert("Login Successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-wrapper"> {/* [UPDATE]: Class name change kiya styling ke liye */}
      <div className="login-card"> {/* [UPDATE]: 'login-box' se 'login-card' kiya */}
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Login to your NeoShop account</p>
        </div>

        <div className="login-form">
          <div className="input-field">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              onChange={handleChange} 
              name="email" 
            />
          </div>

          <div className="input-field">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              onChange={handleChange} 
              name="password" 
            />
          </div>

          <button className="login-submit-btn" onClick={handleSubmit}>
            Sign In
          </button>
        </div>

        {/* [UPDATE]: Footer section add kiya register link ke liye */}
        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;