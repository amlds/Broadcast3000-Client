import User from '../types/User';

const url = 'http://localhost:3000/api/v1';

const UserService = {
  async loginUser(user: User): Promise<User> {
    const response = await fetch(`${url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const newUser = await response.json();
    return newUser;
  },

  async signInUser(user: User): Promise<User> {
    const response = await fetch(`${url}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const newUser = await response.json();
    return newUser;
  },
};

export default UserService;
