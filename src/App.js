import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Login } from './Pages/Login';
import { SignUp } from "./Pages/SignUp";
import { Home } from "./Pages/Home";
import { ViewTournaments } from './Pages/ViewTournaments';
import { CreateTournament } from './Pages/CreateTournament';
import { ViewParticipants } from './Pages/ViewParticipants';
import { CreateParticipants } from './Pages/CreateParticipants';
import { EditParticipant } from "./Pages/EditParticipant";
import { InfoParticipant } from "./Pages/InfoParticipant";
import { InfoTournaments } from "./Pages/InfoTournaments ";
import { EditTournaments } from "./Pages/EditTournaments";

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tournaments" element={<ViewTournaments />} />
        <Route path="/tournaments/view/:tournamentId" element={<InfoTournaments />} />
        <Route path="/tournaments/edit/:tournamentId" element={<EditTournaments />} />
        <Route path="/tournaments/add" element={<CreateTournament />} />
        <Route path="/participants" element={<ViewParticipants />} />
        <Route path="/participants/view/:participantId" element={<InfoParticipant />} />
        <Route path="/participants/edit/:participantId" element={<EditParticipant/>} />
        <Route path="/participants/add" element={<CreateParticipants />} />
      </Routes>
    </div>
  );
}

export default App;
