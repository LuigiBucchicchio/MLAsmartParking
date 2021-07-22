import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import ReservationIcon from "@material-ui/icons/EventNote";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import ParkingService from "./ParkingService";
import { getAllDriverVehicle } from "../Driver/Vehicle/VehicleService";
import { reserveParkingSpot } from "./ParkingSpot/ParkingSpotService";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ParkingPlacesList() {
  const [parkingPlaces, setParkingPlaces] = useState([]);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [selectedParkingPlace, setSelectedParkingPlace] = useState("");
  const [selectedVehiclePlate, setSelectedVehiclePlate] = useState("");
  const [selectedTime, setSelectedTime] = React.useState(new Date());

  useEffect(() => {
    ParkingService.getParkingPlaces().then((response) => {
      setParkingPlaces(response.data);
    });
  }, []);

  const listVehicles = vehicles.map((vehicle) => (
    <MenuItem key={vehicle.vehiclePlate} value={vehicle.vehiclePlate}>
      {vehicle.vehiclePlate}
    </MenuItem>
  ));

  const handleReservationSelected = (key, event) => {
    console.log("chiave ");
    console.log(key);
    //setReservationSelected({...reservationSelected, [key]: event.target.value})
    if (key === "time") setSelectedTime(event.target.value);
    else if (key === "vehiclePlate")
      setSelectedVehiclePlate(event.target.value);
  };

  // get vehicle driver, open or close dialog
  const handleReservtionDialog = (parkingPlaceId) => {
    if (!isReservationOpen) {
      console.log(parkingPlaceId);
      setSelectedParkingPlace(parkingPlaceId);
      getAllDriverVehicle()
        .then((res) => {
          console.log(res.data);
          setVehicles(res.data);
        })
        .catch();
    } else {
      setSelectedVehiclePlate("");
      setSelectedParkingPlace("");
    }
    setIsReservationOpen(!isReservationOpen);
  };

  // call to service reservation
  const handleReservationCall = () => {
    var startingTime = new Date();
    var endingTime = new Date();
    endingTime.setHours(startingTime.getHours() + 2);
    console.log(endingTime);

    const data = {
      parkingPlaceId: selectedParkingPlace,
      vehiclePlate: selectedVehiclePlate,
      startingTime: startingTime,
      endingTime: endingTime,
    };
    reserveParkingSpot(data);
  };

  const classes = useStyles();

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ParkingPlace address</TableCell>
              <TableCell align="right">Free Spots</TableCell>
              <TableCell align="right">Book it?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parkingPlaces.map((parkingPlace) => (
              <TableRow key={parkingPlace.parkingPlaceID}>
                <TableCell>{parkingPlace.address}</TableCell>
                <TableCell align="right" component="th" scope="row">
                  {parkingPlace.spotsNumber}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() =>
                      handleReservtionDialog(parkingPlace.parkingPlaceID)
                    }
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <ReservationIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={isReservationOpen}
        onClose={handleReservtionDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Book your spot</DialogTitle>
        <DialogContent>
          <FormLabel component="legend">Vehicle</FormLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ width: 200 }}
            value={selectedVehiclePlate}
            onChange={(e) => handleReservationSelected("vehiclePlate", e)}
          >
            {listVehicles}
          </Select>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Choose your ending time"
                value={selectedTime}
                onChange={(e) => handleReservationSelected("time", e)}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReservationCall}>Confirm</Button>
          <Button onClick={handleReservtionDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
