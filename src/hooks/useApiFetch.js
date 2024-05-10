import React, { useEffect, useState } from 'react'
import axios from 'axios';

const useApiFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    useEffect(()=>{
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async(url) => {
            setIsLoading(true);

            try {
                const response = await axios.get(url, {
                    cancelToken: source.token 
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if(isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            }finally {
                isMounted &&  setIsLoading(false);
            }
        }

        fetchData(dataUrl);
 
        return ()=> {
            isMounted = false;
            source.cancel("Stopped receiving data from url");
        }
    },[dataUrl]);


  return { data, fetchError, isLoading};
}

export default useApiFetch