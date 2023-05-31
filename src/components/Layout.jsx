import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Outlet } from "react-router-dom";

const drawerWidth = 300;
const listofmenuitems = [
  { name: "Create Appointment", path: "createappointment" },
  { name: "Active Appointment", path: "activeappointment" },
];

const hostDetails = { name: "Mithali", position: "Senior Software Engineer" };

const DrawerContent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Toolbar>
        <Typography variant="h4" component="div">
          Visitor Manager
        </Typography>
      </Toolbar>
      <Divider />
      <Paper
        sx={{
          backgroundColor: "#e6f2ff",
          borderRadius: "10px",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          m: "10px",
        }}
      >
        <Typography>
          <b>Host Name: </b>
          {hostDetails.name}
        </Typography>
        <Typography>
          <b>Position:</b>
          {hostDetails.position}
        </Typography>
      </Paper>
      <List>
        {listofmenuitems.map((element, index) => (
          <ListItem key={element.name} disablePadding>
            <ListItemButton
              onClick={() => navigate(element.path)}
              selected={location.pathname.split("/")[1] === element.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "#fff",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "primary.main",
                  color: "#fff",
                },
                mx: "10px",
                borderRadius: "10px",
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <AddIcon /> : <SearchIcon />}
              </ListItemIcon>
              <ListItemText primary={element.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};

function Layout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Container sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Host Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerContent />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerContent />
        </Drawer>
      </Box>
      <Container
        sx={{
          width: { sm: `calc(100vw - ${drawerWidth}px)` },
        }}
      >
        {/* <Toolbar>CreateAppointment</Toolbar> */}

        <Outlet />
      </Container>
    </Container>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Layout;
