import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { config } from "../helpers/token";
import { useAuthErrorHandler } from "./error.hadler";

export const useFetch = (url) => {
  const [data, setData] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  
  const handleAuthError = useAuthErrorHandler();


  useEffect(() => {
    setLoading(true);
    axios
      .get(url, config)
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        console.error("Error fetching sections:", error);
        handleAuthError(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, error };
};

export const DeleteData = async (url, id) => {
  try {
    const response = await axios.delete(`${url}${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    toast.success("Successfully deleted");
    return response; // Muvaffaqiyatli natijani qaytarish
  } catch (error) {
    console.error("Error deleting section:", error);
    toast.error("Failed to delete");
    throw error; // Errorni tashlash
  }
};

export const PutData = async (url, data, id) => {
  try {
    const response = await axios.put(`${url}${id}/`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    toast.success("Successfully edited");
    return response;
  } catch (error) {
    console.error("Error on editing:", error);
    toast.error("Failed to edit");
    throw error;
  }
};
export const PostData = async (url, data) => {
  try {
    const response = await axios.post(`${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    toast.success("Successfully added");
    return response;
  } catch (error) {
    console.error("Error on posting:", error);
    toast.error("Failed to add");
    throw error;
  }
};
