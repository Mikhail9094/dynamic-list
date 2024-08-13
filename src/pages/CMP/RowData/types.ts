export interface RowProps<T> {
  row: T;
  parentTop?: number;
  nestingLevel?: number;
  indexRow?: number;
  editingRow: { id: number | null; parentId: number | null } | undefined;
  setEditingRow: React.Dispatch<
    React.SetStateAction<
      | {
          id: number | null;
          parentId: number | null;
        }
      | undefined
    >
  >;
}




