import axios from 'axios';
export const ngrok_url='https://edf2-43-231-238-206.ngrok-free.app'
export const ngrok_url2='https://76b6-43-231-238-206.ngrok-free.app'
const axiosInstance = axios.create({
    baseURL: `${ngrok_url}/`,
    headers: {
        'Content-Type': 'application/json',
    },
});
const axiosInstance2 = axios.create({
    baseURL: `${ngrok_url2}/`,
    headers: {
        'Content-Type': 'application/json',
    },
});

const registerUser = (formData:FormData) => {
    return axiosInstance.post('auth/register_user/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

const registerRestaurant = (formData:FormData) => {
    return axiosInstance.post('auth/register_restaurant/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

const showItems = (formData:FormData) => {
    return axiosInstance.post('store/show_items/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

const addToCart = (data:any, token:any) => {
    return axiosInstance.post('store/add_to_cart/', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const showCart = (token:any) => {
    return axiosInstance.post('store/show_cart/', null, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const createOrder = (data:any, token:any) => {
    return axiosInstance.post('store/create_order/', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const addReview = (data:any, token:any) => {
    return axiosInstance.post('store/add_review/', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const showFoodItemReviews = (data:any) => {
    return axiosInstance.post('store/show_food_item_reviews/', data);
};
const deliveryOrders = (data:any) => {
    return axiosInstance.post('store/show_orders_to_partner/', data);
};

const sentimentAnalysis = (data:any) => {
    return axiosInstance2.post('sentiment_analysis', data);
};
const getResto = (data:any) => {
    return axiosInstance2.post('get_nearby_restaurants', data);
};
const demandAnalysis = (data:any) => {
    return axiosInstance2.post('demand_analysis', data);
};
const wastageAnalysis = (data:any) => {
    return axiosInstance2.post('wastage_analysis', data);
};
const partnerReq = (data:any) => {
    return axiosInstance2.post('store/accept_partner_request/', data);
};
const getRoute = (data:any) => {
    return axiosInstance.post('store/give_route/', data);
};

const apiServices = {
    registerUser,
    registerRestaurant,
    showItems,
    addToCart,
    showCart,
    createOrder,
    addReview,
    showFoodItemReviews,
    sentimentAnalysis,
    demandAnalysis,
    wastageAnalysis,
    deliveryOrders,
    getResto,
    partnerReq,
    getRoute
};

export default apiServices;