import React, { useEffect, useState, Fragment } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  Edit,
  Close,
  Save,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";

import { getProfile } from "./DriverService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

export default function DriverProfile() {
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
  });
  const [edit, setEdit] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState();
  const [showPassword, setShowPassword] = useState();

  // upload driver data
  useEffect(() => {
    getProfile().then((response) => {
      setProfile(response.data);
    });
  }, []);

  const handleEdit = (el) => {
    setEdit(!edit);
  };

  const handlePasswordDialog = () => {
    setIsEditingPassword(!isEditingPassword);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleProfileChange = (prop) => (event) => {
    console.log("er")
    console.log(prop)
    console.log(event)
    setProfile({ ...profile, [prop]: event.target.value });
  };

  const saveChanges = () => {};
  const handleChangePassword = () => {};

  return (
    <Fragment>
      <Box m="2rem">
        <Typography variant="h4" component="h3">
          Profile Page
        </Typography>
        <Typography component="p">
          In here you can view and edit your personal informations
        </Typography>

        {edit ? (
          <Fragment>
            <Typography component="p">{profile.username}</Typography>
            <TextField
              id="standard-full-width"
              style={{ margin: 8 }}
              value={profile.name}
              onChange={handleProfileChange("name")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="standard-full-width"
              style={{ margin: 8 }}
              value={profile.surname}
              onChange={handleProfileChange("surname")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="standard-full-width"
              style={{ margin: 8 }}
              placeholder={profile.email}
              value={profile.email}
              onChange={handleProfileChange("email")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="standard-full-width"
              style={{ margin: 8 }}
              type="password"
              placeholder="New Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <TextField
              id="standard-full-width"
              style={{ margin: 8 }}
              value={profile.phoneNumber}
              onChange={handleProfileChange("phoneNumber")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {console.log(profile)}

            <Button onClick={() => saveChanges()}>
              <Save />
            </Button>
            <Button onClick={() => handleEdit()}>
              <Close />
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Typography style={{ margin: 8 }} component="p">
              {profile.username}
            </Typography>
            <Typography component="p">{profile.email}</Typography>
            <Typography component="p" type="password">
              Password hidden for security reasons
            </Typography>
            <Typography component="p">{profile.name}</Typography>
            <Typography component="p">{profile.surname}</Typography>
            <Typography component="p">{profile.phoneNumber}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePasswordDialog}
            >
              Change Password
            </Button>
            <Button onClick={() => handleEdit()}>
              <Edit />
            </Button>
          </Fragment>
        )}
      </Box>
      <Dialog
        open={isEditingPassword}
        onClose={handlePasswordDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change your password</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleProfileChange}>
            Confirm
          </Button>
          <Button color="secondary" onClick={handlePasswordDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
