import { useContext } from "react";

const DataContext = useContext({});

export const DataProvider = ({ children }) => {
    return(
        <DataContext.Provider value={{
            
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;