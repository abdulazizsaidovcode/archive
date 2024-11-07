
export const config = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
}