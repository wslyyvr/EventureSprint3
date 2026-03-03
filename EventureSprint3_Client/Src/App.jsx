import "./App.scss";
//import events from "./data/events.js";
import PageFooter from "./components/PageFooter/PageFooter.jsx"
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import RSVP from "./pages/RSVP/RSVP.jsx"; 
import SignupForm from "./pages/SignupForm/SignupForm.jsx"; 
import Confirmation from "./pages/Confirmation/Confirmation.jsx"; 
import EventListPage from "./pages/EventListPage/EventListPage.jsx"; 
//import ComponentDocs from "./pages/ComponentDocs/Conp,mponentDocs.jsx";
import ManageEvents from "./pages/ManageEvents/ManageEvents.jsx"; 
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
const App = () => {
const [events, setEvents] = useState([]);
const [attendees, setAttendees] = useState([]);
useEffect(() => {
    axios.get("https://unit-3-api-6b6268be0363.herokuapp.com/events", {
        params: { api_key: "1" },
      })
      .then((response) => {
        setEvents(response.data);
      });
  }, []);

  const onUpdateAttendees = (newAttendees) => {
  setAttendees(newAttendees);
};

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage events={events} />} />
        <Route path="/signup"  element={<SignupForm events={events} attendees={attendees} setAttendees={setAttendees} />} />
        <Route path="/rsvp/:eventId" element={<RSVP />} />
       
        <Route path="/confirmation" element={<Confirmation />} />  
        <Route path="/eventlistPage" element={<EventListPage events={events} />} />
        {/* <Route path="/eventlistPage/:attendeesEmail" element={<EventListPage events={events} />} /> */}
        <Route path="/manage-events" element={<ManageEvents events={events} attendees={attendees} onUpdateAttendees={onUpdateAttendees}/>} /> 

      </Routes>
      <PageFooter />
    </BrowserRouter>
  );

};

export default App;
