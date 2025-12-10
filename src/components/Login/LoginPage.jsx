import {Eye, EyeOff, LockKeyhole, Mail} from 'lucide-react';
import {useEffect, useState} from 'react';
import {cn} from "@/lib/utils.js";
import {Link} from "react-router-dom";

const LoginPage = () => {
    useEffect(() => {
        document.title = 'Đăng nhập';
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="login-page grid grid-cols-2 gap-4 h-screen">
            <div className="left-side justify-items-center pt-28">
                <Link to="/" className="flex flex-col items-start group">
                    <h1 className={cn(
                        "font-extrabold tracking-tight leading-none transition-all duration-300 text-2xl md:text-3xl"
                    )}>
                        <span className="text-primary">TIN</span>
                        <span className="text-secondary"> TỨC</span>
                    </h1>
                    <span className={cn(
                        "text-gray-400 tracking-[0.15em] uppercase transition-all duration-300 text-[9px]",)}>
                        Báo điện tử Việt Nam
                    </span>
                </Link>
                <div className="flex flex-col items-center pt-10 pb-10">
                    <p className="title text-3xl font-semibold">Đăng nhập</p>
                    <p className="sub-title text-gray-400 mt-3 ">Nhập thông tin tài khoản của bạn để tiếp tục</p>
                </div>
                <form>
                    {/*Email*/}
                    <div>
                        <label htmlFor="email" className="font-medium ">
                            Email
                        </label>
                        <div className="email flex flex-row h-10 w-96 p-2 mt-2 border border-gray-600 rounded-xl">
                            <Mail className="size-5 mr-3 text-gray-400"/>
                            <input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className="flex-grow border-none outline-none bg-background select-none"
                            />
                        </div>
                    </div>

                    {/*Password*/}
                    <div className="mt-5">
                        <label htmlFor="password" className="font-medium ">
                            Mật khẩu
                        </label>
                        <div className="email flex flex-row h-10 w-96 p-2 mt-2 border border-gray-600 rounded-xl">
                            <LockKeyhole className="size-5 mr-3 text-gray-400"/>
                            <input
                                id="password"
                                type= {showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="flex-grow border-none outline-none bg-background select-none"
                            />

                            <button className="bg-transparent border-none, cursor-pointer"
                            type="button"
                            onClick={togglePassword}>
                                {showPassword ?
                                    (<EyeOff  className="size-5 mr-3 text-gray-400"></EyeOff>)
                                        : (<Eye  className="size-5 mr-3 text-gray-400"></Eye>)}
                            </button>
                        </div>
                    </div>

                    {/*Remember*/}
                    <div className="flex flex-row justify-between mt-4">
                        <div className="">
                            <input type="checkbox" id="remember"
                                    className="bg-amber-50 mr-2"
                            ></input>
                            <label htmlFor="remember" className="cursor-pointer">Ghi nhớ đăng nhập ?</label>
                        </div>

                        <a
                            className="cursor-pointer hover:underline text-primary "
                            href="#"
                        >Quên mật khẩu ?</a>
                    </div>

                    {/*Login button*/}
                    <div className="bg-primary text-white h-10 rounded-xl mt-5 flex justify-center items-center
                                     cursor-pointer select-none hover:bg-primary-500
                   ">
                        Đăng nhập
                    </div>
                </form>

            </div>

            <div className="right-side">
                <img src="/login-bg.jpg" alt=""/>
            </div>
        </div>
    );
};

export default LoginPage;