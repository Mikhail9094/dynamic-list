import { DataRow, Response } from "../types";
import styles from "./rowData.module.scss";
import { useState } from "react";
import { RowProps } from "./types";
import useRowLevel from "../../../hooks/useRowLevel";
import EmptyRow from "../EmptyRow";
import ShowButtons from "../Buttons";
import {
  useDeleteRowAtReportMutation,
  useUpdateRowAtReportMutation,
} from "../../../redux/reportCMP";
import { isErrorWithMessage, isFetchBaseQueryError } from "../../../redux/reportCMP/helpers";
import { useSnackbar } from "notistack";

function RowData({
  row,
  nestingLevel = 0,
  parentTop = 0,
  editingRow,
  setEditingRow,
}: RowProps<Response>) {
  const { enqueueSnackbar } = useSnackbar();
  const [edit, setEdit] = useState(false);

  const [rowData, setRowData] = useState<DataRow>({
    equipmentCosts: `${row.equipmentCosts}`,
    estimatedProfit: `${row.estimatedProfit}`,
    id: row.id,
    machineOperatorSalary: `${row.machineOperatorSalary}`,
    mainCosts: `${row.mainCosts}`,
    materials: `${row.materials}`,
    mimExploitation: `${row.mimExploitation}`,
    overheads: `${row.overheads}`,
    rowName: `${row.rowName}`,
    salary: `${row.salary}`,
    supportCosts: `${row.supportCosts}`,
    total: `${row.total}`,
  });
  const [updateRow] = useUpdateRowAtReportMutation();
  const [deleteRowAtCMP] = useDeleteRowAtReportMutation();
  const { top, left, ref } = useRowLevel(nestingLevel);

  const createEmptyRow = () => {
    setEditingRow({ id: null, parentId: row ? row.id : null });
  };

  const handleUpdateRow = async (id: number) => {
    try {
      await updateRow({
        id,
        equipmentCosts: Number(rowData.equipmentCosts),
        estimatedProfit: Number(rowData.estimatedProfit),
        machineOperatorSalary: Number(rowData.machineOperatorSalary),
        mainCosts: Number(rowData.mainCosts),
        materials: Number(rowData.materials),
        mimExploitation: Number(rowData.mimExploitation),
        overheads: Number(rowData.overheads),
        rowName: rowData.rowName,
        salary: Number(rowData.salary),
        supportCosts: Number(rowData.supportCosts),
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

  const handleDeleteRow = async (id: number) => {
    try {
      await deleteRowAtCMP(id).unwrap();
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
      setEdit(false);
      handleUpdateRow(rowData.id);
    }
  };

  return (
    <>
      <tr ref={ref} className={styles.wrapper} onDoubleClick={() => setEdit(true)}>
        <td className={styles.buttons}>
          <ShowButtons
            marginLeft={left}
            onAddRow={createEmptyRow}
            onDeleteRow={() => handleDeleteRow(row.id)}
            nestingLevel={nestingLevel}
            disabledAddRow={edit}
            heightVerticalLine={top - parentTop - 8}
          />
        </td>
        <td>
          {edit ? (
            <input
              type="text"
              className={styles.input}
              value={rowData.rowName}
              onChange={(e) => setRowData({ ...rowData, rowName: e.target.value })}
              onKeyDown={(e: React.KeyboardEvent) => onEnter(e)}
            />
          ) : (
            <>{rowData.rowName}</>
          )}
        </td>
        <td>
          {edit ? (
            <input
              type="number"
              className={styles.input}
              value={rowData.salary}
              onChange={(e) => setRowData({ ...rowData, salary: e.target.value })}
              onKeyDown={(e: React.KeyboardEvent) => onEnter(e)}
            />
          ) : (
            <>{rowData.salary}</>
          )}
        </td>
        <td>
          {edit ? (
            <input
              type="number"
              className={styles.input}
              value={rowData.equipmentCosts}
              onChange={(e) => setRowData({ ...rowData, equipmentCosts: e.target.value })}
              onKeyDown={(e: React.KeyboardEvent) => onEnter(e)}
            />
          ) : (
            <>{rowData.equipmentCosts}</>
          )}
        </td>
        <td>
          {edit ? (
            <input
              type="number"
              className={styles.input}
              value={rowData.overheads}
              onChange={(e) => setRowData({ ...rowData, overheads: e.target.value })}
              onKeyDown={(e: React.KeyboardEvent) => onEnter(e)}
            />
          ) : (
            <>{rowData.overheads}</>
          )}
        </td>
        <td>
          {edit ? (
            <input
              type="number"
              className={styles.input}
              value={rowData.estimatedProfit}
              onChange={(e) => setRowData({ ...rowData, estimatedProfit: e.target.value })}
              onKeyDown={(e: React.KeyboardEvent) => onEnter(e)}
            />
          ) : (
            <>{rowData.estimatedProfit}</>
          )}
        </td>
      </tr>
      {editingRow?.parentId === row?.id && !editingRow?.id && (
        <EmptyRow
          parentId={row.id}
          parentTop={top}
          nestingLevel={nestingLevel + 1}
          setEditingRow={setEditingRow}
        />
      )}
      {!!row?.child.length &&
        row.child.map((childRow: Response) => (
          <RowData
            key={childRow.id}
            row={childRow}
            nestingLevel={nestingLevel + 1}
            parentTop={top}
            editingRow={editingRow}
            setEditingRow={setEditingRow}
          />
        ))}
    </>
  );
}

export default RowData;
