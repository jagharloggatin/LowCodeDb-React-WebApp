export type Columns = {
  columnName: string;
};

export type CreateColumnData = {
  name: string;
  datatype: string;
  primaryKey: boolean;
};

export type GetColumnData = {
  Extra: string;
  Key: string;
  Type: string;
  Field: string;
  Null: string;
  Default: string | null;
};
