import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "../API";

export function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const statusStyles = {
    textAlign: "center",
    color: status === "Login Successfully" ? "green" : "red",
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "10%" }}>User Login</h2>
      <div className="login">
        <TextField
          id="email"
          label="Enter Email"
          variant="outlined"
          type="email"
          value={mail}
          onChange={(event) => setMail(event.target.value)}
        />

        <TextField
          id="password"
          label="Enter Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button
          variant="contained"
          color="success"
          type="submit"
          onClick={() => {
            const user = {
              email: mail,
              password: password,
            };
            fetch(`${API}/users/login`, {
              method: "POST",
              body: JSON.stringify(user),
              headers: {
                "Content-Type": "application/json"
              },
            })
              .then((data) => data.json())

              .then((response) => {
                if (response.message) {
                  setStatus(response.message);
                  console.log(response.message);
                  navigate("/home");
                } else if (response.error) {
                  setStatus(response.error);
                  console.log(response.error);
                }
              });
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={()=> {setMail("cool@mail.com"); setPassword("Password@123");}}
        >To Get User Credentials</Button>
        <h3 style={statusStyles}>{status}</h3>

        <h4 style={{ textAlign: "center" }}>
          Don't have an account? Create an account
          <Button
            variant="text"
            size="small"
            onClick={() => navigate("/signup")}
          >
            Click here
          </Button>
        </h4>
      </div>
    </div>
  );
}
