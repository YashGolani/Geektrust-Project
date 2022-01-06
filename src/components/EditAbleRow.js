import React, { Fragment } from "react";

function EditAbleRow({
  row,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) {
  return (
    <Fragment>
      <tr key={row.id}>
        <td></td>
        <td>
          <input
            type="text"
            required="required"
            placeholder="Enter a Name"
            name="name"
            value={editFormData.name}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <input
            type="email"
            required="required"
            placeholder="Enter a Email"
            name="email"
            value={editFormData.email}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <input
            type="text"
            required="required"
            placeholder="Enter a Role"
            name="role"
            value={editFormData.role}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <button className="button_edit" type="submit">
            Save
          </button>
          <button
            className="button_edit"
            type="submit"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </td>
      </tr>
    </Fragment>
  );
}

export default EditAbleRow;
