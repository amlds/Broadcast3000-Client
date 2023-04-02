import React from "react";
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';


import User from "../types/User";

const FormCreateUser: React.FC = () => {
  const { setToken } = React.useContext(TokenContext);
  const navigate = useNavigate();

  const [user, setUser] = React.useState<User>({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      school: "",
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="first_name">First name</label>
      <input
        type="text"
        name="first_name"
        id="first_name"
        className="input--txt"
        value={user.user.first_name}
        onChange={(e) => setUser({ ...user, user: { ...user.user, first_name: e.target.value } })}
      />
      <label htmlFor="last_name">Last name</label>
      <input
        type="text"
        name="last_name"
        id="last_name"
        className="input--txt"
        value={user.user.last_name}
        onChange={(e) => setUser({ ...user, user: { ...user.user, last_name: e.target.value } })}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        className="input--txt"
        value={user.user.email}
        onChange={(e) => setUser({ ...user, user: { ...user.user, email: e.target.value } })}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        className="input--txt"
        value={user.user.password}
        onChange={(e) => setUser({ ...user, user: { ...user.user, password: e.target.value } })}
      />
      <label htmlFor="school">School</label>
      <input
        type="text"
        name="school"
        id="school"
        className="input--txt"
        value={user.user.school}
        onChange={(e) => setUser({ ...user, user: { ...user.user, school: e.target.value } })}
      />
      <button type="submit" className="btn btn--primary">
        Create
      </button>
    </form>
  );
};

export default FormCreateUser;
