import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Email API services
export const emailService = {
    // Send email
    sendEmail: async (emailData) => {
        try {
            const response = await api.post('/emails/send', emailData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get all emails
    getEmails: async (category = 'primary', page = 1, limit = 50, pageToken = null, searchQuery = '') => {
        try {
            const params = { category, page, limit };
            if (pageToken) {
                params.pageToken = pageToken;
            }
            if (searchQuery) {
                params.q = searchQuery;
            }

            const response = await api.get('/emails', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get single email
    getEmailById: async (id) => {
        try {
            const response = await api.get(`/emails/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Toggle star
    toggleStar: async (id) => {
        try {
            const response = await api.put(`/emails/${id}/star`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Toggle read status
    toggleRead: async (id) => {
        try {
            const response = await api.put(`/emails/${id}/read`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

// Health check
export const checkHealth = async () => {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export default api;
