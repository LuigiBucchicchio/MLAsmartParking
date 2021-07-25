import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useAlert } from "react-alert";

import { getAllReservationOneDriver } from "./ReservationService";

const useStyles = makeStyles({
  addCircle: {
    maxWidth: 100,
    height: 100,
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
  divButtonAdd: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },

  buttonAdd: {
    justifyContent: "center",
  },
});

export default function ReservationList() {
  const classes = useStyles();
  const alert = useAlert();

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getAllReservationOneDriver()
      .then((listReservation) => {
        if (listReservation.data.length === 0) {
          alert.info("Make a reservation to bee");
        }
        setReservations(listReservation.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [alert]);

  const convertStringTimestampToDay = (string) => {
    const t = new Date(string);
    return `${t.toLocaleDateString()}`;
  };

  const convertStringTimestampToTime = (string) => {
    const t = new Date(string);
    return `${t.getHours()}:${t.getMinutes()}`;
  };

  const getReservationDuration = (startingTime, endingTime) => {
    const sTime = new Date(startingTime);
    const eTime = new Date(endingTime);

    const durationInMillis = eTime.getTime() - sTime.getTime();

    //Hour 3600000
    const hours = Math.floor(Math.round(durationInMillis / 3600000));
    // minute 60000
    const minutes = Math.floor(
      Math.round((durationInMillis % 3600000) / 60000)
    );

    // data to print
    if (hours === 0) {
      return `${minutes}m`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  };

  const reservationsList = reservations.map((reservation) => (
    <TableRow key={reservation.startingTime}>
      <TableCell>{reservation.vehiclePlate}</TableCell>
      <TableCell align="right" component="th" scope="row">
        {reservation.parkingPlaceAddress}
      </TableCell>
      <TableCell align="right" component="th" scope="row">
        {reservation.parkingPlaceSpot}
      </TableCell>
      <TableCell align="right" component="th" scope="row">
        {convertStringTimestampToDay(reservation.startingTime)}
      </TableCell>
      <TableCell align="right">
        {convertStringTimestampToTime(reservation.startingTime)}
      </TableCell>
      <TableCell align="right">
        {getReservationDuration(
          reservation.startingTime,
          reservation.endingTime
        )}
      </TableCell>
    </TableRow>
  ));

  return (
    <Fragment>
      <div className={classes.alignItemsAndJustifyContent}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Vehicle Plate</TableCell>
              <TableCell align="right">Parking Place Address</TableCell>
              <TableCell align="right">Parking Spot</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.length > 0 ? reservationsList : null}
          </TableBody>
        </Table>
      </div>
    </Fragment>
  );
}
