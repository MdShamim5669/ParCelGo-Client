/**
 * Parcel API Services
 * Note: These functions expect the axiosSecure instance to be passed from the component.
 */

// 1. Create a new parcel
export const createParcel = async (axiosSecure, parcelData) => {
    const { data } = await axiosSecure.post('/api/v1/parcels', parcelData);
    return data;
};

// 2. Get all parcels (with optional email filter for specific user)
export const getParcels = async (axiosSecure, email = '') => {
    const url = email ? `/api/v1/parcels?email=${email}` : '/api/v1/parcels';
    const { data } = await axiosSecure.get(url);
    return data;
};

// 3. Get a specific parcel by ID
export const getParcelById = async (axiosSecure, id) => {
    const { data } = await axiosSecure.get(`/api/v1/parcels/${id}`);
    return data;
};

// 3.5. Get parcels assigned to a specific rider
export const getRiderParcels = async (axiosSecure, email) => {
    const { data } = await axiosSecure.get(`/api/v1/parcels/rider/${email}`);
    return data;
};

// 4. Update parcel status
export const updateParcelStatus = async (axiosSecure, id, statusData) => {
    const { data } = await axiosSecure.patch(`/api/v1/parcels/${id}/status`, statusData);
    return data;
};

// 5. Create Payment Intent (Stripe)
export const createPaymentIntent = async (axiosSecure, id) => {
    const { data } = await axiosSecure.post(`/api/v1/parcels/${id}/create-payment-intent`);
    return data;
};

// 6. Complete Payment
export const payParcel = async (axiosSecure, id, paymentData) => {
    const { data } = await axiosSecure.post(`/api/v1/parcels/${id}/pay`, paymentData);
    return data;
};

// 7. Get All Payments
export const getPayments = async (axiosSecure) => {
    const { data } = await axiosSecure.get('/api/v1/parcels/payments');
    return data;
};
