export const canActivateGuard = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated;
};
