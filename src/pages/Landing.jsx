import { Logo } from '../components';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Freegan direct trade air plant, distillery letterpress wayfarers
            polaroid. Quinoa kitsch DSA narwhal, palo santo try-hard tumblr
            heirloom forage. Bicycle rights banjo hexagon, hella bruh bespoke
            vexillologist. Taxidermy brunch woke narwhal poke leggings salvia
            raclette YOLO vibecession DSA ethical keytar. Thundercats swag
            hashtag, butcher humblebrag paleo meditation meh. Wayfarers poutine
            bitters, gochujang thundercats messenger bag readymade glossier fam
            tote bag.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/ Register
          </Link>
        </div>
        <img src={main} alt="main img" className="img main-img" />
      </div>
    </Wrapper>
  );
}
export default Landing;
