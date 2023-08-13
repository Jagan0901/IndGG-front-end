import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../Components/Loading";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { API } from "../API";

export function EditParticipant() {
  const { participantId } = useParams();
  const [participant, setParticipant] = useState(null);
  const getParticipant = () => {
    fetch(`${API}/participants/${participantId}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setParticipant(data));
  };
  useEffect(() => getParticipant(), []);

  return participant ? <EditForm participant={participant} /> : <Loading />;
}

function EditForm({ participant }) {
  const [name, setName] = useState(participant.name);
  const [pic, setPic] = useState(participant.image);
  const [email, setEmail] = useState(participant.email);
  const [age, setAge] = useState(participant.age);
  const [hobby, setHobby] = useState(participant.hobby);

  const navigate = useNavigate();

  const editParticipant = () => {
    const updatedParticipant = {
      name: name,
      image: pic,
      email: email,
      age: age,
      hobby: hobby
    };

    fetch(`${API}/participants/${participant.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedParticipant),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => navigate("/participants"));
  };
  return (
    <div className="add-participant">
      <TextField
        id="outlined-basic"
        label="participant name"
        variant="outlined"
        type="text"
        onChange={(event) => setName(event.target.value)}
        value={name}
        placeholder="Enter a name"
      />

      <TextField
        id="outlined-basic"
        label="participant image"
        variant="outlined"
        type="text"
        onChange={(event) => setPic(event.target.value)}
        value={pic}
        placeholder="Enter a image URL"
      />

      <TextField
        id="outlined-basic"
        label="participant email"
        variant="outlined"
        type="text"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        placeholder="Enter the email"
      />

      <TextField
        id="outlined-basic"
        label="participant age"
        variant="outlined"
        type="number"
        onChange={(event) => setAge(event.target.value)}
        value={age}
        placeholder="Enter the age"
      />

      <TextField
        id="outlined-basic"
        label="participant hobby"
        variant="outlined"
        type="text"
        onChange={(event) => setHobby(event.target.value)}
        value={hobby}
        placeholder="Enter the hobby"
      />

      <Button variant="contained" color="success" onClick={editParticipant}>
        SAVE
      </Button>
    </div>
  );
}
