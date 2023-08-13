import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { Loading } from "../Components/Loading";
import { NavBar } from "../NavBar";
import { API } from "../API";

export function ViewParticipants() {
  const [participants, setParticipants] = useState(null);

  const getParticipants = () => {
    fetch(`${API}/participants`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setParticipants(data));
  };

  useEffect(() => getParticipants(), []);
  return participants ? (
    <>
      <NavBar />
      <div className="participant-card">
        {participants.map((participant) => (
          <Participant
            key={participant.id}
            participant={participant}
            refresh={getParticipants}
          />
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
}

function Participant({ participant, refresh }) {
  const deleteParticipant = () => {
    fetch(`${API}/participants/${participant.id}`, { method: "DELETE" }).then(
      () => refresh()
    );
  };
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "20px" }}>
      <Card sx={{ minWidth: 400 }}>
        <CardMedia
          sx={{ height: 300 }}
          image={participant.image}
          title={participant.name}
          className="pic"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {participant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email : {participant.email}
          </Typography>
        </CardContent>
        <CardActions className="btn">
          <IconButton
            color="secondary"
            onClick={() => navigate(`/participants/edit/${participant.id}`)}
          >
            <EditIcon></EditIcon>
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => navigate(`/participants/view/${participant.id}`)}
          >
            <InfoIcon></InfoIcon>
          </IconButton>

          <IconButton color="error" onClick={deleteParticipant}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
