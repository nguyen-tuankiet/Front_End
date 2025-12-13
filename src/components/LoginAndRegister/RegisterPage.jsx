import {Bell, Bookmark, Eye, EyeOff, LockKeyhole, Mail, Newspaper} from 'lucide-react';
import {useEffect, useState} from 'react';
import {cn} from "@/lib/utils.js";
import {Link, useNavigate} from "react-router-dom";

const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
};

const RegisterPage = () => {
    useEffect(() => {
        document.title = 'Đăng nhập';
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (validate()){
            setErrors({})
            navigate("/trang-chu");
        }
    }

    const validate = () =>{
        let errors = {};
        if (!email) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            errors.email = 'Email invalid';
        }

        if (!password) {
            errors.password = 'Password is required';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) {
            setErrors(prevErrors => ({...prevErrors, email: undefined}));
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors(prevErrors => ({...prevErrors, password: undefined}));
        }
    }

    const getBorderClass = field => {
        if (errors[field]) {
            return "border-red-500";
        }
        else {
            return "border-gray-600";
        }
    }



    return (
        <div className="login-page grid grid-cols-2 gap-4 h-screen">

            <div className=" relative h-screen">
                <img src="/register-bg.jpg" alt="" className="absolute inset-0 object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/80 to-primary/90"></div>

                <div className="relative z-10 w-3/5  text-white pl-14 pt-40">
                    <p className="text-3xl font-bold">Tham gia cộng đồng đọc giả</p>
                    <p className="pt-8">Kết nối với hàng triệu độc giả và chia sẻ quan điểm của bạn</p>

                    <div className="pt-8 pb-8">
                        <div className="flex row-auto content-center items-center bg-white/20 p-3 rounded-2xl ">
                            <div className="p-2 bg-white/35 rounded-xl">
                                <Newspaper />
                            </div>
                            <div className="pl-4">
                                <p className="font-bold">Cộng đồng sôi động</p>
                                <p className="text-white/80">Kết nối với độc giả có cùng sở thích</p>
                            </div>
                        </div>

                        <div className="flex row-auto content-center items-center bg-white/20 p-3 rounded-2xl mt-5">
                            <div className="p-2 bg-white/35 rounded-xl">
                                <Bell />
                            </div>
                            <div className="pl-4">
                                <p className="font-bold">Bình luận & Thảo luận</p>
                                <p className="text-white/80">Chia sẻ quan điểm về các vấn đề thời sự</p>
                            </div>
                        </div>

                        <div className="flex row-auto content-center items-center bg-white/20 p-3 rounded-2xl mt-5">
                            <div className="p-2 bg-white/35 rounded-xl">
                                <Bookmark />
                            </div>
                            <div className="pl-4">
                                <p className="font-bold">Tích điểm & Ưu đãi</p>
                                <p className="text-white/80">Nhận quà tặng khi tham gia tích cực</p>
                            </div>
                        </div>


                    </div>

                    <div className="border-t border-white/30"></div>

                    <div className="flex flex-col justify-around mt-8 bg-white/20 rounded-xl border border-white/25 p-5
                               ">
                        <div className={cn("italic")}>"Tin Tức giúp tôi cập nhật thông tin nhanh chóng và chính xác. Giao diện đẹp, dễ sử dụng!"</div>
                        <div>
                            <div className={cn("")}>
                                TK
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="justify-items-center pt-28">
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
                <form onSubmit={handleLogin}>
                    {/*Email*/}
                    <div>
                        <label htmlFor="email" className="font-medium ">
                            Email
                        </label>
                        <div className = {cn("email flex flex-row h-10 w-96 p-2 mt-2 border rounded-xl",  getBorderClass('email'))}>
                            <Mail className="size-5 mr-3 text-gray-400"/>
                            <input
                                id="email"
                                type="text"
                                placeholder="name@example.com"
                                className="flex-grow border-none outline-none bg-background select-none"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        {errors.email && (
                            <p className={cn("text-xs text-red-500")}>{errors.email}</p>
                        )}

                    </div>

                    {/*Password*/}
                    <div className="mt-5">
                        <label htmlFor="password" className="font-medium ">
                            Mật khẩu
                        </label>
                        <div className = {cn("email flex flex-row h-10 w-96 p-2 mt-2 border rounded-xl", getBorderClass('password') )}>
                            <LockKeyhole className="size-5 mr-3 text-gray-400"/>
                            <input
                                id="password"
                                type= {showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="flex-grow border-none outline-none bg-background select-none"
                                value={password}
                                onChange={handlePasswordChange}
                            />

                            <button className="bg-transparent border-none, cursor-pointer"
                                    type="button"
                                    onClick={togglePassword}>
                                {showPassword ?
                                    (<EyeOff  className="size-5 mr-3 text-gray-400"></EyeOff>)
                                    : (<Eye  className="size-5 mr-3 text-gray-400"></Eye>)}
                            </button>
                        </div>
                        {errors.password && (
                            <p className={cn("text-xs text-red-500")}>{errors.password}</p>
                        )}
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

                    {/*LoginAndRegister button*/}
                    <button type={"submit"} className="bg-primary text-white w-full h-10 rounded-xl mt-5 flex justify-center items-center
                                     cursor-pointer select-none hover:bg-primary-500  active:scale-95 active:bg-primary-500/80
                                        transition-all duration-150">
                        Đăng nhập
                    </button>

                    <div className="flex justify-center text-xs w-full mt-5 relative ">
                        <div className="absolute top-1/2 left-0 border-gray-400 border-b w-full"></div>
                        <span className="bg-background z-10 pl-1 pr-1 text-gray-400">HOẶC ĐĂNG NHẬP VỚI</span>
                    </div>

                    <div className="flex row items-center h-10 mt-5">
                        <div className="w-1/2 h-full flex justify-center items-center ml-2 mr-2 border border-gray-600 rounded-xl
                                        cursor-pointer hover:bg-accent select-none active:scale-95 active:bg-accent/80
                                        transition-all duration-150">
                            Google
                        </div>
                        <div className="w-1/2 h-full flex justify-center items-center ml-2 mr-2 border border-gray-600 rounded-xl
                                        cursor-pointer hover:bg-accent select-none active:scale-95 active:bg-accent/80
                                        transition-all duration-150">
                            Facebook
                        </div>
                    </div>

                    <div className="p-3 flex justify-center mt-5">
                        <span>Chưa có tài khoản ?</span>
                        <a href="/dang-ki" className="text-primary pl-2 hover:underline">Đăng kí ngay</a>
                    </div>


                </form>

            </div>


        </div>
    );
};

export default RegisterPage;