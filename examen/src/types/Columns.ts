/**
 * type to convert information about columns from database in e.g. getColumns()
 */
export type Columns = {
  columnName: string;
};

/**
 * type to descripe registered data in ModalCOlumnComponent
 */
export type CreateColumnData = {
  name: string;
  datatype: string;
  primaryKey: boolean;
};

/**
 * type to describe retrieved column data from database
 */
export type GetColumnData = {
  Extra: string;
  Key: string;
  Type: string;
  Field: string;
  Null: string;
  Default: string | null;
};
