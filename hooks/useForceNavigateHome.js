import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useForceNavigateHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      navigate('/', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
};

export default useForceNavigateHome;
