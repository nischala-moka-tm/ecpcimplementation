import React from "react";
import { useTable, usePagination } from "react-table";

export const Paginated = ({ columns, data }) => {
  console.log(data);
  console.log(
    useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 2 },
      },
      usePagination
    )
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const { pageIndex } = state;

  return (
    <>
      <div className="table-details">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagenation">
        <span className="noof-records">{data.length} Records</span>
        <span className="pagenation-numbs">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          {pageOptions.map((option, i) => {
            return (
              <button
                key={i}
                className={
                  pageIndex === option
                    ? "bg-dark text-light"
                    : "bg-light text-dark"
                }
                onClick={() => gotoPage(option)}
              >
                {option + 1}
              </button>
            );
          })}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
        </span>
      </div>
    </>
  );
};
