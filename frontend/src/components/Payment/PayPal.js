import React, { Fragment, useEffect, useRef } from "react";

export default function PayPal(props) {
  const paypal = useRef();

  useEffect(() => {
    window.paypal.Buttons({
        createOrder: (data, actions, err) => {
            return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        description: "Reservation ",
                        amount: {
                            currency: 'EUR',
                            value: props.amount
                        }
                    }
                ]
            })
        },
        onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            props.handleReservation()
            console.log("OKKO")
        },
        onError: async (err) => {
            console.log(err)
        }
    }).render(paypal.current);
  }, []);

  return (
    <Fragment>
      <div ref={paypal}></div>
    </Fragment>
  );
}
