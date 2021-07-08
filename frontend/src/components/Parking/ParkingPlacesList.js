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

import ParkingService from "./ParkingService";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ParkingPlacesList() {
  const [parkingPlaces, setParkingPlaces] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update with API
    ParkingService.getParkingPlaces().then((response) => {
      setParkingPlaces(response.data);
      console.log(response.data);
    });
  }, [null]);

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ParkingPlace address</TableCell>
            <TableCell>Free Spots</TableCell>
            <TableCell align="right">Book it?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parkingPlaces.map((parkingPlace) => (
            <TableRow key={parkingPlace.name}>
              <TableCell>{parkingPlace.address}</TableCell>
              <TableCell align="right" component="th" scope="row">
                {parkingPlace.spotsNumber}
              </TableCell>
              <TableCell align="right">
                <IconButton
                onClick={() => ParkingService.getParkingPlaces}
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
