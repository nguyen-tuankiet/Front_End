import {Bell, Bookmark, Eye, EyeOff, LockKeyhole, Mail, Newspaper} from 'lucide-react';
import {useEffect, useState} from 'react';
import {cn} from "@/lib/utils.js";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "@/components/Context/AuthContext.jsx";
import {useLanguage} from "@/contexts/LanguageContext";

const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
};

const LoginPage = () => {
    const { t } = useLanguage();
    
    useEffect(() => {
        document.title = t('login.title');
    }, [t]);

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const context = useAuth();
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (validateForm()){
            setErrors({})

            const user = {
                email: email,
                name: "Hung Tran",
            }
            context.login(user)
            setTimeout(()=> {
                navigate("/trang-chu");
            }, 300)
        }
    }

    const validateForm = () =>{
        let errors = {};
        if (!email) {
            errors.email = t('login.errors.emailRequired');
        } else if (!isValidEmail(email)) {
            errors.email = t('login.errors.emailInvalid');
        }

        if (!password) {
            errors.password = t('login.errors.passwordRequired');
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
            return "border-border";
        }
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
                        "text-muted-foreground tracking-[0.15em] uppercase transition-all duration-300 text-[9px]")}>
                        Báo điện tử Việt Nam
                    </span>
                </Link>
                <div className="flex flex-col items-center pt-5 pb-5">
                    <p className="title text-3xl font-semibold text-foreground">{t('login.title')}</p>
                    <p className="sub-title text-muted-foreground mt-1 ">{t('login.subtitle')}</p>
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
                                placeholder="22130136@st.hcmuaf.edu"
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
                            {t('login.password')}
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
                        <div className="text-foreground">
                            <input type="checkbox" id="remember"
                                    className="bg-amber-50 mr-2"
                            ></input>
                            <label htmlFor="remember" className="cursor-pointer">{t('login.rememberMe')}</label>
                        </div>

                        <a
                            className="cursor-pointer hover:underline text-primary "
                            href="#"
                        >{t('login.forgotPassword')}</a>
                    </div>

                    {/*LoginAndRegister button*/}
                    <button type={"submit"} className="bg-primary text-white w-full h-10 rounded-xl mt-5 flex justify-center items-center
                                     cursor-pointer select-none hover:bg-primary-500  active:scale-95 active:bg-primary-500/80
                                        transition-all duration-150">
                        {t('login.loginButton')}
                    </button>

                    <div className="flex justify-center text-xs w-full mt-5 relative ">
                        <div className="absolute top-1/2 left-0 border-border border-b w-full"></div>
                        <span className="bg-background z-10 pl-1 pr-1 text-muted-foreground">{t('login.orLoginWith')}</span>
                    </div>

                    <div className="flex row items-center h-10 mt-5">
                        <div className="w-1/2 h-full flex justify-center items-center ml-2 mr-2 border border-border rounded-xl
                                        cursor-pointer hover:bg-accent select-none active:scale-95 active:bg-accent/80
                                        transition-all duration-150 text-foreground">
                            Google
                        </div>
                        <div className="w-1/2 h-full flex justify-center items-center ml-2 mr-2 border border-border rounded-xl
                                        cursor-pointer hover:bg-accent select-none active:scale-95 active:bg-accent/80
                                        transition-all duration-150 text-foreground">
                            Facebook
                        </div>
                    </div>

                    <div className="p-3 flex justify-center mt-5 text-foreground">
                        <span>{t('login.noAccount')}</span>
                        <a href="/dang-ky" className="text-primary pl-2 hover:underline">{t('login.registerNow')}</a>
                    </div>


                </form>

            </div>

            <div className="right-side relative h-screen">
                <img src="/login-bg.jpg" alt="" className="absolute inset-0 object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90"></div>

                <div className="relative z-10 w-3/5  text-white pl-14 pt-40">
                    <p className="text-3xl font-bold">Cập nhật tin tức mọi lúc, mọi nơi</p>
                    <p className="pt-8">Đăng nhập đẻ trải nghiêm đầy đủ các tính năng</p>

                    <div className="pt-8 pb-8">
                        <div className="flex row-auto content-center items-center bg-white/20 p-3 rounded-2xl 
                                        hover:bg-orange-500/40 hover:scale-[1.02] transition-all duration-200 cursor-pointer hover:border-orange-400 border border-transparent">
                            <div className="p-2 bg-white/35 rounded-xl">
                                <Newspaper />
                            </div>
                            <div className="pl-4">
                                <p className="font-bold">Tin tức cá nhân hoá</p>
                                <p className="text-white/80">Nhận tin tức phù hợp với sở thích của bạn</p>
                            </div>
                        </div>

                        <div className="flex row-auto content-center items-center bg-white/20 p-3 rounded-2xl mt-5
                                        hover:bg-orange-500/40 hover:scale-[1.02] transition-all duration-200 cursor-pointer hover:border-orange-400 border border-transparent">
                            <div className="p-2 bg-white/35 rounded-xl">
                                <Bell />
                            </div>
                            <div className="pl-4">
                                <p className="font-bold">Thông báo tức thì</p>
                                <p className="text-white/80">Không bỏ lỡ tin nóng và sự kiện quan trọng</p>
                            </div>
                        </div>

                        <div className="flex row-auto content-center items-center bg-white/20 p-3 rounded-2xl mt-5
                                        hover:bg-orange-500/40 hover:scale-[1.02] transition-all duration-200 cursor-pointer hover:border-orange-400 border border-transparent">
                            <div className="p-2 bg-white/35 rounded-xl">
                                <Bookmark />
                            </div>
                            <div className="pl-4">
                                <p className="font-bold">Lưu bài viết yêu thích</p>
                                <p className="text-white/80">Đọc lại bất cứ lúc nào, kể cả offline</p>
                            </div>
                        </div>


                    </div>

                    <div className="border-t border-white/30"></div>

                    <div className="flex flex-row justify-around mt-8">
                        <div className="flex flex-col items-center ">
                            <p className="font-bold text-3xl">10M+</p>
                            <p>Đọc giả</p>
                        </div>

                        <div className="flex flex-col items-center ">
                            <p className="font-bold text-3xl">500+</p>
                            <p>Bài viết/ngày</p>
                        </div>

                        <div className="flex flex-col items-center ">
                            <p className="font-bold text-3xl">20+</p>
                            <p>Chuyên mục</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;