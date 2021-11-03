import { Button, Stack, TextField, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import swal from "sweetalert";
import ResultTable from "../components/ResultTable";

const ResultPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [regNo, setRegNo] = React.useState("");
  const [semester, setSemester] = React.useState("");
  const [result, setResult] = React.useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`http://localhost:5000/api/v1/result/${regNo}/${semester}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.status === "NotFoundError") {
          return swal("No Results Found", data.message, "error");
        }
        setRegNo("");
        setSemester("");
        setResult(data.data.mark);
        if (data.status === "success") {
          return swal("Congrats", "Check your result now!", "success");
        }
      })
      .catch((err) => {
        swal("No Results Found", err, "error");
      });
  };
  return (
    <main>
      <Stack alignItems="center">
        <Box
          sx={{
            margin: "10px",
            boxShadow:
              "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;",
            height: "200px",
            maxWidth: "400px",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <Box sx={{ padding: "10px" }}>
            <TextField
              id="standard-basic"
              label="Roll Number"
              variant="standard"
              type="number"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              sx={{ width: "380px" }}
            />
            <TextField
              id="standard-basic"
              label="Semester"
              variant="standard"
              type="number"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              sx={{ marginTop: "10px", width: "380px" }}
            />
          </Box>
          <Box>
            <Button
              variant="text"
              color="success"
              sx={{ mt: "15px", width: "380px" }}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <Stack direction="row" spacing={2}>
                  <CircularProgress size={20} color="success" />
                  <div style={{ textTransform: "none" }}>Checking...</div>
                </Stack>
              ) : (
                "Get Result"
              )}
            </Button>
          </Box>
        </Box>
      </Stack>
      {result.length === 0 ? null : <ResultTable result={result} />}
    </main>
  );
};

export default ResultPage;
