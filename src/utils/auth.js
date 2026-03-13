// Simulated Authentication System
export const loginUser = (name, email) => {
  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    createdAt: new Date().toISOString()
  };
  localStorage.setItem('nutripredict_user', JSON.stringify(user));
  return user;
};

export const getUser = () => {
  const userStr = localStorage.getItem('nutripredict_user');
  return userStr ? JSON.parse(userStr) : null;
};

export const logoutUser = () => {
  localStorage.removeItem('nutripredict_user');
};