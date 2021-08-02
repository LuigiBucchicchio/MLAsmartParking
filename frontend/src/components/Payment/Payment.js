import Button from "@material-ui/core/Button";
import { Fragment } from "react";
import { useState } from "react";

import PayPal from "./PayPal";

export default function Payment(props) {
  const [checkout, setCheckout] = useState(false);

  return (
    <Fragment>
      {console.log(props.amount)}
      {checkout ? (
        <PayPal handleReservation={props.handleReservation} amount={props.amount}></PayPal>
      ) : (
        <Button
        color="primary"
          onClick={() => {
            setCheckout(true);
          }}
        >PAY</Button>
      )}
    </Fragment>
  );
}
