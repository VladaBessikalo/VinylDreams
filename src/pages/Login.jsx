import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../auth/firebaseConfig.jsx';
import AuthForm from '../components/AuthForm.jsx';

const Login = () => {
    const handleLogin = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    return (
        <>
            <AuthForm
                heading="Login"
                onSubmit={handleLogin}
                linkText="Don't have an account?"
                linkPath="/signup"
                errorMessage="Invalid credentials"
            />
        </>
    );
};

export default Login;
