export interface ShowButtonsProps  { 
    marginLeft?: number;
    heightVerticalLine?: number;
    nestingLevel?:number;
    onAddRow?(): void;
    onDeleteRow?(): void;
    disabledAddRow?: boolean;
    disableDeleteRow?: boolean;
  }