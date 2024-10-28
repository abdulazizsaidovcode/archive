import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        setLoading(true)
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.get(url, config)
            .then((response) => {
                setData(response.data);
            })
            .catch(() => {
                console.error('Error fetching sections:', error);
                setError(error)
            }).finally(() => {
                setLoading(false)
            })

    }, [])

    return { data, error }
};