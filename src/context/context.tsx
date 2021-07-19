// import React, { Children, useContext, useState } from 'react'

// const AppContext = React.createContext({})

// export const AppProvider = ({}) => {
//   const [stateID, setStateID] = useState('SH')
//   const [stateName, setStateName] = useState('Schleswig-Holstein')

//   return (
//     <AppContext.Provider
//       value={{ stateID, setStateID, stateName, setStateName }}
//     ></AppContext.Provider>
//   )
// }

// export const useGlobalContext = () => {
//   return useContext(AppContext)
// }

import React, { useState, useContext } from 'react'

type SetValue = (value: any) => void

interface AppContextInterface {
  stateID: any
  setStateID: SetValue
  stateName: any
  setStateName: SetValue
}

export const AppContext = React.createContext<
  AppContextInterface | null | {} | any
>({})

export const AppProvider: React.FC = ({ children }) => {
  const [stateID, setStateID] = useState('SH')
  const [stateName, setStateName] = useState('Schleswig-Holstein')
  const [metaData, setMetaData] = useState({})
  return (
    <AppContext.Provider
      value={{
        stateID,
        setStateID,
        stateName,
        setStateName,
        metaData,
        setMetaData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
