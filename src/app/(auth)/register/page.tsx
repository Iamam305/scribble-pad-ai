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
import { useForm } from 'react-hook-form'

type register_input = {
  name: string,

  email: string
  password: string
}
const Page = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<register_input>();
  return (
    <div className='flex w-full min-h-screen items-center'>

      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid  gap-2">
              
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="Max" required />
              
             
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
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