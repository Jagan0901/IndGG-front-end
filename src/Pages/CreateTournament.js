import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { API } from "../API";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar";

export function CreateTournament() {
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const addTournament = () => {
     if(!name || !pic || !startDate || !endDate) return setStatus("Please fill out all the fields")
    const newTournament = {
      name: name,
      image: pic,
      startDate: startDate,
      endDate: endDate
    };

    fetch(`${API}/tournaments/create`, {
      method: "POST",
      body: JSON.stringify(newTournament),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setStatus(res.error);
        } else if (res.message) {
          navigate("/tournaments");
        }
      }).catch((err) => setStatus(err.message));
  };

  return (
    <>
      <NavBar />
      <div className="form">
        <TextField
          id="outlined-basic"
          label="Tournament Name"
          variant="outlined"
          type="text"
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter tournament name"
        />

        <TextField
          id="outlined-basic"
          label="Tournament image URL"
          variant="outlined"
          type="text"
          onChange={(event) => setPic(event.target.value)}
          placeholder="Enter tournament image URL"
        />
        <TextField
          id="outlined-basic"
          label="Start Date"
          variant="outlined"
          type="date"
          onChange={(event) => setStartDate(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="End Date"
          variant="outlined"
          type="date"
          onChange={(event) => setEndDate(event.target.value)}
        />

        <Button variant="contained" onClick={addTournament}>
          Create
        </Button>
        <p style={{ color: "red", fontWeight: "bold" }}>{status}</p>
      </div>
    </>
  );
}
