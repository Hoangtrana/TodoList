import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import "./App.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import AddTodo from "./AddTodo";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch(
      "https://todolist-3ed26-default-rtdb.europe-west1.firebasedatabase.app/items/.json"
    )
      .then((response) => response.json())
      .then((data) => addKeys(data))
      .catch((err) => console.error(err));
  };

  // Add keys to the todo objects
  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) =>
      Object.defineProperty(item, "id", { value: keys[index] })
    );
    setTodos(valueKeys);
  };
  const addTodo = (newTodo) => {
    fetch(
      "https://todolist-3ed26-default-rtdb.europe-west1.firebasedatabase.app/items/.json",
      {
        method: "POST",
        body: JSON.stringify(newTodo),
      }
    )
      .then((response) => fetchItems())
      .catch((err) => console.error(err));
  };
  const deleteTodo = (id) => {
    fetch(
      `https://todolist-3ed26-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => fetchItems())
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" noWrap>
            Todolist
          </Typography>
        </Toolbar>
      </AppBar>
      <AddTodo addTodo={addTodo} />
      <div
        className="ag-theme-material"
        style={{ height: 400, width: 600, margin: "auto" }}
      >
        <AgGridReact rowData={todos}>
          <AgGridColumn
            headerName=""
            field="id"
            width={90}
            cellRendererFramework={(params) => (
              <IconButton
                onClick={() => deleteTodo(params.value)}
                size="small"
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
            )}
          />
          <AgGridColumn sortable={true} filter={true} field="description" />
          <AgGridColumn sortable={true} filter={true} field="date" />
          <AgGridColumn sortable={true} filter={true} field="priority" />
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
