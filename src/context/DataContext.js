import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApiFetch from "../hooks/useApiFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

 const history = useNavigate();
 const { data, fetchError, isLoading } = useApiFetch("http://localhost:3500/posts");  

  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(()=> {
    setPosts(data);
  }, [data]);

  useEffect(()=> {
    const filteredResults = posts.filter(
      (post)=> ((post.body).toLowerCase()).includes((search).toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
  
      setSearchResult(filteredResults.reverse());
  }, [posts, search])

    return(
        <DataContext.Provider value={{
            search, setSearch,
            searchResult, fetchError, isLoading,
            posts, setPosts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;