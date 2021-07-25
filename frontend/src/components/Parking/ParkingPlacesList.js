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
import { useAlert } from "react-alert";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import ParkingService from "./ParkingService";
import { getAllDriverVehicle } from "../Vehicle/VehicleService";
import { reserveParkingSpot } from "../Reservation/ReservationService";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ParkingPlacesList() {
  const alert = useAlert();
  
  const [parkingPlaces, setParkingPlaces] = useState([]);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [selectedParkingPlace, setSelectedParkingPlace] = useState("");
  const [selectedVehiclePlate, setSelectedVehiclePlate] = useState("");
  const [endingTime, setEndingTime] = React.useState(new Date());

  useEffect(() => {
    ParkingService.getParkingPlaces().then((response) => {
      setParkingPlaces(response.data);
      // minimum parking time
      setEndingTime(endingTime.setMinutes(endingTime.getMinutes() + 10));
    });
  }, []);

  const listVehicles = vehicles.map((vehicle) => (
    <MenuItem key={vehicle.vehiclePlate} value={vehicle.vehiclePlate}>
      {vehicle.vehiclePlate}
    </MenuItem>
  ));

  const handleReservationSelected = (key, event) => {
    //setReservationSelected({...reservationSelected, [key]: event.target.value})
    if (key === "time") {
      setEndingTime(event);
    } else if (key === "vehiclePlate")
      setSelectedVehiclePlate(event.target.value);
  };

  // get vehicle driver, open or close dialog
  const handleReservtionDialog = (parkingPlaceId) => {
    if (!isReservationOpen) {
      setSelectedParkingPlace(parkingPlaceId);

      getAllDriverVehicle()
        .then((v) => {
          console.log(v);
          if (v.data.length > 0) {
            setVehicles(v.data);
            setIsReservationOpen(!isReservationOpen);
          } else alert.show("You need to add a vehicle");
        })
        .catch();
    } else {
      setSelectedVehiclePlate("");
      setSelectedParkingPlace("");
      setIsReservationOpen(!isReservationOpen);
    }
  };

  // call to service reservation
  const handleReservationCall = () => {
    var startingTime = new Date();
    // check if the date and time are valid

    if (endingTime <= startingTime)
      alert.error("Select a valid time")
    else if (endingTime> startingTime) {
      const data = {
        parkingPlaceId: selectedParkingPlace,
        vehiclePlate: selectedVehiclePlate,
        startingTime: startingTime,
        endingTime: endingTime,
      };
      reserveParkingSpot(data);
      handleReservtionDialog()

      //  create a random success sentence
      const rand = Math.floor(Math.random() * 4) + 1 ;
      
      switch(rand){
        case 1:
          alert.success("You have a special place now")
          break;
        case 2:
          alert.success("We were only waiting for you!")
          break;
        case 3:
          alert.success("Park here your car and your bad feelings")
          break;
        case 4:
          alert.success(`${selectedVehiclePlate} is so happy now!`)
          break;
        default:
          alert.success(`${selectedVehiclePlate} reserved!`)
      }
        
      
    }
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
              <div>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  minDate={new Date()}
                  margin="normal"
                  id="date-picker-inline"
                  label="Choose your ending date"
                  value={endingTime}
                  onChange={(date) => handleReservationSelected("time", date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </div>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Choose your ending time (min 10 minutes)"
                value={endingTime}
                onChange={(date) => handleReservationSelected("time", date)}
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
