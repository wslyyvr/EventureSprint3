import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; //work for get email from API
import axios from "axios";

import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import Button from "../../components/Button/Button.jsx";
import EventCard from "../../components/EventCard/EventCard.jsx";
import List from "../../components/List/List.jsx";
import ListItem from "../../components/List/ListItem.jsx";

import "./EventListPage.scss";

//get data form API
const fetchAttendeeByEmail = async (email) => {
  try {
    const response = await axios.get(
      "https://unit-3-api-6b6268be0363.herokuapp.com/attendees",
      { params: { api_key: "2" } }
    );

    const allAttendees = response.data;

    const targetAttendee = allAttendees.find(
      (attendee) => attendee.email === email
    );

    return targetAttendee || null;
  } catch (error) {
    console.error("API error info:", error);
    return null;
  }
};


const EventListPage = ({ events }) => {
   const [showSaveChangeButton, setShowSaveChangeButton] = useState(false);     // Control ShowSaveChangeButton show or not show (ture=show,flase = not show)
  const [showEventSection, setShowEventSection] = useState(false); // Control EventSection show or not show (ture=show,flase = not show)
  const { attendeesEmail } = useParams(); // URL email
  const [searchEmail, setSearchEmail] = useState(""); // input email
  const [attendingEvents, setAttendingEvents] = useState([]);

 // checking email is change or not
useEffect(() => {
  if (attendeesEmail) {
    fetchAttendeeByEmail(attendeesEmail).then((user) => {
      if (user) {
        setAttendingEvents(user.attendingEvents);
      } else {
        setAttendingEvents([]); // anthing attending but singup before 

      }
      setShowSaveChangeButton(true);   // ShowSaveChangeButton show
      setShowEventSection(true); //  EventSection show 
    });
  }
}, [attendeesEmail]);

  //use for input email by hand
  const handleSearch = async () => {
    if  (!searchEmail || !searchEmail.includes("@")) {
      alert("Please enter a valid email that you used to sign up.");
      setSearchEmail(""); // empty input box
      return;
    }

    const user = await fetchAttendeeByEmail(searchEmail);
    if (user) {
      setAttendingEvents(user.attendingEvents);
      setShowSaveChangeButton(true);   // ShowSaveChangeButton show
      setShowEventSection(true); //  EventSection show 
      if (user.attendingEvents.length === 0) {
      alert("You are registered but have not signed up for any events yet.");
      setSearchEmail(""); // empty input box
        }
    } else {
      alert("It looks like you have not signed up yet. Please sign up first.");
      setSearchEmail(""); // empty input box
      setAttendingEvents([]);
      setShowSaveChangeButton(false);// ShowSaveChangeButton not show
      setShowEventSection(false); //  EventSection not show 
     
    }
  };

  return (
    <>
      <PageHeader
        title="Your Events"
        subtitle="Input your email to view the events you are attending."
      >
        <div className="event-search">
          <input
            type="email"
            placeholder="test@email.com"
            className="search__input"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <Button className="search-button" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </PageHeader>

      <div className="topButtom">
        <Button isLink={true} to="/" className="back-buttom">
          Back
        </Button>
        {/* Show only if  showSaveChangeButton is ture */}
       {showSaveChangeButton && (
          <Button isLink={true} to="/" className="change-buttom">
            Save Changes
          </Button>
        )} 
      </div>

      {showEventSection ?  (
      <List className="eventPage-list">
        {events.map((event) => {
          const isAttending = attendingEvents.includes(event.id);
          return (
            <ListItem key={event.id} className="eventPage-list__item">
              <EventCard
                id={event.id}
                title={event.title}
                date={event.date}
                time={event.time}
                description={event.description}
                eventClassName="eventListPage-event"
                buttonsClassName="eventListPage-buttons"
                firstButton={{
                  label: "Attending",
                  to: "/",
                  isLink: true,
                  className: isAttending
                    ? "attendingButton active"
                    : "attendingButton",
                }}
                secondaryButton={{
                  label: "Not Attending",
                  to: "/",
                  isLink: true,
                  className: isAttending
                    ? "notAttendingButton"
                    : "notAttendingButton active",
                }}
              />
            </ListItem>
            
          );
        })}
      </List>
      ) : (
           <div className="searchPageInfo">
            <p>Search for events using the attendee's email address.</p>
            <p> Enter an email above to find and manage event attendance</p>
          </div>
      )}
    </>
  );
};

export default EventListPage;