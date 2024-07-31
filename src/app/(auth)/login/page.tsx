"use client"
import React, { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from '@/components/ui/use-toast'
import { axios_instance } from '@/configs/axios.config'
import { redirect, useRouter } from 'next/navigation'

type login_input = {
  email: string
  password: string
}
const Page = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<login_input>();
  const onSubmit: SubmitHandler<login_input> = async data => {
    try {
      setLoading(true)
      const res = await axios_instance.request({
        method: "POST",
        url: "api/auth/login",
        data: {
          email: data.email,
          password: data.password
        }
      })
      if (res.status === 201 || res.status === 200) {

        toast({
          title: 'Login successful',

        })

        setLoading(false)
        router.push("/app")
      }
      else {
        toast({
          title: res.data.msg
        })
        setLoading(false)
      }



    } catch (error: any) {
      toast({
        title: error.message,

      })
      setLoading(false)
    }
  };

  return (
    <div className='flex w-full min-h-screen items-center justify-center' >

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required {...register("email")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required {...register("password")} />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={loading} type='submit' className="w-full">Sign in</Button>
          </CardFooter>
        </form>
      </Card>
    </div>

  )
}

export default Page