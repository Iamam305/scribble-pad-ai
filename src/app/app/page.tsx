import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { CirclePlus, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
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
                            <Label htmlFor="post_type" className="text-right">
                                Name
                            </Label>
                            <Select id="post_type">
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select post type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Post Types</SelectLabel>
                                        <SelectItem value="linkedin-post">Linkedin Post</SelectItem>
                                        <SelectItem value="blogpost" disabled={true}>Blog Post (comming soon)</SelectItem>
                                        <SelectItem value="twitter-thread" disabled={true}>Twitter Thread (comming soon)</SelectItem>

                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="audio_file" className="text-right">Audio File</Label>
                            <Input id="audio_file" type="file" className="col-span-3" />
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

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline">Show Dialog</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your
                                                account and remove your data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Close</AlertDialogCancel>

                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardFooter>
                        </Card>
                    ))
                }

            </div>
        </div>

    )
}

export default Page