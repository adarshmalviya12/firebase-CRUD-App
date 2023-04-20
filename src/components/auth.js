import { useState } from "react"
import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"



export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    // 
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    //

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setIsLogin(true)
            console.warn(`signed in with ${auth?.currentUser?.email}`);
        } catch (error) {
            console.log(error);
        }
    };

    //
    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLogin(true)
            console.warn(`signed in with ${auth?.currentUser?.email}`);
        } catch (error) {
            console.log(error);
        }
    };

    //

    const handleSignInWithGoogle = async (event) => {
        event.preventDefault();
        try {
            await signInWithPopup(auth, googleProvider);
            setIsLogin(true)
            console.warn(`signed in with ${auth?.currentUser?.email}`);
        } catch (error) {
            console.log(error);
        }
    };

    //
    const handleLogout = async () => {
        try {
            alert(`logged out with ${auth?.currentUser?.email}`);
            await signOut(auth);
            setIsLogin(false)
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <form>
            {
                isLogin ? <button className="btn logout" onClick={handleLogout}>
                    Log Out
                </button> : <div>
                    <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
                    />
                    <input
                        className="input"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={handlePasswordChange}
                        autoComplete="current-password"
                    />

                    <div>

                        <button type="button" onClick={toggleShowPassword}>
                            {showPassword ? "Hide password" : "Show password"}
                        </button>
                        <br />
                        <button className="btn signIn" onClick={handleSignIn}>
                            Sign in
                        </button>

                        <button className="btn signInWithGoogle" onClick={handleSignInWithGoogle}>
                            Sign in with Google
                        </button>

                        <button className="btn signIn" onClick={handleSignUp}>
                            Sign up
                        </button>
                            <button className="btn btn-red" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                </div>
            }

        </form>
    );
};
export default Auth