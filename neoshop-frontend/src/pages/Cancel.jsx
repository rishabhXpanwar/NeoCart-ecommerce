import { useNavigate } from "react-router-dom";
/* [UPDATE]: External CSS import add kiya (aap isse naya file bana sakte hain ya login.css mein add kar sakte hain) */
import "../styles/cancel.css"; 

function Cancel() {
  const navigate = useNavigate();

  return (
    /* [UPDATE]: 'cancel-page' wrapper add kiya layout center karne ke liye */
    <div className="cancel-page">
      <div className="cancel-card">
        {/* [UPDATE]: Visual Error icon add kiya */}
        <div className="cancel-icon">
          <span>!</span>
        </div>

        <h1 className="cancel-title">Payment Cancelled</h1>
        <p className="cancel-message">
          Oops! It looks like your payment was not completed. Don't worry, no money was deducted from your account.
        </p>

        <div className="cancel-actions">
          {/* [UPDATE]: Buttons ko classes di taaki styling professional lage */}
          <button className="btn btn-outline" onClick={() => navigate("/cart")}>
            Review Cart
          </button>
          
          <button className="btn btn-retry" onClick={() => navigate("/checkout")}>
            Try Payment Again
          </button>
        </div>

        <p className="support-text">If you're facing issues, please contact our support.</p>
      </div>
    </div>
  );
}

export default Cancel;