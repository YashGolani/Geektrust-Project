import React, { Fragment, useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import { SearchUsers } from "./components/SearchUser";
import { Pagination } from "./components/Pagination";
import "./styles.css";

function App() {
  let [data, setData] = useState([]);
  const [pageno, setPageno] = useState(1);
  const [filter, setFilter] = useState("");
  const [editContact, setEditContact] = useState(null);
  const usersPage = 10;

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const gotUsers = async () => {
      let response;
      try {
        response = await (
          await fetch(
            "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
          )
        ).json();
        setData(response.map((user) => ({ ...user, select: false })));
      } catch (err) {
        alert(err);
      }
    };
    gotUsers();
  }, []);

  let search = data.filter((user) => {
    return (
      user.name.toLowerCase().includes(filter) ||
      user.email.toLowerCase().includes(filter) ||
      user.role.toLowerCase().includes(filter)
    );
  });

  const toggleCheckbox = (id) => {
    setData(
      data.map((user) => {
        if (user.id === id) user.select = !user.select;
        return user;
      })
    );
  };

  const removeId = (id) => {
    data = data.filter((item) => {
      return item.id !== id;
    });
    setData(data);
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

  const deleteMulti = () => {
    setData(data.filter((user) => !user.select));
  };

  let indexOfLastUser = pageno * usersPage;
  const indexOfFirstUser = indexOfLastUser - usersPage;
  let currentUser = search.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(search.length / usersPage);

  return (
    <Fragment>
      <SearchUsers setFilter={setFilter} setPageno={setPageno} />
      <DataTable
        data={data}
        setData={setData}
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
        deleteMulti={deleteMulti}
      />
    </Fragment>
  );
}

export default App;
