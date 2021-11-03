import { Add, Logout, NavigateNext } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Toolbar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router";
import { drawerState } from "../atom/drawerState.js";
import { connect } from "react-redux";
import { logOutAdmin } from "../redux/admin/admin.actions";

const CustomDrawer = ({ logOutAdmin, currentAdmin }) => {
  const [openDrawer, setOpenDrawer] = useRecoilState(drawerState);
  const history = useHistory();
  return (
    <div>
      <Drawer
        anchor="right"
        variant="temporary"
        open={openDrawer}
        onClose={() => setOpenDrawer(!openDrawer)}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
        }}
      >
        <Toolbar sx={{ backgroundColor: "#1a2138", color: "white" }}>
          <IconButton
            color="inherit"
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <NavigateNext />
          </IconButton>
        </Toolbar>
        <Divider />
        <Box sx={{ flex: 1, backgroundColor: "#1a2138", color: "white" }}>
          <List>
            <ListItem
              button
              onClick={() => {
                history.push("/create-student");
                setOpenDrawer(false);
              }}
            >
              <Add sx={{ mr: "5px" }} />
              <ListItemText primary="Create Student" />
            </ListItem>
          </List>
        </Box>
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1a2138",
            color: "white",
          }}
        >
          {currentAdmin && (
            <Tooltip title="Logout">
              <IconButton color="inherit" onClick={() => logOutAdmin()}>
                <Logout />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentAdmin: state.admin.currentAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  logOutAdmin: () => dispatch(logOutAdmin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
