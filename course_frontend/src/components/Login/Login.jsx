import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Login() {
	const googleAuth = () => {
		window.open(
			`https://worrisome-shift-frog.cyclic.app/auth/google/callback`,
			"_self"
		);
	};
	const fbAuth = () => {
		window.open(
			`https://worrisome-shift-frog.cyclic.app/auth/facebook/callback`,
			"_self"
		);
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Log in Form</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="/src/../../assets/login.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Members Log in</h2>
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="/src/../../assets/google.png" alt="google icon" />
						<span>Sign in with Google</span>
					</button>
					<button className={styles.google_btn} onClick={fbAuth}>
						<img src="/src/../../assets/google.png" alt="fb icon" />
						<span>Sign in with Facebook</span>
					</button>
					<p className={styles.text}>
						New Here ? <Link to="/signup">Sign Up</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;