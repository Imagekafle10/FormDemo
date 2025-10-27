import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookies';


const ProtectedLayout = () => {
    const { isloggedIn } = useSelector(state => state.auth);
    const accessToken = getCookie({ cookieName: 'access_token' });
    // console.log(accessToken,isloggedIn);
    
    return isloggedIn || accessToken ? <Outlet /> : <Navigate to="/loginuser" replace />;
};

export default ProtectedLayout;
