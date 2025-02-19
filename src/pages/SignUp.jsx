// import { useState } from 'react';
// import { useAuth } from '../auth/context/AuthContext.jsx';
// import { Link, useNavigate } from 'react-router-dom';

// const SignUp = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const { signUp } = useAuth();
//     const navigate = useNavigate();

//     const handleSignUp = async (e) => {
//         e.preventDefault();
//         try {
//             await signUp(email, password);
//             navigate('/vinyldreams');
//         } catch (error) {
//             setError('Failed to create an account. Try again.', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Sign Up</h2>
//             {error && <p>{error}</p>}
//             <form onSubmit={handleSignUp}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Sign Up</button>
//             </form>
//             <p>Do you have an account?</p>
//             <Link to="/login"> Login </Link>
//         </div>
//     );
// };

// export default SignUp;

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
