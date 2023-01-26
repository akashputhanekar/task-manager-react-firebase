import { Navigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Logout = () => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            /**
             * User is successfully signed out of firebase
             */
            localStorage.removeItem('user');
        })
        .catch((error) => {
            console.log('Errored out :: While signing out :: ', error);
        });
    return <Navigate to='/login' />;
};

export default Logout;
