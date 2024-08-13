
export interface EmptyRowTableProps {
  parentId?: number | null;
  parentTop?: number;
  nestingLevel?: number;
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


