"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useSession } from "next-auth/react"

import { MyAccountSchema } from "@/schemas/myAccountSchema"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { User } from "next-auth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { myAccount } from "@/actions/my-account"
import { LogoutButton } from "./logout-button"
import Image from "next/image"
import Atualizar from "/public/e-commerce/minha-conta/atualizar-icone.svg"
import Sair from "/public/e-commerce/minha-conta/sair-icone.svg"

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
        className="space-y-6 w-[min(30rem,100%)] mx-auto px-6 md:px:0"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="placeholder:text-gray placeholder:text-lg text-lg border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-medium"
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
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="placeholder:text-gray placeholder:text-lg text-lg border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-medium"
                  {...field}
                  placeholder="33333333333"
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="placeholder:text-gray placeholder:text-lg text-lg border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-medium"
                      {...field}
                      placeholder="joao.silva@exemplo.com"
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="placeholder:text-gray placeholder:text-lg text-lg border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-medium"
                      {...field}
                      placeholder="9999999999999"
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="placeholder:text-gray text-gray placeholder:text-lg text-lg border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-medium"
                  {...field}
                  placeholder="Senha"
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
              <FormControl>
                <Input
                  className="placeholder:text-gray text-gray placeholder:text-lg text-lg border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-medium"
                  {...field}
                  placeholder="Nova senha"
                  type="password"
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <Button
            className="bg-white text-2xl gap-2 rounded-full p-6 inline-flex hover:bg-gray font-bold text-black"
            disabled={isPending}
          >Atualizar
            <Image
              src={Atualizar}
              alt="Símbolo de recarregar"
              className="inline"
            />
          </Button>
          <LogoutButton>
            Sair
            <Image
              src={Sair}
              alt="Símbolo de sair"
              className="inline"
            />
          </LogoutButton>
        </div>
      </form>
    </Form>
  )
}