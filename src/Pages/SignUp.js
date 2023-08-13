import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { API } from "./../API";
import { useState } from "react";
import TextField from "@mui/material/TextField";

export function SignUp() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(process.env.TOKEN);

  const statusStyles = {
    textAlign: "center",
    color: status === "Created Successfully" ? "green" : "red",
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "10%" }}>Sign Up</h2>
      <form className="login">
        <TextField
          variant="outlined"
          id="email"
          label="Create Email"
          type="email"
          placeholder="Create new email"
          onChange={(event) => setMail(event.target.value)}
        />
        <TextField
          variant="outlined"
          id="password"
          label="Create Password"
          type="password"
          placeholder="Create new password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const newUser = {
              email: mail,
              password: password,
            };

            fetch(`${API}/users/signup`, {
              method: "POST",
              body: JSON.stringify(newUser),
              headers: {
                "Content-Type": "application/json"
              },
            })
              .then((data) => data.json())

              .then((response) => {
                if (response.message) {
                  setStatus(response.message);
                  console.log(response.message);
                  navigate("/");
                } else if (response.error) {
                  setStatus(response.error);
                  console.log(response.error);
                }
              });
          }}
        >
          Sign Up
        </Button>
        <h3 style={statusStyles}>{status}</h3>
      </form>
    </div>
  );
}
