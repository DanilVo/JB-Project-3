import './Home.css';
import background from '../../../assets/background.jpg';

function Home(): JSX.Element {
  return (
    <div className="Home">
      <div className="backgroundContainer">
        <img id="background" src={background}></img>
      </div>
      <div className="text">helloas</div>
    </div>
  );
}

export default Home;
