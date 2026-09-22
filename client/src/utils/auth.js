export const logout = (navigate) => {
  localStorage.removeItem('token');
  navigate('/login');
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};