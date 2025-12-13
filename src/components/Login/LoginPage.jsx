import { Mail } from 'lucide-react';
import { useEffect } from 'react';

const LoginPage = () => {   
    useEffect(() => {
        document.title = 'Đăng nhập';
    }, []);

    return (
        <div className="login-page grid grid-cols-2 gap-4 h-screen">
            <div className="left-side justify-items-center pt-28">
                <img src="/logo.png" alt="" className="h-40 w-40"/>
                <p className="title text-3xl font-semibold">Đăng nhập</p>
                <p className="sub-title text-xs ">Nhập thông tin tài khoản của bạn để tiếp tục</p>

                <form >
                    <div className="email">
                        <Mail className="w-5 h-5" />    
                    </div>
                </form>

            </div>

            <div className="right-side">
                <img src="/login-bg.jpg" alt="" />
            </div>
        </div>
    );
};

export default LoginPage;