import { useEffect } from 'react';

const LoginPage = () => {   
    useEffect(() => {
        document.title = 'Đăng nhập';
    }, []);

    return (
        <div>
            <h1>Login Page</h1>
        </div>
    );
};

export default LoginPage;