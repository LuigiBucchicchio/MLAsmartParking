import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ReservationIcon from "@material-ui/icons/EventAvailable";
import CarIcon from "@material-ui/icons/DirectionsCar";

import logo from "../../assets/logo.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,

  title: { color: "#fff" },
  appBar: {
    backgroundColor: "#000",
    color: "#fff",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  underlineNone: {
    textDecoration: "none",
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Link className={clsx(classes.underlineNone)} as={Link} to="/">
            <Typography variant="h6" className={classes.title}>
              <img alt="logo" src={logo} height="30" width="40" />
              MLASmartParking
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawer}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />

          <Link
            className={classes.underlineNone}
            href="#"
            to="/driver"
            onClick={handleDrawer}
          >
            <ListItem button key="Account">
              <ListItemIcon>
                <AccountIcon />
                <ListItemText primary="Account" />
              </ListItemIcon>
            </ListItem>
          </Link>
          <Divider />
          <Link
            className={classes.underlineNone}
            href="#"
            to="/driver/reservations"
            onClick={handleDrawer}
          >
            <ListItem button key="Reservation">
              <ListItemIcon>
                <ReservationIcon />
                <ListItemText primary="Reservation" />
              </ListItemIcon>
            </ListItem>
          </Link>
          <Divider />
          <Link
            className={classes.underlineNone}
            href="#"
            to="/driver/vehicles"
            onClick={handleDrawer}
          >
            <ListItem button key="Vehicle">
              <ListItemIcon>
                <CarIcon />
                <ListItemText primary="Vehicle" />
              </ListItemIcon>
            </ListItem>
          </Link>
          <Divider />
  
            <ListItem button key="Logout" onClick={props.logout}>
              <ListItemIcon>
                <ExitToAppIcon />
                <ListItemText primary="Logout" />
              </ListItemIcon>
            </ListItem>
          
        </List>
      </Drawer>
      <div className={classes.toolbar} />
    </div>
  );
}
