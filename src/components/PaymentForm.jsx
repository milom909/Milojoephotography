import React, { useState } from 'react';
import { processPayment } from '../services/payment';

const PaymentForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            const response = await processPayment({ cardNumber, expiryDate, cvv });
            if (response.success) {
                setSuccess(true);
            } else {
                setError('Payment failed. Please check your details and try again.');
            }
        } catch (err) {
            setError('An error occurred while processing your payment. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Card Number</label>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Expiry Date</label>
                <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>CVV</label>
                <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>Payment successful!</div>}
            <button type="submit">Pay Now</button>
        </form>
    );
};

export default PaymentForm;