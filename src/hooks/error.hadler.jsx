import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useAuthErrorHandler = () => {
  const navigate = useNavigate();

  const handleAuthError = (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401 || status === 403) {
        // Tokenni tozalash
        localStorage.removeItem('access_token'); // Agar token LocalStorage'da bo'lsa
        sessionStorage.removeItem('access_token'); // Agar token SessionStorage'da bo'lsa
        // Login sahifasiga yo'naltirish
        navigate('/login');
        toast.warning('Siz ro\'yhatdan o\'tgan yoki login qilmagansiz');
      }
    }
    // Xatoni qayta chiqarish
    throw error;
  };

  return handleAuthError;
};
