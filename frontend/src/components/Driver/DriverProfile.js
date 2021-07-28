import React, { useEffect, useState, Fragment } from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { Edit, Close, Save } from "@material-ui/icons";
import { useAlert } from "react-alert";

import { getProfile, updateProfile } from "./DriverService";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "80ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function DriverProfile() {
  const classes = useStyles();

  const [profile, setProfile] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
  });
  const [edit, setEdit] = useState(false);

  const alert = useAlert();
  // upload driver data
  useEffect(() => {
    getProfile()
      .then((response) => {
        setProfile(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = (el) => {
    setEdit(!edit);
  };

  const handleProfileChange = (prop) => (event) => {
    setProfile({ ...profile, [prop]: event.target.value });
  };

  const saveChanges = () => {
    updateProfile(profile)
      .then(() => {
        alert.success("Changes saved!");
        handleEdit();
        getProfile()
          .then((response) => {
            setProfile(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
        //alert.error("Something went wrong")
      });
  };
  
  return (
    <Fragment>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        {/* <Box m="2rem"> */}
        <List className={classes.root}>
          <ListItem>
            <Typography variant="h4" component="h3">
              Profile Page
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component="p">
              In here you can view and edit your personal informations
            </Typography>
          </ListItem>

          {edit ? (
            <Fragment>
              <ListItem>
                <Box fontWeight={600}>Username: </Box>
                <Typography style={{ margin: 8 }} component="p">
                  {profile.username}
                </Typography>
              </ListItem>
              <ListItem>
                <TextField
                  id="email"
                  label="Email:"
                  style={{ margin: 8 }}
                  placeholder={profile.email}
                  value={profile.email}
                  onChange={handleProfileChange("email")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </ListItem>
              <ListItem>
                <TextField
                  id="name"
                  label="Name:"
                  style={{ margin: 8 }}
                  value={profile.name}
                  onChange={handleProfileChange("name")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="surname"
                  label="Surname:"
                  style={{ margin: 8 }}
                  value={profile.surname}
                  onChange={handleProfileChange("surname")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </ListItem>

              <ListItem>
                <TextField
                  id="password"
                  label="Password:"
                  style={{ margin: 8 }}
                  type="password"
                  value={profile.password}
                  onChange={handleProfileChange("password")}
                />
              </ListItem>
              <ListItem>
                <TextField
                  id="phoneNumber"
                  label="Phone Number:"
                  style={{ margin: 8 }}
                  value={profile.phoneNumber}
                  onChange={handleProfileChange("phoneNumber")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </ListItem>
              <Grid>
                <IconButton onClick={() => handleEdit()} color="secondary">
                  <Close />
                </IconButton>
                <IconButton onClick={() => saveChanges()} color="primary">
                  <Save />
                </IconButton>
              </Grid>
            </Fragment>
          ) : (
            <Fragment>
              <ListItem>
                <Box fontWeight={600}>Username: </Box>
                <Typography style={{ margin: 8 }} component="p">
                  {profile.username}
                </Typography>
              </ListItem>
              <ListItem>
                <Box fontWeight={600}>Email: </Box>
                <Typography component="p">{profile.email}</Typography>
              </ListItem>
              <ListItem>
                <Box fontWeight={600}>Name: </Box>
                <Typography component="p">{profile.name}</Typography>
                <Box fontWeight={600}>Surname: </Box>
                <Typography component="p">{profile.surname}</Typography>
              </ListItem>
              <ListItem>
                <Box fontWeight={600}>Phone Number: </Box>
                <Typography component="p">{profile.phoneNumber}</Typography>
              </ListItem>
              <ListItem>
                <Box fontWeight="fontWeightBold" component="p" type="password">
                  Password hidden for security reasons
                </Box>
              </ListItem>
              <ListItem>
                <Button onClick={() => handleEdit()}>
                  <Edit />
                </Button>
              </ListItem>
            </Fragment>
          )}
        </List>
      </Grid>
    </Fragment>
  );
}
