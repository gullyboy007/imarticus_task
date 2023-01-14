import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Signup() {
	const googleAuth = () => {
		window.open(
			`/auth/google/callback`,
			"_self"
		);
	};
	const fbAuth = () => {
		window.open(
			`/auth/facebook/callback`,
			"_self"
		);
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Sign up Form</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="../../assets/signup.jpg" alt="signup" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Create Account</h2>
					
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="../../assets/google.png" alt="google icon" />
						<span>Sign up with Google</span>
					</button>
					<button className={styles.google_btn} onClick={fbAuth}>
						<img src="../../assets/google.png" alt="fb icon" />
						<span>Sign up with FB</span>
					</button>
					<p className={styles.text}>
						Already Have Account ? <Link to="/login">Log In</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;