import "./about-game.styles.scss";
import { Link } from "react-router-dom";

const AboutGame = () => {
  return (
    <div className="about">
      <h1 className="about-heading"> Spēle Skaiti!</h1>
      <p className="about-description">Description</p>
      <Link className="about-link" to={"/game"}>
        Start
      </Link>
    </div>
  );
};

export default AboutGame;
