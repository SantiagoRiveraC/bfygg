'use client'

import { createContext, ReactNode, useContext, useState } from "react";

interface IdContexType {
	id: string 
	setId: (id: string) => void
}

interface IdProviderProps {
	children: ReactNode
}

const IdContext = createContext<IdContexType>({id: '', setId: () => {}})



export function IdProvider({children}: IdProviderProps){

	const [ id, setId ] = useState<string>('')

	return (
		<IdContext.Provider value={{ id, setId}}>
			{ children }
		</IdContext.Provider>
	)
}


export function useId(){
	return useContext(IdContext)
}
