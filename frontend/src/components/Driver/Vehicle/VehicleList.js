import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddCircle from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Typography from "@material-ui/core/Typography";

import { getAllDriverVehicle } from "./VehicleService";

const useStyles = makeStyles({
  addCircle: {
    maxWidth: 200,
    height: 200,
  },
  backgroundWallpaper: {
    backgroundColor: "grey",
  },
  marginAutoContainer: {
    display: "flex",
    backgroundColor: "gold",
  },
  marginAutoItem: {
    margin: "auto",
  },
  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  media: {
    height: 140,
  },

  centeredIcon: {
    display: "flex",
    alignItems: "center",
  },

  buttonAdd: {
    width: "100%",
    justifyContent: "center",
  },
});

export default function VehicleList() {
  const classes = useStyles();

  const [vehicles, setVehicles] = useState()
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const handleDialog = () => {
    setOpen(!open);
  };

  const handleNewVehicle = () => {
    // check if the dialog is filled
    if (type != "") {
      handleDialog();
      //call to add a new vehicle
    }
  };

  const handleType = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    getAllDriverVehicle().then((response) => {
      console.log(response.data);
    });
  }, [null]);

  const dataTest = [{ id: 1, plate: "FG456TH", type: "Duna" }];

  const cars = dataTest.map((d) => (
    <Card key={d.id} className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  ));

  return (
    <Fragment>
      <div className={classes.alignItemsAndJustifyContent}>{cars}</div>
      <Button
        className={classes.buttonAdd}
        color="primary"
        onClick={handleDialog}
      >
        <AddCircle className={classes.addCircle} style={{ fontSize: 50 }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new Vehicle</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add all the requirements information
          </DialogContentText>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            onChange={handleType}
          >
            <MenuItem value={"car"}>Car</MenuItem>
            <MenuItem value={"motorcycle"}>Motorcycle</MenuItem>
          </Select>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Target Plate"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleNewVehicle} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
