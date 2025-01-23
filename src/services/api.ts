import axios from 'axios';
export const ngrok_url='https://a8c4-43-231-238-206.ngrok-free.app'
const axiosInstance = axios.create({
    baseURL: `${ngrok_url}/`,
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
const sentimentAnalysis = (data:any) => {
    return axiosInstance.post('sentiment_analysis/', data);
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
    sentimentAnalysis
};

export default apiServices;