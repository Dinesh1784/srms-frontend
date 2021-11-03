import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Stack } from "@mui/material";
import { DeleteRounded, EditRounded, AddCircle } from "@mui/icons-material";
import Lottie from "react-lottie";
import Nodata from "../assets/lottie/37343-nodata.json";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";

const Dashboard = ({ currentAdmin }) => {
  const [students, setStudents] = React.useState([]);
  const history = useHistory();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Nodata,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  React.useEffect(() => {
    const getStudent = () => {
      fetch("http://localhost:5000/api/v1/student")
        .then((res) => res.json())
        .then((res) => {
          //console.log(res.data.student);
          setStudents(res.data.student);
        })
        .catch((err) => {
          console.log(err.message);
          console.log("API ERROR");
        });
    };

    getStudent();
  }, []);

  const handelDelete = (studentid) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this student data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/api/v1/student/${studentid}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              swal("Student Deleted", "", "success");
              window.location.reload();
            } else if (data.status === "BadRequestError") {
              swal("Error Deleting student", "", "error");
            } else if (data.status === "UnauthorizedError") {
              swal("You are not logged in", "", "error");
            }
          })
          .catch((err) => {
            console.log(err);
            swal("Error deleting student", err.message, "error");
          });
      } else {
        swal("Student is Safe", "", "info");
      }
    });
  };
  return (
    <div>
      {students.length > 0 ? (
        <Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Student Name</TableCell>
                  <TableCell align="center">Register Number</TableCell>
                  <TableCell align="center">Class</TableCell>
                  <TableCell align="center">Year</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell align="center">
                      <Link
                        to={`/student/${student._id}`}
                        style={{ textDecoration: "none", fontWeight: "bold" }}
                      >
                        {student.studentname}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      {student.studentrollno}
                    </TableCell>
                    <TableCell align="center">
                      {student.class.toUpperCase()}
                    </TableCell>
                    <TableCell align="center">{student.year}</TableCell>
                    <TableCell align="left">
                      {
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <IconButton color="secondary">
                            <EditRounded />
                          </IconButton>

                          <IconButton
                            color="error"
                            onClick={() => handelDelete(student._id)}
                          >
                            <DeleteRounded />
                          </IconButton>
                          <IconButton
                            color="success"
                            onClick={() =>
                              history.push(`/mark/create/${student._id}`)
                            }
                          >
                            <AddCircle />
                          </IconButton>
                        </Stack>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      ) : (
        <Stack
          height="70vh"
          width="100vw"
          justifyContent="center"
          alignItems="center"
        >
          <Lottie options={defaultOptions} width={350} height={600} />
        </Stack>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentAdmin: state.admin.currentAdmin,
});

export default connect(mapStateToProps)(Dashboard);
