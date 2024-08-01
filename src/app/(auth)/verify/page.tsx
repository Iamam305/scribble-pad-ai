'use client'

import { useRouter, useSearchParams } from 'next/navigation'
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
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Suspense, useState } from 'react'
import { axios_instance } from '@/configs/axios.config'
import { toast } from '@/components/ui/use-toast'
const Page = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    console.log(email);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<{ otp: string }>();
    const on_submit: SubmitHandler<{ otp: string }> = async (data) => {
        try {
            setLoading(true)
            const res = await axios_instance.request({
                method: "POST",
                url: "api/auth/verify",
                data: {
                    email, verification_code: data.otp
                }
            })
            if (res.status === 201 || res.status === 200) {

                toast({
                    title: 'Verification Successful',

                })

                setLoading(false)
                router.push("/login")
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
        <>
            <div className='flex w-full min-h-screen items-center justify-center' >

                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Verify Your Email</CardTitle>
                        <CardDescription>
                            Enter your OTP below to verify your email account.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit(on_submit)}>

                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="otp" >OTP</Label>
                                <Input id="otp" type="password" {...register("otp")} />
                                <p className='text-xs text-red'>{errors.otp?.message}</p>
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Button disabled={loading} type='submit' className="w-full">Verify</Button>
                        </CardFooter>
                    </form>

                </Card>
            </div>
        </>


    )
}

export default Page