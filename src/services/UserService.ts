import User from '../types/User';

const url = 'http://localhost:3001/api/v1';

// le Json envoyer à l'api est formé comme suit:
// {
//   "user": {
//     "email": "string",
//     "password": "string",
//     "first_name": "string",
//     "last_name": "string",
//     "school": "string"
//   }
// }


const UserService = {
  async loginUser(user: User ): Promise<User> {
    const response = await fetch(`${url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const token = await response.json();
    console.log(token);
    return token;
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
