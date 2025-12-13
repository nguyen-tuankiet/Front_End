import {Bell, Bookmark, Eye, EyeOff, LockKeyhole, Mail, Newspaper, User} from 'lucide-react';
import {useEffect, useState} from 'react';
import {cn} from "@/lib/utils.js";
import {Link, useNavigate} from "react-router-dom";
import {help} from "tailwindcss/src/oxide/cli/help/index.ts";

const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
};

const RegisterPage = () => {
    useEffect(() => {
        document.title = 'Đăng nhập';
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (validateForm()){
            setErrors({})

            const user = {
                email: email,
                name: fullName,
            }
            localStorage.setItem("user", JSON.stringify(user));

            setTimeout(()=> {
                navigate("/trang-chu")
                }, 300)
        }
    }

    const validateForm = () =>{
        let errors = {};
        if(!fullName.trim()){
            errors.fullName = 'Full name is required';
        }
        if (!email) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            errors.email = 'Email invalid';
        }

        if (!password) {
            errors.password = 'Password is required';
        }
        if (!confirmPassword) {
            errors.confirmPassword = 'Confirm password is required';
        }

        if (password && password !== confirmPassword) {
            errors.confirmPassword = 'Password dos not match';
        }

        if (!hasAcceptedPolicy) {
            alert("Vui lòng chấp nhận điều khoản")
            errors.hasAcceptedPolicy = 'Must be accepted';
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

    const handleFullNameChange =(e)=> {
        setFullName(e.target.value);
        if (errors.fullName){
            setErrors(prevErrors => ({...prevErrors, fullName: undefined}));
        }
    }

    const handleConfirmPasswordChange =(e)=> {
        setConfirmPassword(e.target.value);
        if (errors.confirmPassword) {
            setErrors(prevErrors => ({...prevErrors, confirmPassword: undefined}));
        }
    }

    const handlePolicyChange = () => {
        setHasAcceptedPolicy(!hasAcceptedPolicy);
        if (errors.policy) {
            setErrors(prevErrors => ({...prevErrors, policy: undefined}));
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
                        <div className={cn("italic")}>" Tin Tức giúp tôi cập nhật thông tin nhanh chóng và chính xác. Giao diện đẹp, dễ sử dụng! "</div>
                        <div className={cn("flex flex-row mt-5")}>
                            <div className={cn("w-10 h-10 bg-white/35 rounded-full border border-white/30 flex justify-center items-center ")}>
                                TK
                            </div>

                            <div className={cn("flex flex-col ml-3")}>
                                <p className={cn("font-bold")}>Nguyễn Tuấn Kiệt</p>
                                <p className={cn("text-xs text-white/60")}>Tham gia từ 12/2025</p>
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
                <div className="flex flex-col items-center pt-5 pb-5">
                    <p className="title text-3xl font-semibold">Tạo tài khoản mới</p>
                    <p className="sub-title text-gray-400 mt-1 ">Nhập thông tin của bạn để đăng ký</p>
                </div>
                <form onSubmit={handleLogin}>

                    {/*Full name*/}
                    <div>
                        <label htmlFor="email" className="font-medium ">
                            Họ và tên
                        </label>
                        <div className = {cn("email flex flex-row h-10 w-full p-2 mt-2 border rounded-xl",  getBorderClass('fullName'))}>
                            <User className="size-5 mr-3 text-gray-400"/>
                            <input
                                id="email"
                                type="text"
                                placeholder="Nguyễn Văn Kiệt"
                                className="flex-grow border-none outline-none bg-background select-none"
                                value={fullName}
                                onChange={handleFullNameChange}
                            />
                        </div>
                        {errors.fullName && (
                            <p className={cn("text-xs text-red-500")}>{errors.fullName}</p>
                        )}

                    </div>

                    {/*Email*/}
                    <div className="mt-5">
                        <label htmlFor="password" className="font-medium ">
                            Email
                        </label>
                        <div className = {cn("email flex flex-row h-10 w-full p-2 mt-2 border rounded-xl", getBorderClass('email') )}>
                            <Mail className="size-5 mr-3 text-gray-400"/>
                            <input
                                id="password"
                                type= "text"
                                placeholder="user@gmail.com"
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
                        <div className = {cn("email flex flex-row h-10 w-full p-2 mt-2 border rounded-xl", getBorderClass('password') )}>
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

                    {/*Confirm password*/}
                    <div className="mt-5">
                        <label htmlFor="password" className="font-medium ">
                            Xác nhận mật khẩu
                        </label>
                        <div className = {cn("email flex flex-row h-10 w-full p-2 mt-2 border rounded-xl", getBorderClass('confirmPassword') )}>
                            <LockKeyhole className="size-5 mr-3 text-gray-400"/>
                            <input
                                id="password"
                                type= {showConfirmPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="flex-grow border-none outline-none bg-background select-none"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />

                            <button className="bg-transparent border-none, cursor-pointer"
                                    type="button"
                                    onClick={toggleConfirmPassword}>
                                {showConfirmPassword ?
                                    (<EyeOff  className="size-5 mr-3 text-gray-400"></EyeOff>)
                                    : (<Eye  className="size-5 mr-3 text-gray-400"></Eye>)}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className={cn("text-xs text-red-500")}>{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/*Policy*/}
                    <div className="flex flex-row justify-between mt-4 select-none text-sm">
                        <div className="">
                            <input type="checkbox" id="remember"
                                   className="bg-amber-50 mr-2"
                                   defaultChecked={hasAcceptedPolicy}
                                   onClick={handlePolicyChange}
                            ></input>
                            <label htmlFor="remember" className="cursor-pointer">Tôi đồng ý với
                                <a href="/dieu-khoan" className={cn("text-primary hover:underline")}> Điều khoản sử dụng </a>
                                và
                                <a href="/chinh-sach" className={cn("text-primary hover:underline")} > Chính sách bảo mật</a>
                            </label>
                        </div>
                    </div>

                    <button type={"submit"} className="bg-primary text-white w-full h-10 rounded-xl mt-5 flex justify-center items-center
                                     cursor-pointer select-none hover:bg-primary-500  active:scale-95 active:bg-primary-500/80
                                        transition-all duration-150"
                    >
                        Đăng ký
                    </button>

                    <div className="p-3 flex justify-center mt-5">
                        <span>Đã có tài khoản?</span>
                        <a href="/dang-nhap" className="text-primary pl-2 hover:underline">Đăng nhập</a>
                    </div>


                </form>

            </div>


        </div>
    );
};

export default RegisterPage;