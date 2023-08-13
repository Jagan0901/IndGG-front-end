import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { API } from "../API";
import TextField from "@mui/material/TextField";
import { NavBar } from "../NavBar";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
// import { width } from '@mui/system';

export function InfoTournaments() {
  const { tournamentId } = useParams();
  // const tournament = tournamentsList[tournamentId];

  const [tournament, setTournament] = useState({});
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [status, setStatus] = useState("");

  const [about, setAbout] = useState(false);
  const [crew, setCrew] = useState(true);

  const navigate = useNavigate();

  const getTournamentInfo = () => {
    fetch(`${API}/tournaments/${tournamentId}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mv) => setTournament(mv));
  };

  const addParticipant = ()=>{
    if(!name || !email) return setStatus("Please fill out the fields to add participant");
    
  };

  useEffect(() => getTournamentInfo(), []);



  const buttonStyles = {
    display: "flex",
    gap: "10px",
    justifyContent: "space-around",
    marginTop: "25px",
  };
  const backStyles = {
    marginLeft: "20%",
    marginRight:'20%',
    marginTop: "10px",
    marginBottom: "20px",
  };
  const castStyles = {
    marginTop: "25px",
    marginBottom: "25px",
  };

  return tournament ? (
    <>
      <NavBar />
      <div
        style={{
          marginTop: "20px",
          marginLeft: "35%",
          marginRight: "35%",
          marginBottom: "10px",
        }}
      >
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
            sx={{ height: 300 }}
            image={tournament.image}
            title={tournament.name}
            className="pic"
          />
        </Card>
      </div>
      <div style={buttonStyles}>
        <Button
          variant="outlined"
          endIcon={crew ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setCrew(!crew)}
        >
          Participants List
        </Button>
        <Button
          variant="outlined"
          endIcon={about ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setAbout(!about)}
        >
          Add Participant
        </Button>
      </div>
      {crew ? (
        <div style={castStyles}>
          <CastCrew tournamentId={tournamentId} />
        </div>
      ) : (
        ""
      )}

      {about ? (
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
            label="Participant Email"
            variant="outlined"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter participant email"
          />

          <Button variant="contained" onClick={addParticipant}>
            ADD
          </Button>
          <p style={{ color: "red", fontWeight: "bold" }}>{status}</p>
        </div>
      ) : (
        ""
      )}

      {/* <button onClick={()=> navigate(-1)}>Back</button>       */}
      <Button
        style={backStyles}
        variant="contained"
        startIcon={<ArrowBackIosIcon />}
        onClick={() => navigate(-1)}
      >
        BACK
      </Button>
    </>
  ) : (
    "Loading..."
  );
}

function CastCrew({ tournamentId }) {
  const [tournamentCast, setTournamentCast] = useState([]);
  //  console.log(tournamentCast)

  const getTournamentCrews = () => {
    fetch(`${API}/tournaments/${tournamentId}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mv) => setTournamentCast(mv.participants));
  };

  useEffect(() => getTournamentCrews(), []);

  const crewContainer = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  };

  return (
    <div style={crewContainer}>
      {tournamentCast.map((crew, index) => (
        <DisplayCast cast={crew} key={index} />
      ))}
    </div>
  );
}

function DisplayCast({ cast }) {
  const picStyles = {
    height: "300px",
    width: "200px",
    objectFit: "cover",
  };
  const castName = {
    fontSize: "15px",
    textAlign: "center",
    fontWeight: "bold",
  };
  const castContainer = {
    border: "10px solid",
  };
  return (
    <div style={castContainer}>
      <img style={picStyles} src={cast.image} alt={cast.name} />
      <p style={castName}>{cast.name}</p>
    </div>
  );
}
