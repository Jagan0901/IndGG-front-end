import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate("/home")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/tournaments")}>
            View Tournaments
          </Button>
          <Button color="inherit" onClick={() => navigate("/tournaments/add")}>
            Add Tournament
          </Button>
          <Button color="inherit" onClick={() => navigate("/participants")}>
            View Participants
          </Button>
          <Button color="inherit" onClick={() => navigate("/participants/add")}>
            Add Participants
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
