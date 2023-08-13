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

export function ViewTournaments() {
  const [tournaments, setTournaments] = useState(null);
  

  const getTournaments = () => {
    fetch(`${API}/tournaments`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setTournaments(data));
  };

  useEffect(() => getTournaments(), []);
  return tournaments ? (
    <>
      <NavBar />
      <div className="participant-card">
        {tournaments.map((tournament) => (
          <Tournament
            key={tournament.id}
            tournament={tournament}
            refresh={getTournaments}
          />
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
}

function Tournament({ tournament, refresh }) {
  const [status, setStatus] = useState("");
  const deleteTournament = () => {
    fetch(`${API}/tournaments/${tournament.id}`, { method: "DELETE" }).then(
      () => refresh()
    );
  };
  const navigate = useNavigate();

  const getStatus = ()=>{
    const start = tournament.startDate;
    const end   = tournament.endDate;
    const date = new Date();
    const dateISO = date.toISOString().split("T")[0];
    console.log(start)
    if(dateISO<start && dateISO<end){
      setStatus("Upcoming");
    }else if(dateISO>end && dateISO>start){
      setStatus("Finished")
    }else if(dateISO>start  && dateISO<end ){
      setStatus("Ongoing")
    }
  }
  
  useEffect(()=> getStatus(),[])

  const statusStyles ={
    color: status === "Upcoming" ? "darkGreen" : status === "Finished" ? "red" : "darkGoldenrod",
    fontWeight:"bolder"
  }


  return (
    <div style={{ marginTop: "20px" }}>
      <Card sx={{ minWidth: 400 }}>
        <CardMedia
          sx={{ height: 300 }}
          image={tournament.image}
          title={tournament.name}
          className="pic"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {tournament.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start Date : {tournament.startDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            End Date : {tournament.endDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status : <span style={statusStyles}>{status}</span>
          </Typography>
        </CardContent>
        <CardActions className="btn">
          <IconButton
            color="secondary"
            onClick={() => navigate(`/tournaments/edit/${tournament.id}`)}
          >
            <EditIcon></EditIcon>
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => navigate(`/tournaments/view/${tournament.id}`)}
          >
            <InfoIcon></InfoIcon>
          </IconButton>

          <IconButton color="error" onClick={deleteTournament}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
