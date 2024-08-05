import { createContext, ReactNode, useEffect, useState } from "react";

interface transactionProps {
  id: string
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createAT: string
}

interface TransactionContextType {
  transactions: transactionProps[]
}

interface TrnsactionsPrivaderProps {
  children: ReactNode
}


export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsPrivader({children}: TrnsactionsPrivaderProps) {
  const [transactions , setTransactions] = useState<transactionProps[]>([])

  async function loadTransactions() {
    const response = await fetch('http://localhost:3000/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return(
    <TransactionsContext.Provider value={{transactions}}>
      {children}
    </TransactionsContext.Provider>
  )
}

