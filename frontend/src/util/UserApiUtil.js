import axios from 'axios';

export const currentUserDetails = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  avatarUrl: user.avatarUrl,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const fetchUsers = () => axios.get('/api/users');

export const fetchUser = (userId) => {
  return axios.get(`/api/users/${userId}`);
};

export const updateUser = (userData) => {
  return axios.patch(`/api/users/${userData.id}`, userData);
};
