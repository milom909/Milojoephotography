import axios from 'axios';

const API_URL = 'https://api.example.com/photos'; // Replace with your actual API URL

export const fetchPhotos = async (query) => {
    try {
        const response = await axios.get(`${API_URL}?search=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching photos:', error);
        throw error;
    }
};

export const fetchPhotoDetails = async (photoId) => {
    try {
        const response = await axios.get(`${API_URL}/${photoId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching photo details:', error);
        throw error;
    }
};