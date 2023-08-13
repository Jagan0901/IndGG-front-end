import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../Components/Loading";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { API } from "../API";

export function EditTournaments() {
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState(null);
  const getTournament = () => {
    fetch(`${API}/tournaments/${tournamentId}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setTournament(data));
  };
  useEffect(() => getTournament(), []);

  return tournament ? <EditForm tournament={tournament} /> : <Loading />;
}

function EditForm({ tournament }) {
  const [name, setName] = useState(tournament.name);
  const [pic, setPic] = useState(tournament.image);
  const [startDate, setStartDate] = useState(tournament.startDate);
  const [endDate, setEndDate] = useState(tournament.endDate);

  const navigate = useNavigate();

  const editTournament = () => {
    const updatedTournament = {
      name: name,
      image: pic,
      startDate:startDate,
      endDate:endDate
    };

    fetch(`${API}/tournaments/${tournament.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTournament),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => navigate("/tournaments"));
  };
  return (
    <div className="add-participant">
      <TextField
        id="outlined-basic"
        label="tournament name"
        variant="outlined"
        type="text"
        onChange={(event) => setName(event.target.value)}
        value={name}
        placeholder="Enter a name"
      />

      <TextField
        id="outlined-basic"
        label="tournament image"
        variant="outlined"
        type="text"
        onChange={(event) => setPic(event.target.value)}
        value={pic}
        placeholder="Enter a image URL"
      />

      <TextField
        id="outlined-basic"
        label="tournament start date"
        variant="outlined"
        type="date"
        onChange={(event) => setStartDate(event.target.value)}
        value={startDate}
        placeholder="Enter the start date"
      />

      <TextField
        id="outlined-basic"
        label="tournament end date"
        variant="outlined"
        type="date"
        onChange={(event) => setEndDate(event.target.value)}
        value={endDate}
        placeholder="Enter the end date"
      />



      <Button variant="contained" color="success" onClick={editTournament}>
        SAVE
      </Button>
    </div>
  );
}
