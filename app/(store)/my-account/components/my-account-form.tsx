"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useSession } from "next-auth/react"

import { MyAccountSchema } from "@/schemas/myAccountSchema"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { User } from "next-auth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { myAccount } from "@/actions/my-account"
import { LogoutButton } from "./logout-button"

type MyAccountFormProps = {
  user: User & {
    fullName: string;
    phoneNumber: string;
    cpf: string;
  } | undefined
}

type MyAccountValues = z.infer<typeof MyAccountSchema>

export const MyAccountForm = ({ user }: MyAccountFormProps) => {
  const [isPending, startTransition] = useTransition()

  const { update } = useSession()

  const form = useForm<MyAccountValues>({
    resolver: zodResolver(MyAccountSchema),
    defaultValues: {
      fullName: user?.fullName || undefined,
      email: user?.email || undefined,
      cpf: user?.cpf || undefined,
      phoneNumber: user?.phoneNumber || undefined,
      password: undefined,
      newPassword: undefined,
    }
  })

  const onSubmit = (values: MyAccountValues) => {
    startTransition(async () => {
      try {
        await myAccount(values)
        update()
      } catch (error) {
        console.log(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6 max-w-screen-md mx-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="João Silva"
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="joao.silva@exemplo.com"
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="33333333333"
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de telefone</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="9999999999999"
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="*******"
                  type="password"
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="*******"
                  type="password"
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <Button className="bg-[#ff0000] hover:bg-red-600" disabled={isPending}>Atualizar dados</Button>
          <LogoutButton>Sair</LogoutButton>
        </div>
      </form>
    </Form>
  )
}