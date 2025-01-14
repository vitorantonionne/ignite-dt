import { MagnifyingGlass } from "@phosphor-icons/react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../../contexts/TransactionsContext";

const searchFormSchema = z.object({
  query: z.string()
})

type searchForInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext)

  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<searchForInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: searchForInputs) {
    await fetchTransactions(data.query)
  }

  return(
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input 
        type="text" 
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20}/>
        Buscar
      </button>
    </SearchFormContainer>
  )
}