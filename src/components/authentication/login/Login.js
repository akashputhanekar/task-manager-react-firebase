import { useContext, useState } from 'react';
import './login.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';

const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                /**
                 * User is successfully authenticated & signed in using firebase
                 */
                const user = userCredential.user;
                console.log(
                    'User is successfully authenticated & signed in using firebase - ',
                    user
                );
                dispatch({ type: 'LOGIN', payload: user });
                navigate('/manage-tasks');
            })
            .catch((error) => {
                console.log('Errored out :: While authentication :: ', error);
                setError(true);
            });
    };

    return (
        <div className='login_screen_background'>
            <div className='background'>
                <div className='shape'></div>
                <div className='shape'></div>
            </div>
            <form id='login_screen_form' onSubmit={handleLogin}>
                <h3>
                    <b>NeoSOFT</b>
                </h3>
                <label htmlFor='username' className='login_screen_label'>
                    <b>Email</b>
                </label>
                <input
                    type='text'
                    className='login_screen_input'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password' className='login_screen_label'>
                    <b>Password</b>
                </label>
                <input
                    type='password'
                    className='login_screen_input'
                    autoComplete='on'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button id='login_screen_button' type='submit'>
                    Log In
                </button>
                {error && (
                    <p id='login_screen_error_message'>
                        Invalid credentials, Please try again
                    </p>
                )}
            </form>
        </div>
    );
};

export default Login;
