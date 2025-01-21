import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

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
  fetchTransactions: (query?: string) => Promise<void>
}

interface TrnsactionsProvaderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsPrivader({children}: TrnsactionsProvaderProps) {
  const [transactions , setTransactions] = useState<transactionProps[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: query,
      }
    })

    setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return(
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      }}>
      {children}
    </TransactionsContext.Provider>
  )
}

