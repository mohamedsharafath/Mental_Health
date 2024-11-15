import React from "react";
import styles from "./Signin.module.css"; // Import the CSS module

function SignInForm() {
  return (
    <div className="entire-class">
    <form className={styles.form}>
      <span className={styles.heading}>Sign In</span>

      <span className={styles.label}>E-Mail</span>
      <input
        placeholder="Enter E-Mail"
        type="text"
        className={styles.input}
      />

      <span className={styles.label}>Password</span>
      <input
        placeholder="Enter Password"
        type="password"
        className={styles.input}
      />

      <span className={styles.forgot}>
        <a href="/">Forgot password?</a>
      </span>

      <button type="submit" className={styles.submitButton} >
        Submit
      </button>
    </form>
    </div>
  );
}

export default SignInForm;
