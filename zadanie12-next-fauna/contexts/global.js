import { useState, useEffect, createContext } from "react";

const INITIAL_STATE = {
  theme: 'light',
  selectedEntries:[]
}

export const GlobalContext = createContext(INITIAL_STATE)

export const GlobalProvider = ({ children }) => {

  const [providerState, setProviderState]=useState(INITIAL_STATE)

  useEffect(()=>{
    const selectedItems = JSON.parse(localStorage.getItem('selected') ?? null)
    if(selectedItems) {
      setProviderState(
        {...providerState,
        selectedEntries: selectedItems}
      )
    }
  },[])

  const changeTheme = (theme)=> {

    console.log('changed theme', theme) 
    setProviderState({
      ...providerState, theme
    })

  }

  const handleSelectedChange = (id)=>{
    const isSelected = providerState.selectedEntries.find(item=> item === id);

    const newSelectedArray = isSelected ?
    providerState.selectedEntries.filter(item=>item !== id)
      :
      providerState.selectedEntries.concat(id);
    
    //console.log('changed theme', providerState.selectedEntries) 
    setProviderState({
      ...providerState, 
      selectedEntries: newSelectedArray
    })
    localStorage.setItem('selected', JSON.stringify(newSelectedArray))

  }

  const changeSelectedEntries = (selectedEntries)=> {

    console.log('changed theme', selectedEntries) 
    setProviderState({
      ...providerState, 
      selectedEntries
    })

  }



  return (
    <GlobalContext.Provider value={{
      state: providerState,
      changeTheme,
      handleSelectedChange
    }}>
      {children}
    </GlobalContext.Provider>
  )
  
  }