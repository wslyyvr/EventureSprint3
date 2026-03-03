import React from "react";
import EventGraphic from "../../components/EventGraphic/EventGraphic.jsx";
import Button from "../Button/Button.jsx";
import "./EventCard.scss";

const EventCard = ({
  id,
  title,
  description,
  date,
  time,
  variant = "default", // default for landing page,  manage-attending for managi page 
  attendanceValue,
  onAttendanceChange,
}) => {

  let content;
  // the layput of EventCard on landing page
  if (variant === "default") {
    content = (
      <div className={`event event--${variant}`} >
        <EventGraphic className="EventGraph" date={date} variant={variant} />
        <div className="EventCard_Detail">
          <h3>{title}</h3>
          <p className="eventTime">{time}</p>
          <p className="eventDetail">{description}</p>
          <div className="Buttons">
          <>
            <Button isLink to={`/rsvp/${id}`} className="learnButton">
              Learn more
            </Button>

            <Button  isLink to="/signup" className="registerButton">
              Register now
            </Button>
          </>
          </div>
        </div>
    </div>
    );
  } else if (variant === "manage-attending") {
     // the layput of EventCard on manage-attending
     const isAttending = attendanceValue === "attending";
    content = (
    <div className={`event event--${variant}`} >
        <EventGraphic className="EventGraph" date={date} variant={"useForMange"} />
        <div className="EventCard_Detail">
          <h3>{title}</h3>
          <p className="eventTime">{time}</p>
          <p className="eventDetail">{description}</p>
          <div className="Buttons">
            <Button
            //variant="primary"
            className={isAttending ? "is-active" : "is-inactive"}
            onClick={() => onAttendanceChange(id, "attending")}
            >
            Attending
            </Button>
            <Button
            //variant="primary"
            className={!isAttending ? "is-active" : "is-inactive"}
            onClick={() => onAttendanceChange(id, "notAttending")}
            >
            Not Attending
            </Button>
          </div>
        </div>
        </div>
    );
  }

  return content;
};

export default EventCard;




























