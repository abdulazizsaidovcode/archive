import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { config } from "../helpers/token";

export const useFetch = (url) => {
    const [data, setData] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
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


export const DeleteData = (url, id) => {
    axios.delete(url + id, config)
        .then(() => {
            toast.success('successfully deleted')
        }).catch((error) => {
            console.error('Error deleting section:', error);
            toast.error('Failed to delete ')
        })
}


export const PutData = (url, data, id) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
        }
    };

    axios.put(`${url}${id}`, data, config)
        .then(() => {
            toast.success('successfully edited');
        }).catch((error) => {
            console.error('Error on editing:', error);
            toast.error('Failed to edit');
        });
};
