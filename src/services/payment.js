import axios from 'axios';

const PAYMENT_API_URL = 'https://api.paymentgateway.com/process'; // Replace with actual payment gateway URL

export const processPayment = async (paymentData) => {
    try {
        const response = await axios.post(PAYMENT_API_URL, paymentData);
        return response.data;
    } catch (error) {
        throw new Error('Payment processing failed: ' + error.message);
    }
};

export const validatePaymentData = (data) => {
    const { cardNumber, expiryDate, cvv } = data;
    if (!cardNumber || !expiryDate || !cvv) {
        throw new Error('All payment fields are required.');
    }
    // Additional validation logic can be added here
};