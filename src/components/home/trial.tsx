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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { ScrollArea } from '../ui/scroll-area';
import { CopyIcon } from 'lucide-react';
type create_post_input = {
    audio: FileList,
    type: string
}
const Trial = () => {
    const [creation_status, setCreation_status] = useState("standby")
    const [create_post_open, setCreate_post_open] = useState(false);
    const form = useForm<create_post_input>();
    const [post_data, setPost_data] = useState<any>(null)

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

                setPost_data(create_post_res.data)
            }
            else {
                toast({
                    title: create_post_res.data.msg || 'Error creating post',
                })
                setCreation_status("standby")

                setPost_data(null)
            }
        } catch (error: any) {
            console.log(error);
            toast({
                title: error.response.data.msg || 'Error creating post',
            })
            setCreation_status("standby")
            setPost_data(null)
        }

    };
    return (
        <Dialog open={creation_status === "standby" ? create_post_open : true} onOpenChange={setCreate_post_open} >

            <DialogTrigger asChild>
                <Button size={"lg"} variant={'secondary'}> Try Now Without an Account </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-3xl ">

                {post_data ? (
                    <ScrollArea className="h-[50vh]" >

                        <>
                            <DialogHeader>
                                <DialogTitle>{post_data?.title} <Button onClick={() => navigator.clipboard.writeText(post_data?.title)} variant="outline" size="sm" className="p-2 ml-1">
                                    <CopyIcon size={16} />
                                </Button></DialogTitle>


                                <DialogDescription>
                                    {post_data.type == "blog-post" ? (
                                        <>
                                            <Accordion type="single" collapsible className="w-full">
                                                <AccordionItem value="item-1">
                                                    <AccordionTrigger>Description</AccordionTrigger>
                                                    <AccordionContent>
                                                        {post_data?.extra_info.description} <Button onClick={() => navigator.clipboard.writeText(post_data?.extra_info.description)} variant="outline" size="sm" className="p-2 ml-1">
                                                            <CopyIcon size={16} />
                                                        </Button>
                                                    </AccordionContent>
                                                </AccordionItem>
                                                <AccordionItem value="item-2">
                                                    <AccordionTrigger>Tags</AccordionTrigger>
                                                    <AccordionContent>
                                                        {post_data?.extra_info.tags} <Button onClick={() => navigator.clipboard.writeText(post_data?.extra_info.tags)} variant="outline" size="sm" className="p-2 ml-1">
                                                            <CopyIcon size={16} />
                                                        </Button>
                                                    </AccordionContent>
                                                </AccordionItem>

                                            </Accordion>
                                        </>
                                    ) : ""}
                                    {post_data.type == "twitter-thread" ? (
                                        <>
                                            {post_data
                                                ?.body
                                                .split(/\d+\.\s/)
                                                .filter((item: any) => item.trim() !== '')
                                                .map((item: any, index: number) => (
                                                    <p className='mb-2' key={index}>
                                                        {index + 1}. {item} <Button onClick={() => navigator.clipboard.writeText(item)} variant="outline" size="sm" className="p-2 ml-1">
                                                            <CopyIcon size={16} />
                                                        </Button>
                                                    </p>
                                                ))}
                                        </>
                                    ) : (
                                        <p>{post_data?.body} <Button onClick={() => navigator.clipboard.writeText(post_data?.body)} variant="outline" size="sm" className="p-2 ml-1">
                                            <CopyIcon size={16} />
                                        </Button></p>
                                    )}


                                </DialogDescription>
                            </DialogHeader>

                        </>
                    </ScrollArea >
                ) : ""}

                {(creation_status === "standby") ? (
                    <div className='mt-10'>
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
                                    <Input id="audio_file" type="file" accept=".mp3,audio/*" className="col-span-3" {...form.register("audio")} required />
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
                                                        <SelectItem value="linkedin-post">Linkedin Post</SelectItem>
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
                    </div>
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