import styles from "./buttonTable.module.scss";
import { PropsButton } from "./types";

function CustomButton({ addClass, onClick, disabled, img }: PropsButton) {
  return (
    <button className={`${styles.button} ${addClass}`} onClick={onClick} disabled={disabled}>
      <img src={img} />
    </button>
  );
}

export default CustomButton;
