import styles from "./styles.module.scss";
import { useState } from "react";
import { useGetReportCMPQuery } from "../../redux/reportCMP";
import { EditingRow } from "./types";
import EmptyRow from "./EmptyRow";
import RowData from "./RowData";
import Loading from "../../components/Loading/Loading";

const CMP = () => {
  const [editingRow, setEditingRow] = useState<EditingRow | undefined>();
  const { data = [], isLoading, error } = useGetReportCMPQuery();

  if (error) {
    if ("status" in error) {
      const errMsg = "error" in error ? error.status : JSON.stringify(error.data.error);
      return (
        <div>
          <div>Произошла ошибка:</div>
          <div>{errMsg}</div>
        </div>
      );
    }
    return <div>Произошла ошибка: {error.message}</div>;
  }

  return (
    <>
      <div className={styles["header-table"]}>
        <h1>Строительно-монтажные работы</h1>
      </div>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {[
              "Уровень",
              "Наименование работ",
              "Основная з/п",
              "Оборудование",
              "Накладные расходы",
              "Сметная прибыль",
            ].map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        {isLoading ? (
          <Loading />
        ) : (
          <tbody className={styles.tbody}>
            {data.length > 0 ? (
              data.map((row: any) => (
                <RowData
                  key={row.id}
                  row={row}
                  editingRow={editingRow}
                  setEditingRow={setEditingRow}
                />
              ))
            ) : (
              <EmptyRow setEditingRow={setEditingRow} />
            )}
          </tbody>
        )}
      </table>
    </>
  );
};

export default CMP;
