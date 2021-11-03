import { Button, FormControl, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { toast } from "react-toastify";

const AdminRegister = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast("Password and confirm password should be same", {
        type: "error",
      });
    }
    if (password === "" || confirmPassword === "" || username === "") {
      return toast("Please fill the form correctly", {
        type: "error",
      });
    }
    fetch("http://localhost:5000/api/v1/admin/register", {
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
          toast("Admin User Created", {
            type: "success",
          });
          setUsername("");
          setPassword("");
          setConfirmPassword("");
        } else if (data.status === "BadRequestError") {
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
    <Stack alignItems="center" justifyContent="center" height="70vh">
      <Box
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;",
          padding: "20px",
          wdith: "400px",
        }}
      >
        <FormControl sx={{ width: "400px" }}>
          <TextField
            variant="standard"
            label="Admin Username"
            sx={{ marginBottom: "10px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Admin Password"
            sx={{ marginBottom: "10px" }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Confirm Password"
            sx={{ marginBottom: "15px" }}
            value={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="outlined"
            color="success"
            sx={{ marginBottom: "10px" }}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default AdminRegister;
