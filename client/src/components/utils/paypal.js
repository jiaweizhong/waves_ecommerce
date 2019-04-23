import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
    render() {

        const onSuccess = (payment) => {
            console.log(JSON.stringify(payment));
            this.props.onSuccess(payment);

        /*    { 
                "paid": true, 
                "cancelled": false, 
                "payerID": "W2WF5WNPEZFNE", 
                "paymentID": "PAYID-LS7FW4A5FS935329D6064044", 
                "paymentToken": "EC-0FJ20681GW904473G", 
                "returnUrl": "https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LS7FW4A5FS935329D6064044&token=EC-0FJ20681GW904473G&PayerID=W2WF5WNPEZFNE", 
                "address": { "recipient_name": "test buyer", "line1": "1 Main St", "city": "San Jose", "state": "CA", "postal_code": "95131", "country_code": "US" }, 
                "email": "jiaweizhong1989-buyer@gmail.com" 
            }
        */
        }

        const onCancel = (data) => {
            console.log(JSON.stringify(data));
        }

        const onError = (er) => {
            console.log(JSON.stringify(er));
        }

        let env = 'sandbox';
        let currency = 'USD';
        let total = this.props.toPay;

        const client = {
            // sandbox key
            sandbox: 'AeMILFe3tWzUv0oCE_VxsT5iidZ2qoAqySGhDAL5zkVRiaAX96ueBhCWKeZuSsD3U6cW3KV2oX_TVqo2',
            production: ''
        }

        return (
            <div>
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        size: 'large',
                        color: 'blue',
                        shape: 'rect',
                        label: 'checkout'
                    }}
                />
            </div>
        );
    }
}

export default Paypal;