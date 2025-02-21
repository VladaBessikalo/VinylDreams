import { useAuth } from '../auth/context/AuthContext.jsx';
import AuthForm from '../components/AuthForm.jsx';

const SignUp = () => {
    const { signUp } = useAuth();

    const handleSignUp = async (email, password) => {
        await signUp(email, password);
    };

    return (
        <AuthForm
            heading="Sign Up"
            onSubmit={handleSignUp}
            linkText="Already have an account?"
            linkPath="/login"
            errorMessage="Failed to create an account. Try again."
        />
    );
};

export default SignUp;
