"use client"
import React, { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { axios_instance } from '@/configs/axios.config'
import { toast } from '@/components/ui/use-toast'

type register_input = {
  name: string,
  email: string
  password: string
}
const Page = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<register_input>();
  const on_submit: SubmitHandler<register_input> = async data => {
    try {
      setLoading(true)
      const res = await axios_instance.request({
        method: "POST",
        url: "api/auth/register",
        data: {
          name: data.name,
          email: data.email,
          password: data.password
        }
      })
      if (res.status === 201 || res.status === 200) {

        toast({
          title: 'Registration Successful',

        })
        setLoading(false)
        router.push("/verify?email=" + data.email)
      }
      else {
        toast({
          title: res.data.msg
        })
        setLoading(false)
      }

    } catch (error: any) {
      toast({
        title: error.msg,

      })
      setLoading(false)
    }
  };

  return (
    <div className='flex w-full min-h-screen items-center'>

      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit(on_submit)}>
            <div className="grid  gap-2">

              <Label htmlFor="full-name" >Full Name</Label>
              <Input id="full-name" placeholder="Max" required {...register("name")} />


            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" >Password</Label>
              <Input id="password" type="password" {...register("password")} />
            </div>
            <Button disabled={loading} type="submit" className="w-full">
              Create an account
            </Button>

          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>

  )
}

export default Page