import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { SubmitHandler, useForm } from 'react-hook-form';
import { axios_instance } from '@/configs/axios.config';
import { toast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
type create_post_input = {
    audio: FileList,
    type: string
}
const Trial = () => {
    const [creation_status, setCreation_status] = useState("standby")
    const [create_post_open, setCreate_post_open] = useState(false);
    const form = useForm<create_post_input>();
    const [post, setPost] = useState(null)

    const on_submit: SubmitHandler<create_post_input> = async (data) => {
        try {
            setCreation_status("Uploading")

            const formData = new FormData();
            formData.append("audio", data.audio[0]);
            const upload_res = await axios_instance.request({
                method: "POST",
                url: "api/v1/file-upload/",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })

            setCreation_status("Creating Post")
            const create_post_res = await axios_instance.request({
                method: "POST",
                url: `api/v1/trial`,
                data: {
                    audio_file_key: upload_res.data.data.audio_file_key,
                    post_type: data.type
                },

            })

            if (create_post_res.status === 201 || create_post_res.status === 200) {
                toast({
                    title: 'Post Created',
                })
                setCreation_status("standby")
                setCreate_post_open(false)
            }
            else {
                toast({
                    title: 'Error creating post',
                })
                setCreation_status("standby")
                setCreate_post_open(false)
            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error creating post',
            })
            setCreation_status("standby")
            setCreate_post_open(false)
        }

    };
    return (
        <Dialog >

            <DialogTrigger asChild>
                <Button size={"lg"} variant={'secondary'}> Try Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">

                {creation_status === "standby" ? (
                    <>
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
                                    <Input id="audio_file" type="file" className="col-span-3" {...form.register("audio")} required />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">Post Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                                <FormControl>

                                                    <SelectTrigger className="col-span-3">
                                                        <SelectValue placeholder="Select post type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent >
                                                    <SelectGroup>
                                                        <SelectLabel>Post Types</SelectLabel>
                                                        <SelectItem value="linkedin">Linkedin Post</SelectItem>
                                                        <SelectItem value="blog-post" >Blog Post</SelectItem>
                                                        <SelectItem value="twitter-thread" >Twitter Thread</SelectItem>

                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>


                                        </FormItem>
                                    )}
                                />


                                <DialogFooter>
                                    <Button disabled={creation_status !== "standby"} type="submit">Create</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </>
                ) : (
                    <>
                        <DialogHeader className='gap-2'>
                            <DialogTitle className='text-center'>{creation_status}...</DialogTitle>
                            <Progress value={creation_status === "Uploading" ? 50 : creation_status === "Creating Post" ? 70 : 100} className="w-full mx-auto" />
                        </DialogHeader>
                    </>
                )}


            </DialogContent>
        </Dialog>
    )
}

export default Trial