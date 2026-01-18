import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobalShortcuts = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event) => {

            if ((event.ctrlKey || event.metaKey) && event.key === 'h') {
                event.preventDefault();
                navigate('/trang-chu');
            }

            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault();
                navigate('/tim-kiem');
            }

            if ((event.ctrlKey || event.metaKey) && event.key ==='i') {
                event.preventDefault();
                navigate('tien-ich/thoi-tiet');
            }

            if (event.key === 'Delete' || event.key === 'Backspace') {
                event.preventDefault();
                navigate(-1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [navigate]);
    return null;
};

export default GlobalShortcuts;