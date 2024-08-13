export interface EditingRow {
  id: number | null;
  parentId: number | null;
}

export interface EmptyRowType<T> {
  equipmentCosts: T;
  estimatedProfit: T;
  parentId: null | number;
  machineOperatorSalary: T;
  mainCosts: T;
  materials: T;
  mimExploitation: T;
  overheads: T;
  rowName: string;
  salary: T;
  supportCosts: T;
  total: T;
}

export type DataRow = Omit<EmptyRowType<string>, "parentId"> & { id: number };

export type CreatingRowOnServer = EmptyRowType<number>;

export type Response = Omit<EmptyRowType<number>, "parentId"> & { id: number; child: [] };
