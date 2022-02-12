import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function AddTodo(props) {
  const [open, setOpen] = useState(false);

  const [todo, setTodo] = useState({ description: "", date: "", priority: "" });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    props.addTodo(todo);
    handleClose();
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add todo
      </Button>
      <Dialog open={open}>
        <DialogTitle>New todo</DialogTitle>
        <DialogContent>
          <TextField
            name="description"
            value={todo.description}
            onChange={inputChanged}
            margin="dense"
            label="Description"
            fullWidth
          />
          <TextField
            name="date"
            value={todo.date}
            onChange={inputChanged}
            margin="dense"
            label="Date"
            fullWidth
          />
          <TextField
            name="priority"
            value={todo.priority}
            onChange={inputChanged}
            margin="dense"
            label="Priority"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTodo;
