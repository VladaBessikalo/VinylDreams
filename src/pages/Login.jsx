// import { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../auth/firebaseConfig.jsx';
// import { Link, useNavigate } from 'react-router-dom';
// import Header from '../components/Header.jsx';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError('');

//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             navigate('/wishlist');
//         } catch (error) {
//             setError(`Invalid credentials, ${error.message}`);
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <h2>Login</h2>
//             {error && <p>{error}</p>}
//             <form onSubmit={handleLogin}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             <p>Don`t have an account?</p>
//             <Link to="/signup" className="signup">
//                 Sign up
//             </Link>
//         </div>
//     );
// };

// export default Login;

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
