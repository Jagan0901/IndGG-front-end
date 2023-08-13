import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { API } from "../API";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar";

export function CreateParticipants() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [pic, setPic] = useState("");
  const [hobby,setHobby] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const addParticipant = () => {
    if(!name || !pic || !email || !age ||!hobby) return setStatus("Please fill out all the fields")
    
    if(+age<18){
      setStatus("Candidate not eligible to participate in the tournament");
      return;
    }else if(+age>100) return setStatus("Age is invalid");

    const newParticipant = {
      name: name,
      image: pic,
      email: email,
      age: age,
      hobby: hobby
    };

    fetch(`${API}/participants/create`, {
      method: "POST",
      body: JSON.stringify(newParticipant),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setStatus(res.error);
        } else if (res.message) {
          navigate("/participants");
        }
      })
      .catch((err) => setStatus(err.message));
  };

  return (
    <>
      <NavBar />
      <div className="form">
        <TextField
          id="outlined-basic"
          label="Participant Name"
          variant="outlined"
          type="text"
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter participant name"
        />

        <TextField
          id="outlined-basic"
          label="Participant image URL"
          variant="outlined"
          type="text"
          onChange={(event) => setPic(event.target.value)}
          placeholder="Enter participant image URL"
        />
        <TextField
          id="outlined-basic"
          label="Participant Email"
          variant="outlined"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter participant email"
        />
        <TextField
          id="outlined-basic"
          label="Participant Age"
          variant="outlined"
          type="number"
          onChange={(event) => setAge(event.target.value)}
          placeholder="Enter participant age"
        />
        <TextField
          id="outlined-basic"
          label="Participant Hobby"
          variant="outlined"
          type="text"
          onChange={(event) => setHobby(event.target.value)}
          placeholder="Enter participant hobby"
        />

        <Button variant="contained" onClick={addParticipant}>
          Create
        </Button>
        <p style={{ color: "red", fontWeight: "bold" }}>{status}</p>
      </div>
    </>
  );
}
