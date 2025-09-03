import React from 'react';
import PaymentForm from '../components/PaymentForm';

const Checkout = () => {
    return (
        <div>
            <h1>Checkout</h1>
            <p>Please review your selected photos and complete your purchase.</p>
            <PaymentForm />
        </div>
    );
};

export default Checkout;