import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { NavBar } from "../NavBar";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { API } from "../API";
// import { width } from '@mui/system';

export function InfoTournaments() {
  const { tournamentId } = useParams();
  // const tournament = tournamentsList[tournamentId];

  const [tournament, setTournament] = useState({});
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [response, setResponse] = useState("");

  const [about, setAbout] = useState(false);
  const [participantList, setParticipantList] = useState(true);

  const navigate = useNavigate();

  const getTournamentInfo = () => {
    fetch(`${API}/tournaments/${tournamentId}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mv) => setTournament(mv));
  };

  const addParticipant = ()=>{
    if(!name || !email) return setResponse("Please fill out the fields to add participant");

    const participantDetails = {
      name: name,
      email: email,
      tournamentId:tournamentId
    }

    fetch(`${API}/participants/addParticipant`,{
      method:"POST",
      body:JSON.stringify(participantDetails),
      headers:{"Content-type":"application/json"}
    })
     .then((res)=> res.json())
     .then((res)=>{
        if(res.message){
          setResponse(res.message)
        }else if(res.error){
          setResponse(res.error)
        }
     })
       .catch((err)=> setResponse(err.message));
    
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
  const participantStyles = {
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
          endIcon={participantList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setParticipantList(!participantList)}
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
      {participantList ? (
        <div style={participantStyles}>
          <ParticipantCard tournamentId={tournamentId} refresh={response}/>
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
          <p style={{ color: response === "Participant added Successfully" ? "darkGreen" : "red", fontWeight: "bold" }}>{response}</p>
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

function ParticipantCard({ tournamentId,refresh }) {
  const [tournamentData, setTournamentData] = useState([]);

  const getTournamentData = () => {
    fetch(`${API}/tournaments/${tournamentId}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mv) => setTournamentData(mv.participants));
  };

  useEffect(() => getTournamentData(), [refresh]);

  const participantContainer = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    margin:"10px",
  };

  return (
    <div style={participantContainer}>
      {tournamentData.map((data, index) => (
        <DisplayParticipant data={data} key={index} />
      ))}
    </div>
  );
}

function DisplayParticipant({ data }) {
  const picStyles = {
    height: "300px",
    width: "200px",
    objectFit: "cover",
  };
  const participantName = {
    fontSize: "15px",
    textAlign: "center",
    fontWeight: "bold",
  };
  const participantContainer = {
    border: "10px solid",
    marginTop:"10px"
  };
  return (
    <div style={participantContainer}>
      <img style={picStyles} src={data.image} alt={data.name} />
      <p style={participantName}>{data.name}</p>
    </div>
  );
}
