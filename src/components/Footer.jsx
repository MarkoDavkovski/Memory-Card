import "../styles/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
library.add(fas, faGithub);
const Footer = () => {
  return (
    <div className="footer">
      &copy; DavkoWeb &nbsp;
      <a href="https://github.com/MarkoDavkovski" target="blank">
        <FontAwesomeIcon icon="fa-brands fa-github" className="gh-icon" />
      </a>
    </div>
  );
};

export default Footer;
