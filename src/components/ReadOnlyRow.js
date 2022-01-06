import React, { Fragment } from "react";
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";

function ReadOnlyRow({ row, toggleCheckbox, handleEditHandler, removeId }) {
  return (
    <Fragment>
      <tr key={row.id}>
        <td>
          <input
            type="checkbox"
            checked={row.select}
            style={{ width: 15, height: 15 }}
            onChange={() => toggleCheckbox(row.id)}
          ></input>
        </td>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.role}</td>
        <td>
          <button
            className="button_border"
            type="button"
            onClick={(event) => handleEditHandler(event, row)}
          >
            <EditIcon />
          </button>
          <button
            className="button_border"
            type="button"
            onClick={() => removeId(row.id)}
          >
            <DeleteIcon />
          </button>
        </td>
      </tr>
    </Fragment>
  );
}

export default ReadOnlyRow;
