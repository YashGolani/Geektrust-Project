import React, { Fragment } from "react";
import EditAbleRow from "./EditAbleRow";
import ReadOnlyRow from "./ReadOnlyRow";

function DataTable({
  handleGlobalCheckboxChange,
  removeId,
  currentUser,
  editContact,
  editFormData,
  toggleCheckbox,
  handleEditFormChange,
  handleEditHandler,
  handleEditFormSubmit,
  handleCancelClick,
}) {
  const isGlobalCheckboxChecked = () => {
    return currentUser.length && !currentUser.find((u) => !u.select);
  };

  return (
    <form onSubmit={handleEditFormSubmit}>
      <table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                style={{ width: 15, height: 15 }}
                onChange={handleGlobalCheckboxChange}
                checked={isGlobalCheckboxChecked()}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUser.map((row) => (
            <Fragment>
              {editContact === row.id ? (
                <EditAbleRow
                  row={row}
                  editFormData={editFormData}
                  handleEditFormChange={handleEditFormChange}
                  handleCancelClick={handleCancelClick}
                />
              ) : (
                <ReadOnlyRow
                  row={row}
                  toggleCheckbox={toggleCheckbox}
                  removeId={removeId}
                  handleEditHandler={handleEditHandler}
                />
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </form>
  );
}

export default DataTable;
