import * as React from "react";
import { LoginRounded, PersonRounded } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalState.js";
import {
  Button,
  FormControl,
  TextField,
  Fade,
  Modal,
  Box,
  Backdrop,
} from "@mui/material";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { setCurrentAdmin } from "../redux/admin/admin.actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TransitionsModal = ({ setCurrentAdmin }) => {
  const [open, setOpen] = useRecoilState(modalState);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      return toast("Please fill the form correctly", {
        type: "error",
      });
    }
    fetch("http://localhost:5000/api/v1/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast("Welcome Admin", {
            type: "success",
          });
          setCurrentAdmin({
            name: data.admin,
            token: data.token,
          });
          setOpen(false);
          console.log(data);
          setUsername("");
          setPassword("");
        } else if (data.status === "BadRequestError" || "NotFoundError") {
          toast("Something went wrong", {
            type: "error",
          });
        }
      })
      .catch((err) => {
        toast("Please fill form correctly", {
          type: "error",
        });
        console.log(err);
      });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(!open)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <FormControl sx={{ display: "flex" }}>
              <PersonRounded
                sx={{ width: "100%", textAlign: "center", mb: "8px" }}
              />
              <TextField
                id="standard-basic"
                label="Username"
                type="text"
                variant="standard"
                sx={{ mb: "8px" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Password"
                type="password"
                variant="standard"
                sx={{ mb: "8px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="text"
                color="success"
                sx={{ mb: "8px" }}
                startIcon={<LoginRounded />}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </FormControl>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentAdmin: (admin) => dispatch(setCurrentAdmin(admin)),
});

export default connect(null, mapDispatchToProps)(TransitionsModal);
