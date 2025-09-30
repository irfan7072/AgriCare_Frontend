export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken'); // true if token exists
  };