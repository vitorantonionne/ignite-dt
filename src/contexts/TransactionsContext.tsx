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
  fetchTransactions: (query?: string) => Promise<void>
}

interface TrnsactionsProvaderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsPrivader({children}: TrnsactionsProvaderProps) {
  const [transactions , setTransactions] = useState<transactionProps[]>([])

  async function fetchTransactions(query?: string) {
    const url = new URL('http://localhost:3000/transactions')

    if (query) {
      url.searchParams.append('q', query);
    }

    const response = await fetch(url)
    const data = await response.json()

    setTransactions(data)
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

