import { useState } from "react";
import styles from "./showButtons.module.scss";
import { ShowButtonsProps } from "./types";
import CustomButton from "../../../components/CustomButton";

function ShowButtons({
  marginLeft = 0,
  heightVerticalLine,
  nestingLevel = 0,
  onAddRow = () => {},
  onDeleteRow = () => {},
  disabledAddRow = false,
  disableDeleteRow = false,
}: ShowButtonsProps) {
  const [deleteButtonTrashFill, setDeleteButtonTrashFill] = useState(false);

  return (
    <div
      className={styles.buttons}
      onMouseOver={() => setDeleteButtonTrashFill(true)}
      onMouseLeave={() => setDeleteButtonTrashFill(false)}
      style={{ marginLeft: `${marginLeft}px`, width: `55px` }}
    >
      {nestingLevel > 0 && (
        <>
          <div
            className={styles["vertical-line"]}
            style={{ height: `${heightVerticalLine}px` }}
          ></div>
          <div className={styles["horizontal-line"]}></div>
        </>
      )}
      <CustomButton onClick={onAddRow} disabled={disabledAddRow} img="/img/main/article.svg" />
      {deleteButtonTrashFill && (
        <CustomButton
          onClick={onDeleteRow}
          disabled={disableDeleteRow}
          img="/img/main/trashFill.svg"
        />
      )}
    </div>
  );
}

export default ShowButtons;
