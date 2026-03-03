import PageHeader from "../../components/PageHeader/PageHeader.jsx";
//import List from "../../components/List/List.jsx";
//import ListItem from "../../components/List/ListItem.jsx";
//import EventCard from "../../components/EventCard/EventCard.jsx";
//import ContentCard from "../../components/ContentCard/ContentCard.jsx";
//import EventList from "../../components/EventList/EventList.jsx";
import "./Confirmation.scss";
import Button from "../../components/Button/Button.jsx";
import Icon from "../../components/Icon/Icon.jsx";

//const PageHeader = ({ title, subtitle, children })
const Confirmation = () => {
  
  return (
    <>
        <PageHeader title="Event Registration " subtitle="Confirmation">
        </PageHeader>
        <div className="info">
            <Icon name="check" />
            <h2>Responses successfully submitted</h2>
            <p>Need to make changes? We totally understand things come up. Luckily, you’re in control of your events and you can easily change your registration, guest info, or preferences whenever you need to.</p>
            <Button isLink={true} to="/" className="backHome">
            Back to events </Button>
        </div>
        


  </>
  );
};

export default  Confirmation;
