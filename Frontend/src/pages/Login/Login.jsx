import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"
import "./Login.css"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../config/api";

const Login = () => {

    const input = [
        { name: "username", type: "text" },
        { name: "password", type: "password" }
    ]

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setisError] = useState({})

    const navigate = useNavigate();



    function getValue(value, name) {
        if (name === "username") {
            setUsername(value)
        } else {
            setPassword(value)
        }
    }

   function submit(e) {
    e.preventDefault(); // move to TOP

    const newError = {};

    if (username.length === 0) {
        newError.username = 'Username is Required';
    } else if (username.length < 4) {
        newError.username = 'Username must have 4 characters';
    }

    if (password.length === 0) {
        newError.password = 'Password is required';
    } else if (password.length < 8) {
        newError.password = 'Password must have 8 characters';
    }

    setisError(newError);

    if (Object.keys(newError).length !== 0) {
        return;
    }

    axios.post(getApiUrl("/login"), {
        username,
        password
    }).then((res) => {
        console.log(res.data);


        if (res.data.role === "user") {
            navigate("/");
        } else {
            navigate("/dashboard");
        }

        
    }).catch((err) => {
        console.log(err);
    });
}

    console.log(isError, password, ':::::::::::::::::')

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={submit}>
                <h2>Welcome Back</h2>

                {input.map((item) => (
                    <Input
                        key={item.name}
                        name={item.name}
                        type={item.type}
                        onChange={getValue} errors={isError}
                    />
                ))}

              <Button text="Login" type="submit" />
                <a onClick={() => window.location.href = "/Signup"}>signup</a>
            </form>
        </div>
    )
}

export default Login;