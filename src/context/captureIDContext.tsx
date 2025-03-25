import { createContext, ReactNode, useContext, useState } from "react";

interface IdContexType {
	id: string | null
	setId: (id: string) => void
}

interface IdProviderProps {
	children: ReactNode
}

const IdContext = createContext<IdContexType | null >(null)



export function IdProvider({children}: IdProviderProps){

	const [ id, setId ] = useState<string | null >(null)

	return (
		<IdContext.Provider value={{ id, setId}}>
			{ children }
		</IdContext.Provider>
	)
}


export function useId(){
	return useContext(IdContext)
}
