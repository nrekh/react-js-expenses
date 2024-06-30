const API_URL = "https://expenses-backend-mu.vercel.app/expenses";

//Function to fetch expense data from the api provided
export async function fetchExpenses() {
    const headers = {
        "Content-Type": "application/json",
        //Improvement - Move username to an env file
        "Username": "Sth.Sth"
    };

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: headers
        });
        if (!response.ok) {
            throw new Error('Failed to get expense data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}