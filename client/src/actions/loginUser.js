export function loginUser(user) {
  console.log('login User action', user);
  return {
    type: 'LOGIN_USER',
    user
  };
}
