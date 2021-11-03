import {
  SchoolOutlined,
  AdminPanelSettingsOutlined,
  TouchAppRounded,
  MenuOutlined,
} from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalState.js";
import { drawerState } from "../atom/drawerState.js";
import { connect } from "react-redux";

const Header = ({ currentAdmin }) => {
  const [open, setOpen] = useRecoilState(modalState);
  const [openDrawer, setOpenDrawer] = useRecoilState(drawerState);

  const history = useHistory();
  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: "#1A2138" }}>
      <Toolbar>
        <Box sx={{ flex: 1 }}>
          <Button onClick={() => history.push("/")} color="inherit">
            <Typography sx={{ mr: "5px" }}>SRMS</Typography> <SchoolOutlined />
          </Button>
        </Box>
        <Box>
          {!currentAdmin && (
            <Box>
              <Button onClick={() => setOpen(!open)} color="inherit">
                <Typography sx={{ textTransform: "none" }}>Admin</Typography>
                <AdminPanelSettingsOutlined />
              </Button>
              <Button onClick={() => history.push("/result")} color="inherit">
                <Typography sx={{ textTransform: "none" }}>Result</Typography>
                <TouchAppRounded />
              </Button>
            </Box>
          )}

          {currentAdmin && (
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
              <MenuOutlined sx={{ color: "white" }} />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  currentAdmin: state.admin.currentAdmin,
});

export default connect(mapStateToProps)(Header);
