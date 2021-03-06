import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddCircle from "@material-ui/icons/AddCircle";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { useAlert } from "react-alert";

import {
  addNewDriverVehicle,
  deleteDriverVehicle,
  getAllDriverVehicle,
} from "./VehicleService";

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

export default function VehicleList() {
  const classes = useStyles();
  const alert = useAlert();

  const [vehicles, setVehicles] = useState([]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteElement, setDeleteElement] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");

  const handleAddDialog = () => {
    setIsAddOpen(!isAddOpen);
  };

  const handleDeleteDialog = (deleteVehicle) => {
    setDeleteElement(deleteVehicle);
    setIsDeleteOpen(!isDeleteOpen);
  };

  const handleNewVehicle = () => {
    // check if the dialog is filled
    if (type !== "" && vehiclePlate !== "" && brand !== "") {
      handleAddDialog();
      //call to add a new vehicle
      addNewDriverVehicle({
        vehiclePlate: vehiclePlate,
        type: type,
        brand: brand,
      })
        .then(() => {
          getAllDriverVehicle()
            .then((response) => {
              setVehicles(response.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    } else alert.error("Fill the form");
  };

  const handleDeleteVehicle = () => {
    deleteDriverVehicle({
      vehiclePlate: deleteElement,
    })
      .then(() => {
        setIsDeleteOpen(false);
        getAllDriverVehicle()
          .then((response) => {
            setVehicles(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(() => {
        setIsDeleteOpen(false);
      });
  };

  const handleType = (event) => {
    setType(event.target.value);
  };

  const handleVehiclePlate = (event) => {
    setVehiclePlate(event.target.value);
  };

  const handleBrand = (event) => {
    setBrand(event.target.value);
  };

  useEffect(() => {
    getAllDriverVehicle().then((response) => {
      setVehicles(response.data);
    });
  }, []);

  const vehiclesList = vehicles.map((vehicle) => (
    <TableRow key={vehicle.vehiclePlate}>
      <TableCell>{vehicle.vehiclePlate}</TableCell>
      <TableCell align="right" component="th" scope="row">
        {vehicle.brand}
      </TableCell>
      <TableCell align="right">{vehicle.type}</TableCell>
      <TableCell align="right">
        <Button onClick={() => handleDeleteDialog(vehicle.vehiclePlate)}>
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <Fragment>
      <Box m="2rem">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Plate</TableCell>
                <TableCell align="right">Brand</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{vehiclesList}</TableBody>
          </Table>
        </TableContainer>
        <div className={classes.divButtonAdd}>
          <Button
            className={classes.buttonAdd}
            color="primary"
            onClick={handleAddDialog}
          >
            <AddCircle className={classes.addCircle} style={{ fontSize: 50 }} />
          </Button>
        </div>

        <Dialog
          open={isDeleteOpen}
          onClose={handleDeleteDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle>Are you sure you want to delete this?</DialogTitle>
          <DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteVehicle} color="primary">
                Yes
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>

        <Dialog
          open={isAddOpen}
          onClose={handleAddDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a new Vehicle</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="plate"
              label="Target Plate*"
              type="text"
              fullWidth
              onChange={handleVehiclePlate}
            />
            <TextField
              margin="dense"
              id="brand"
              label="Brand*"
              type="text"
              fullWidth
              onChange={handleBrand}
            />

            <FormLabel component="legend">Type*</FormLabel>
            <Select
              id="vehicleType"
              style={{ width: 70 }}
              value={type}
              onChange={handleType}
            >
              <MenuItem value={"CAR"}>CAR</MenuItem>
              <MenuItem value={"MOTORCYCLE"}>MOTORCYCLE</MenuItem>
              <MenuItem value={"AUTOBUS"}>AUTOBUS</MenuItem>
              <MenuItem value={"MOTORCARRIAGE"}>MOTORCARRIAGE</MenuItem>
              <MenuItem value={"CARTRIDGE"}>CARTRIDGE</MenuItem>
              <MenuItem value={"CYCLOMOTOR"}>CYCLOMOTOR</MenuItem>
              <MenuItem value={"MACHINE_OPERATOR"}>MACHINE OPERATOR</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={handleAddDialog}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleNewVehicle}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fragment>
  );
}
