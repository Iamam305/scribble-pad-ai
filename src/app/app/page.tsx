"use client"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { axios_instance } from '@/configs/axios.config'
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type create_post_input = {
    audio: File,
    type: string
}
const Page = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    console.log(posts);

    useEffect(() => {
        fetch_posts()
    }, [])

    const fetch_posts = async () => {
        const res = await axios_instance.request({
            method: "GET",
            url: "api/v1/post/"
        })
        setPosts(res.data.posts)
    }

    const form = useForm<create_post_input>();
    const on_submit: SubmitHandler<create_post_input> = async data => {
        console.log(data);

    };

    return (
        <div className='w-full mx-4 md:mx-auto my-10 max-w-6xl flex flex-col items-end gap-6'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button ><Plus size={16} strokeWidth={1.5} /> Add New</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Post</DialogTitle>
                        <DialogDescription>
                            Upload audio file and select post type to create post.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>

                        <form onSubmit={form.handleSubmit(on_submit)} className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="audio_file" className="text-right">Audio File</Label>
                                <Input id="audio_file" type="file" className="col-span-3" {...form.register("audio")} />
                            </div>
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">Post Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>

                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder="Select post type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent >
                                                <SelectGroup>
                                                    <SelectLabel>Post Types</SelectLabel>
                                                    <SelectItem value="linkedin-post">Linkedin Post</SelectItem>
                                                    <SelectItem value="blogpost" disabled={true}>Blog Post (comming soon)</SelectItem>
                                                    <SelectItem value="twitter-thread" disabled={true}>Twitter Thread (comming soon)</SelectItem>

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>


                                    </FormItem>
                                )}
                            />


                            <DialogFooter>
                                <Button type="submit">Create</Button>
                            </DialogFooter>
                        </form>
                    </Form>

                </DialogContent>
            </Dialog>

            <div className='grid md:grid-cols-3  justify-center gap-4  md:mx-auto '>
                {
                    posts?.map((post: {
                        title: string;
                        body: string;
                        _id: string;
                        type: string;

                    }, index) => (
                        <Card className=" w-full" key={index}>
                            <CardHeader>
                                <CardTitle className='gap-2 flex items-center'>{post?.title}  <Badge className='inline'>{post.type}</Badge></CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>

                                    {post?.body.substring(0, 60)}...
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-end">

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline">Show Dialog</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>{post?.title}</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                {post?.body}
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

// author
// :
// "66a4dc2391faf2a0389aca14"
// body
// :
// "Here is my attempt at transforming the transcription into a polished LinkedIn post:\n\n<linkedin_post>\nMusic: My Lifelong Passion and Unexpected Career Path\n#music #careerchange #personalbranding\n\nAs a child, I was captivated by the power of music to evoke emotions and transport the listener to new worlds. What started as a hobby quickly became a lifelong passion that has shaped my personal and professional journey in unexpected ways.\n\nAfter pursuing a degree in a more \"practical\" field, I found myself drawn back to music, recognizing its ability to connect people and inspire creativity. I took the leap and transitioned my career, leveraging my technical skills and musical expertise to carve out a niche in the music industry.\n\nNow, I have the privilege of working with talented artists, helping them bring their visions to life through sound engineering, production, and artist development. It's incredibly rewarding to be a part of the creative process and witness the transformative power of music.\n\nThrough this experience, I've learned that following your passions, even if they don't fit the traditional mold, can lead to a fulfilling and meaningful career. If you're considering a career change or exploring your creative interests, I encourage you to embrace the unexpected and let your passions guide you.\n\nWhat unexpected paths have you taken in your career? I'd love to hear your story! #MusicIsLife\n</linkedin_post>"
// createdAt
// :
// "2024-07-29T12:31:08.076Z"
// title
// :
// "LinkedIn Post"
// type
// :
// "linkedin-post"
// updatedAt
// :
// "2024-07-29T12:31:08.076Z"