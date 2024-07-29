import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { CirclePlus, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
const Page = () => {
    return (
        <div className='w-full mx-4 md:mx-auto my-10 max-w-6xl flex flex-col items-end gap-6'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button ><Plus size={16} strokeWidth={1.5} /> Add New</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input id="username" value="@peduarte" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className='grid md:grid-cols-3  justify-center gap-4  md:mx-auto '>
                {
                    Array.from({ length: 9 }, (_, index) => index).map((index) => (
                        <Card className=" w-full" key={index}>
                            <CardHeader>
                                <CardTitle className='gap-2 flex items-center'>Create project  <Badge className='inline'>Badge</Badge></CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Deploy your new project in one-click.Deploy your new project in one-click.Deploy your new project in one-click.Deploy your new project in one-click.Deploy your new project in one-click.</CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-end">

                                <Button variant='outline'>Read More</Button>
                            </CardFooter>
                        </Card>
                    ))
                }

            </div>
        </div>

    )
}

export default Page