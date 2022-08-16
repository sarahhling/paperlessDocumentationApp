import { useTable, useSortBy } from "react-table";
import styles from "../styles/Retrieve.module.css";
import { useState } from "react";

export default function MyTable({ columns, data }) {
  const [approvalList, setApprovalList] = useState([]);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Approve",
        Header: "Approve",
        Cell: ({ row }) => (
          <input
            className="form-check-input"
            type="checkbox"
            onClick={() => {
              setApprovalList((oldList) => [...oldList, row.values]);
            }}
          ></input>
        ),
      },
    ]);
  };

  const tableInstance = useTable({ columns, data }, tableHooks, useSortBy);
  const isEven = (idx) => idx % 2 === 0;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div>
      <div className="col-md-12 text-center pt-3">
        <button
          className="btn btn-outline-info m-3"
          type="button"
          onClick={() => console.log(approvalList)}
        >
          Approval List
        </button>
      </div>

      <table
        {...getTableProps()}
        className={`table-bordered border-dark text-center ${styles.approvalTable}`}
      >
        <thead className="text-center">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={styles.rowStyle}
                >
                  {column.render("Header")}
                  <span style={{ color: "#33b5e5" }}>
                    {column.isSorted ? (column.isSortedDesc ? " ▽" : " △") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
                className={isEven(idx) ? styles.alternatingBGColor : ""}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className={styles.rowStyle}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
