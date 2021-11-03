import React from "react";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import swal from "sweetalert";

class CreateStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentname: "",
      studentrollno: "",
      gender: "",
      dob: "",
      class: "",
      year: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.class === "" ||
      this.state.dob === "" ||
      this.state.gender === "" ||
      this.state.studentname === "" ||
      this.state.studentrollno === "" ||
      this.state.year === ""
    ) {
      return swal(
        "All Fields are required",
        "Please enter all details",
        "error"
      );
    }
    fetch("http://localhost:5000/api/v1/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.currentAdmin.token}`,
      },
      body: JSON.stringify({
        studentname: this.state.studentname,
        studentrollno: this.state.studentrollno,
        gender: this.state.gender,
        dob: this.state.dob,
        class: this.state.class,
        year: this.state.year,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          swal("Student Created", "", "success");
          this.setState({
            studentname: "",
            studentrollno: "",
            gender: "",
            dob: "",
            class: "",
            year: "",
          });
          console.log(data);
        } else if (data.status === "BadRequestError") {
          swal("Something went wrong", "", "error");
        } else if (data.status === "UnauthorizedError") {
          swal("Your are not loggedin", "UnAuthorized!", "error");
        }
      })
      .catch((err) => {
        toast("Something went wrong", {
          type: "error",
        });
        console.log(err);
      });
  }

  render() {
    return (
      <Stack
        width="100vw"
        height="70vh"
        justifyContent="center"
        alignItems="center"
      >
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
              fullWidth
              value={this.state.studentname}
              onChange={(e) => this.setState({ studentname: e.target.value })}
              id="standard-basic"
              variant="standard"
              label="Student Name"
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              fullWidth
              value={this.state.studentrollno}
              onChange={(e) => this.setState({ studentrollno: e.target.value })}
              id="standard-basic"
              variant="standard"
              label="Student Register Number"
              type="number"
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              fullWidth
              value={this.state.gender}
              onChange={(e) => this.setState({ gender: e.target.value })}
              id="standard-basic"
              variant="standard"
              label="Gender"
            />
            <label style={{ marginTop: "10px" }}>Date of birth</label>
            <TextField
              fullWidth
              value={this.state.dob}
              onChange={(e) => this.setState({ dob: e.target.value })}
              id="date"
              variant="standard"
              type="date"
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              fullWidth
              value={this.state.class}
              onChange={(e) => this.setState({ class: e.target.value })}
              id="standard-basic"
              variant="standard"
              label="Student Class"
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              fullWidth
              value={this.state.year}
              onChange={(e) => this.setState({ year: e.target.value })}
              id="standard-basic"
              variant="standard"
              label="Year"
              type="number"
              sx={{ marginBottom: "15px" }}
            />
            <Button
              variant="contained"
              color="info"
              onClick={this.handleSubmit}
              sx={{ marginTop: "15px" }}
            >
              Create Student
            </Button>
          </FormControl>
        </Box>
      </Stack>
    );
  }
}

const mapStateToProps = (state) => ({
  currentAdmin: state.admin.currentAdmin,
});

export default connect(mapStateToProps)(CreateStudent);
