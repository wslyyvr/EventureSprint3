import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";  
import axios from "axios";
import Button from "../../components/Button/Button.jsx";
import Icon from "../../components/Icon/Icon.jsx";
import "./RSVP.scss";
//const PageHeader = ({ title, subtitle, children })
const Rsvp = ({}) => {
 //set date

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }); 
  // get eventid from url
  const {eventId}  = useParams();
  const [attendees, setAttendees] = useState([]);
  console.log({eventId});

  // get all Attendees data
   useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get(
          "https://unit-3-api-6b6268be0363.herokuapp.com/attendees",
          {
            params: {
              api_key: "2",
            },
          }
        );

        const allAttendees = response.data;

        // find the matchedAttendees
        const matchedAttendees = allAttendees.filter((attendee) =>
          attendee.attendingEvents.includes(eventId)
        );
        console.log(" eventId:", eventId);
        console.log(" all Attendees:",matchedAttendees);
         setAttendees(matchedAttendees);   
      } catch (error) {
        console.error("error info", error);
      }
    };

    fetchAttendees();
  }, [eventId]);



  return (
    <>
        <PageHeader
        title={
            <span className="rsvp-title">
            Event Attendees
            </span>
        }
        subtitle={<span className="rsvp-subtitle">
            Code Horizon
            </span>
        }
        >
        <span className="rsvp-date">{formattedDate}</span>
        </PageHeader>

        <div className="rsvp-top_buttom">
            <Button isLink={true} to="/" className="rsvp-back_buttom">
                Back
            </Button>
        </div>

      <div className="rsvp-list">
            <table className="rsvp-table">
                <tbody>
                {attendees.map((person) => (
                    <tr key={person.id}>
                        <td>{person.firstName}</td>
                        <td>{person.lastName}</td>
                        <td>{person.email}</td>
                        <td>
                          <div className="attending-block">
                            Attending
                            <span className="checkmark-block">
                              <span className="checkmark"></span>
                            </span>
                          </div>
                        </td>
                        <td>
                            <img
                            src={person.avatar}
                            // alt={`${person.firstName} ${person.lastName}`}
                            className="personAvatar"
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </>
    );
};

export default  Rsvp;
