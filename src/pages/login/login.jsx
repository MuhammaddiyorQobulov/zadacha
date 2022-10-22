import axios from "axios";
import React from "react";
import Input from "../../components/input/input";
import { useNavigate } from "react-router-dom";
import cls from "./login.module.scss";

export default function Login({ initialState }) {
  const [state, setState] = React.useState({
    phone: "+99897",
    password: "123",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await axios
      .post("https://profitmodel-server.herokuapp.com/api/auth/login", state)
      .then((d) => {
        localStorage.setItem("token", d.data.data);
        navigate("/product");
        return d.data.data;
      })
      .catch((error) => console.log(error));
    console.log(request);
  };

  const inputs = [
    {
      name: "phone",
      label: "Phone",
      placeholder: "Enter your Phone Number",
      type: "text",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your Password",
      type: "password",
    },
  ];

  return (
    <div className={cls.wrapper}>
      <form onSubmit={handleSubmit} className={cls.form}>
        {inputs.map((i, idx) => (
          <Input
            key={i.name}
            name={i.name}
            label={i.label}
            placeholder={i.placeholder}
            value={state[`${i.name}`]}
            onChange={handleChange}
          />
        ))}

        <button className="btn btn-primary" disabled={false}>
          Login
        </button>
      </form>
    </div>
  );
}
