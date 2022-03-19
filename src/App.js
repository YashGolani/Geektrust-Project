import React, { Fragment, useCallback, useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import { SearchUsers } from "./components/SearchUser";
import { Pagination } from "./components/Pagination";
import "./styles.css";
import { fetchMembers } from "./actions/services";

function App() {
  const [data, setData] = useState([]);
  const [pageno, setPageno] = useState(1);
  const [filter, setFilter] = useState("");
  const [editContact, setEditContact] = useState(null);

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const usersPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchMembers();
        const responseData = await response.json();
        setData(responseData.map((user) => ({ ...user, select: false })));
      } catch (err) {
        alert(err);
      }
    };
    fetchUsers();
  }, []);

  const toggleCheckbox = (id) => {
    setData(
      data.map((user) => {
        if (user.id === id) user.select = !user.select;
        return user;
      })
    );
  };

  const removeId = (id) => {
    const updatedData = data.filter((item) => {
      return item.id !== id;
    });
    setData(updatedData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleEditHandler = (event, row) => {
    event.preventDefault();
    setEditContact(row.id);
    const formValues = { name: row.name, email: row.email, role: row.role };
    setEditFormData(formValues);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContact,
      name: editFormData.name,
      email: editFormData.email,
      role: editFormData.role,
    };

    const newContacts = [...data];
    const index = data.findIndex((row) => row.id === editContact);

    newContacts[index] = editedContact;
    setData(newContacts);
    setEditContact(null);
  };

  const handleCancelClick = () => {
    setEditContact(null);
  };

  const search = data.filter((user) => {
    return (
      user.name.toLowerCase().includes(filter) ||
      user.email.toLowerCase().includes(filter) ||
      user.role.toLowerCase().includes(filter)
    );
  });

  const indexOfLastUser = pageno * usersPage;
  const indexOfFirstUser = indexOfLastUser - usersPage;
  const currentUser = search.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(search.length / usersPage);

  const handleGlobalCheckboxChange = useCallback(
    (e) => {
      const checked = e.target.checked;
      setData((currdata) => {
        return currdata.map((user) => {
          const isUserBeingDisplayed = currentUser.findIndex(
            (u) => u.id === user.id
          );
          if (isUserBeingDisplayed > -1) {
            return {
              ...user,
              select: checked,
            };
          }
          return user;
        });
      });
    },
    [currentUser]
  );

  const handleDeleteMultipleUsers = () => {
    const updatedData = data.filter((user) => !user.select);
    setData(updatedData);
    if (pageno === totalPages && totalPages > 1) {
      setPageno((curr) => curr - 1);
    }
  };

  return (
    <Fragment>
      <SearchUsers setFilter={setFilter} setPageno={setPageno} />
      <DataTable
        handleGlobalCheckboxChange={handleGlobalCheckboxChange}
        removeId={removeId}
        currentUser={currentUser}
        editContact={editContact}
        editFormData={editFormData}
        toggleCheckbox={toggleCheckbox}
        handleEditFormChange={handleEditFormChange}
        handleEditHandler={handleEditHandler}
        handleEditFormSubmit={handleEditFormSubmit}
        handleCancelClick={handleCancelClick}
      />

      <Pagination
        totalPages={totalPages}
        pageno={pageno}
        setPageno={setPageno}
        handleDeleteMultipleUsers={handleDeleteMultipleUsers}
      />
    </Fragment>
  );
}

export default App;
