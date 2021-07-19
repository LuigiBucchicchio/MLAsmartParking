import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ReservationIcon from "@material-ui/icons/EventNote";
import Paper from "@material-ui/core/Paper";

import ParkingService from "./ParkingService"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ParkingPlacesList() {
  const [parkingPlaces, setParkingPlaces] = useState([]);

  useEffect(() => {
    ParkingService.getParkingPlaces().then((response) => {
      setParkingPlaces(response.data);
      console.log(parkingPlaces)
      console.log(response.data)
    });
  }, [null]);

  const handleReservation = () => {

  }

  const classes = useStyles();

  return (
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
                onClick={() => handleReservation()}
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
  );
}
