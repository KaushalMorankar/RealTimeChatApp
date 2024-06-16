export const baseURL = "http://localhost:5000";

export const postrequest = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        });
        
        if (!response.ok) {
            const errorResponse = await response.json();
            return { error: true, message: errorResponse.message || 'An error occurred' };
        }
        
        return await response.json();
    } catch (error) {
        return { error: true, message: error.message || 'Network error' };
    }
};

export const chatshere = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            const data = await response.json();
            let message = "Error";

            if (data?.message) {
                message = data.message;
            } else {
                message = data;
            }

            return { error: true, message };
        }

        return await response.json();
    } catch (error) {
        return { error: true, message: error.message || 'Network error' };
    }
};
