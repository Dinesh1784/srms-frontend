import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import swal from "sweetalert";

const SingleStudent = () => {
  const params = useParams();
  const [sname, setSname] = React.useState("");
  const [srollno, setSrollno] = React.useState("");
  const [sgender, setSgender] = React.useState("");
  const [sclass, setSclass] = React.useState("");
  const [syear, setSyear] = React.useState("");
  const [sdob, setSdob] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/v1/student/${params.studentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentname: sname,
        studentrollno: srollno,
        gender: sgender,
        dob: sdob,
        class: sclass,
        year: syear,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          swal("Student Updated", "", "success");
          //console.log(data);
        } else if (data.status === "BadRequestError") {
          swal("Error updating student", "", "error");
        } else if (data.status === "UnauthorizedError") {
          swal("You are not logged in", "", "error");
        }
      })
      .catch((err) => {
        swal("Error updating student", err.message, "error");
        //console.log(err);
      });
  };

  React.useEffect(() => {
    const getStudent = () => {
      fetch(`http://localhost:5000/api/v1/student/${params.studentId}`)
        .then((res) => res.json())
        .then((res) => {
          setSname(res.data.student.studentname);
          setSrollno(res.data.student.studentrollno);
          setSgender(res.data.student.gender);
          setSclass(res.data.student.class);
          setSyear(res.data.student.year);
          setSdob(res.data.student.dob);
        })
        .catch((err) => {
          console.log(err.message);
          console.log("API ERROR");
        });
    };
    getStudent();
  }, [params]);

  //console.log(params);
  return (
    <Container>
      <Typography
        variant="h4"
        style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}
      >
        {sname}
      </Typography>
      <Stack width="100%" justifyContent="center" alignItems="center">
        <FormControl style={{ width: "380px" }}>
          <TextField
            style={{ margin: "15px" }}
            fullWidth
            value={sname}
            onChange={(e) => setSname(e.target.value)}
            variant="standard"
            placeholder="Student Name"
          />
          <TextField
            style={{ margin: "15px" }}
            variant="standard"
            placeholder="Register Number"
            value={srollno}
            type="number"
            onChange={(e) => setSrollno(e.target.value)}
          />
          <label style={{ margin: "5px 15px 0px 15px" }}>DOB</label>
          <TextField
            style={{ margin: "15px" }}
            variant="standard"
            type="date"
            value={sdob}
            onChange={(e) => setSdob(e.target.value)}
          />
          <TextField
            style={{ margin: "15px" }}
            variant="standard"
            placeholder="Gender"
            value={sgender}
            onChange={(e) => setSgender(e.target.value)}
          />
          <TextField
            style={{ margin: "15px" }}
            variant="standard"
            placeholder="Class"
            value={sclass.toUpperCase()}
            onChange={(e) => setSclass(e.target.value)}
          />
          <TextField
            style={{ margin: "15px" }}
            variant="standard"
            placeholder="Year"
            value={syear}
            type="number"
            onChange={(e) => setSyear(e.target.value)}
          />
          <input type="hidden" value={Date.now()} />
          <Button color="secondary" onClick={handleSubmit}>
            Update profile
          </Button>
        </FormControl>
      </Stack>
    </Container>
  );
};

export default SingleStudent;
