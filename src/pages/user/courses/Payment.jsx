// src/components/Payment.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import api from '../../../api';

const stripePromise = loadStripe('pk_test_51PiRzCDz2cykTF4owBDM3bwW5OZe67vdBh2PfdInSUeo51mwhurKEvSm3RxN4HLuwINZh90cyo8eNJH0SyDSmPzB00qNa2Krge');

const Payment = ({ courseId, userId }) => {
    const handleClick = async (event) => {
        event.preventDefault();
        const stripe = await stripePromise;

        
        const userEmail = 'student1@yopmail.com'
        // Call your backend to save the purchase status and create a Checkout Session
        try {
            const response = await api.post('/api/save-course/', { courseId, userId });
            if (response.status === 200) {
                // Proceed to create Stripe Checkout session
                const sessionResponse = await api.post('/api/create-checkout-session/', { courseId, userEmail });
                const { id } = sessionResponse.data;

                // Redirect to Stripe Checkout
                const { error } = await stripe.redirectToCheckout({ sessionId: id });

                if (error) {
                    console.error('Error redirecting to checkout:', error);
                }
            } else {
                console.error('Error saving course:', response.data.error);
            }
        } catch (error) {
            console.error('Error handling payment:', error);
        }
    };

    return (
        <button
            role="link"
            onClick={handleClick}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
        >
            Purchase Course
        </button>
    );
};

export default Payment;
