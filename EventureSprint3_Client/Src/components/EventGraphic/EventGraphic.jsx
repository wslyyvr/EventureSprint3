import "./EventGraphic.scss";
import { formatEventDate } from "../../utils/date.js";

const EventGraphic = ({ date, variant = "default" }) => {
  const formattedDate = formatEventDate(date);
  return (
    <time className={`event-graphic event-graphic--${variant}`} dateTime={formattedDate.eventDate}>
      <span className="event-graphic__day">{formattedDate.day}</span>
      <span className="event-graphic__month">{formattedDate.month}</span>
    </time>
  );
};

export default EventGraphic;
