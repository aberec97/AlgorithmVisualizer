import ButtonHolder from "./buttonHolder";

const TitleAndButtons = (props) => {
    return (<div>
        <h5>{props.title}</h5>
        <ButtonHolder buttons={props.buttons} onSelect={props.onSelect} ></ButtonHolder>
    </div>);
}

export default TitleAndButtons;