import Input from "../../components/Input/Input";
import "./Signup.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { getApiUrl } from "../../config/api";

const Signup = () => {

    const input = [
        { name: "username", type: "text" },
        { name: "password", type: "password" },
        { name: "confirmPassword", type: "password" }
    ];

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    // Handle input values
    function getValue(value, name) {
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    }

    function submit(e) {
        e.preventDefault();

        const newError = {};

        // Username validation
        if (username.length === 0) {
            newError.username = "Username is required";
        } else if (username.length < 4) {
            newError.username = "Username must have 4 characters";
        }

        // Password validation
        if (password.length === 0) {
            newError.password = "Password is required";
        } else if (password.length < 8) {
            newError.password = "Password must have 8 characters";
        }

        // Confirm password validation
        if (confirmPassword.length === 0) {
            newError.confirmPassword = "Confirm password is required";
        } else if (password !== confirmPassword) {
            newError.confirmPassword = "Passwords do not match";
        }

        setErrors(newError);

        // Stop if errors exist
        if (Object.keys(newError).length > 0) {
            return;
        }

        // API call
        axios.post(getApiUrl("/addUser"), {
            username: username,
            password: password,
            role: "user"
        })
        .then((res) => {
            console.log(res.data);
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={submit}>
                
                <h2>Create Account</h2>

                {input.map((item) => (
                    <Input
                        key={item.name}
                        name={item.name}
                        type={item.type}
                        onChange={getValue}
                        errors={errors}   // 🔥 pass errors like login
                    />
                ))}

                <Button text="Signup" />

                <a onClick={() => navigate("/login")}>
                    Already have an account? Login
                </a>

            </form>
        </div>
    );
};

export default Signup;