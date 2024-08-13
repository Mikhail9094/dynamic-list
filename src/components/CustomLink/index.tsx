import styles from "./customLink.module.scss";
import { Link } from "react-router-dom";

interface Props {
  nameLink?: string;
  to: string;
  img?: string;
  addClass?: string;
  
}

const CustomLink = ({ nameLink, img, to, addClass }: Props) => {

  return (
    <Link className={`${styles.link} ${addClass}`} to={to}>
      {img && <img src={img} />}
      {nameLink}
    </Link>
  );
};

export default CustomLink;
