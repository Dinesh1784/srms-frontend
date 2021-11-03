import React from "react";
import swal from "sweetalert";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router";

const CreateMark = () => {
  const params = useParams();
  const [subject, setSubject] = React.useState("");
  const [semester, setSemester] = React.useState("");
  const [mark, setMark] = React.useState("");
  //   console.log(params);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/v1/student/${params.studentid}/mark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: subject,
        semester: semester,
        securedMark: mark,
        studentid: params.studentid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setMark("");
          setSemester("");
          setSubject("");
          swal("Mark Created", "", "success");
        } else if (data.status === "BadRequestError") {
          swal("Error creating mark", "", "error");
        } else if (data.status === "UnauthorizedError") {
          swal("You are not logged in", "", "error");
        }
      })
      .catch((err) => {
        swal("Error creating mark", err, "error");
      });
  };
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
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            id="standard-basic"
            variant="standard"
            label="Subject Name"
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            fullWidth
            value={mark}
            onChange={(e) => setMark(e.target.value)}
            id="standard-basic"
            variant="standard"
            label="Mark"
            type="number"
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            fullWidth
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            id="standard-basic"
            variant="standard"
            label="Semester"
          />
          <Button
            variant="contained"
            color="info"
            onClick={handleSubmit}
            sx={{ marginTop: "15px" }}
          >
            Create Mark
          </Button>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default CreateMark;
