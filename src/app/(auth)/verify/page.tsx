import React from 'react'
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
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
const Page = () => {
    return (
        <div className='flex w-full min-h-screen items-center justify-center' >

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Verify Your Email</CardTitle>
                    <CardDescription>
                        Enter your OTP below to verify your email account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2 justify-center items-center">
                        <Label htmlFor="email">OTP</Label>


                        <InputOTP maxLength={6} >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>


                    </div>

                </CardContent>
                <CardFooter>
                    <Button className="w-full">Verify</Button>
                </CardFooter>
            </Card>
        </div>

    )
}

export default Page