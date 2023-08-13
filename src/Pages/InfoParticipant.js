import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { API } from "../API";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { Loading } from "../Components/Loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import { width } from '@mui/system';

export function InfoParticipant() {
  const { participantId } = useParams();
  // const participant = participantsList[participantId];

  const [participant, setParticipant] = useState({});

  const navigate = useNavigate();

  const getParticipantInfo = () => {
    fetch(`${API}/participants/${participantId}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mv) => setParticipant(mv));
  };

  useEffect(() => getParticipantInfo(), []);





  return participant ? (
    <div >
      <div style={{ marginTop: "20px",marginLeft:"35%", marginRight:'35%',marginBottom:'10px' }}>
        <Card sx={{ maxWidth: 400 }}>
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
              Age : {participant.age}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email : {participant.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hobby : {participant.hobby}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Button
        // style={backStyles}
        variant="contained"
        startIcon={<ArrowBackIosIcon />}
        onClick={() => navigate(-1)}
      >
        BACK
      </Button>
    </div>
  ) : (
    "Loading..."
  );
}

