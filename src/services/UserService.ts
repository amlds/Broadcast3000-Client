import User from '../types/User';

const url = 'http://localhost:3001/api/v1';

const UserService = {
  async loginUser(user: User): Promise<any> {
    try {
      const response = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const token = await response.json();
      return token;
    } catch (error) {
      console.error(error);
    }
  },

  async signInUser(user: User): Promise<any> {
    try {
      const response = await fetch(`${url}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const newUser = await response.json();
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
};

export default UserService;
