import { HomeContextValue } from '@/types/datatypes'
import { createContext, useContext } from 'react'


const HomeContext = createContext<HomeContextValue | null>(null)
const HomeProvider = HomeContext.Provider

const useHomeContext = () => {
  const context = useContext(HomeContext)

  if (!context) {
    throw new Error(
      "Home compound components can't be rendered outside HomeContainer component"
    )
  }

  return context
}

export { HomeProvider, useHomeContext }
