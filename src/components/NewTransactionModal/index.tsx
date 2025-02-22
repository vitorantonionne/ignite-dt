import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./style";
import { ArrowCircleDown, ArrowCircleUp, X } from "@phosphor-icons/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { api } from "../../lib/axios";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])

})

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>


export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: {isSubmitting},
    reset
  } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleCreateNewTransactions(data: newTransactionFormInputs) {
    const {description, price, category, type } = data;

    await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    reset()
  }

  return(
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24}/>
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransactions)}>
          <input 
          type="text" 
          placeholder="Descrição" 
          required
          {...register('description')}
        />
          <input type="text" 
          placeholder="Preço" 
          required
          {...register('price', {  valueAsNumber: true })}
        />
          <input type="text" 
          placeholder="Categoria" 
          required
          {...register('category')}
        />
      
        <Controller
          control= {control}
          name="type"
          render={({ field }) => {
            return (
              <TransactionType 
                onValueChange={field.onChange} 
                value={field.value}
              >
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24}/>
                  Entrada
                </TransactionTypeButton>

                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24}/>
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )
          }}
        />
          <button type="submit" disabled={isSubmitting}>Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}