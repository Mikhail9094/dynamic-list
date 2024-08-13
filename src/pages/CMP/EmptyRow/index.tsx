import styles from "./emptyRow.module.scss";
import { useState } from "react";
import { EmptyRowTableProps } from "./types";
import useRowLevel from "../../../hooks/useRowLevel";
import ShowButtons from "../Buttons";
import { EmptyRowType } from "../types";
import { useAddNewRowAtReportMutation } from "../../../redux/reportCMP";
import { isErrorWithMessage, isFetchBaseQueryError } from "../../../redux/reportCMP/helpers";
import { enqueueSnackbar } from "notistack";

function EmptyRow({
  parentId = null,
  nestingLevel = 0,
  parentTop = 0,
  setEditingRow,
}: EmptyRowTableProps) {
  const [rowData, setRowData] = useState<EmptyRowType<string>>({
    equipmentCosts: "0",
    estimatedProfit: "0",
    parentId: parentId,
    machineOperatorSalary: "0",
    mainCosts: "0",
    materials: "0",
    mimExploitation: "0",
    overheads: "0",
    rowName: "",
    salary: "0",
    supportCosts: "0",
    total: "0",
  });

  const [addNewRowAtReport, { error }] = useAddNewRowAtReportMutation();

  const { top, left, ref } = useRowLevel(nestingLevel);

  const deleteEmptyRow = () => {
    setEditingRow(undefined);
  };

  const handleCreateRowOnServer = async (id: number | null) => {
    try {
      await addNewRowAtReport({
        equipmentCosts: Number(rowData.equipmentCosts),
        estimatedProfit: Number(rowData.estimatedProfit),
        parentId: id,
        machineOperatorSalary: Number(rowData.machineOperatorSalary),
        mainCosts: Number(rowData.mainCosts),
        materials: Number(rowData.materials),
        mimExploitation: Number(rowData.mimExploitation),
        overheads: Number(rowData.overheads),
        rowName: rowData.rowName,
        salary: Number(rowData.salary),
        supportCosts: Number(rowData.supportCosts),
        total: Number(rowData.total),
      }).unwrap();
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = "error" in err ? err.error : JSON.stringify(err.data);
        enqueueSnackbar(errMsg, { variant: "error" });
      } else if (isErrorWithMessage(err)) {
        enqueueSnackbar(err.message, { variant: "error" });
      }
    }
  };

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      deleteEmptyRow();
      handleCreateRowOnServer(rowData.parentId);
    }
  };

  return (
    <tr ref={ref} className={styles.wrapper}>
      <td className={styles.buttons}>
        <ShowButtons
          marginLeft={left}
          nestingLevel={nestingLevel}
          disabledAddRow={true}
          disableDeleteRow={nestingLevel === 0}
          heightVerticalLine={top - parentTop - 8}
          onDeleteRow={deleteEmptyRow}
        />
      </td>
      <td>
        <input
          type="text"
          className={styles.input}
          value={rowData.rowName}
          onChange={(e) => setRowData({ ...rowData, rowName: e.target.value })}
          onKeyDown={(e: React.KeyboardEvent) => onEnter(e)}
        />
      </td>
      <td>
        <input
          type="number"
          className={styles.input}
          value={rowData.salary}
          onChange={(e) => setRowData({ ...rowData, salary: e.target.value })}
          onKeyDown={(e: React.KeyboardEvent) => onEnter(e)}
        />
      </td>
      <td>
        <input
          type="number"
          className={styles.input}
          value={rowData.equipmentCosts}
          onChange={(e) => setRowData({ ...rowData, equipmentCosts: e.target.value })}
          onKeyDown={(e: React.KeyboardEvent) => onEnter(e)}
        />
      </td>
      <td>
        <input
          type="number"
          className={styles.input}
          value={rowData.overheads}
          onChange={(e) => setRowData({ ...rowData, overheads: e.target.value })}
          onKeyDown={(e: React.KeyboardEvent) => onEnter(e)}
        />
      </td>
      <td>
        <input
          type="number"
          className={styles.input}
          value={rowData.estimatedProfit}
          onChange={(e) => setRowData({ ...rowData, estimatedProfit: e.target.value })}
          onKeyDown={(e: React.KeyboardEvent) => onEnter(e)}
        />
      </td>
    </tr>
  );
}

export default EmptyRow;
