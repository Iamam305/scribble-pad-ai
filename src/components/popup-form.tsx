import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { axios_instance } from "@/configs/axios.config"
import { useState } from "react"
import { toast } from "./ui/use-toast"
import { Textarea } from "./ui/textarea"
const PopupForm = ({
    form_name,
    form_buttton_name,
    form_description
}: {
    form_name: string;
    form_buttton_name: string;
    form_description: string;

}) => {

    const [form_data, setForm_data] = useState({
        name: "",
        email: "",
        message: ""
    })
    const [loading, setLoading] = useState(false)
    const submitForm = async () => {
        try {
            setLoading(true)
            const res = await axios_instance.request({
                method: "POST",
                url: `https://formsubmit.co/ajax/${process.env.NEXT_PUBLIC_FORMSUBMIT_API_KEY}`,
                data: { ...form_data, form_name },
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },

            });


            setForm_data({
                name: "",
                email: "",
                message: ""
            })
            toast({
                title: 'Form Submitted Successfully',
            })
            setLoading(false)

        } catch (error) {
            console.error(error);
            setLoading(false)
            toast({
                title: 'Error Submitting Form',
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{form_buttton_name}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{form_name}</DialogTitle>
                    <DialogDescription>
                        {form_description}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col w-full   gap-2">
                        <Label htmlFor="name" className="text-left">
                            Full Name*
                        </Label>
                        <Input onChange={(e) => setForm_data({ ...form_data, name: e.target.value })} id="name" value={form_data.name} className="col-span-3" />
                    </div>
                    <div className="flex flex-col w-full   gap-2">
                        <Label htmlFor="email" className="text-left">
                            Email*
                        </Label>
                        <Input id="email" onChange={(e) => setForm_data({ ...form_data, email: e.target.value })} value={form_data.email} type="email" className="col-span-3" />
                    </div>

                    <div className="flex flex-col w-full   gap-2">
                        <Label htmlFor="Message" className="text-left">
                            Message
                        </Label>
                        <Textarea id="Message" onChange={(e) => setForm_data({ ...form_data, message: e.target.value })} value={form_data.message} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={loading || !form_data.name || !form_data.email} type="submit" onClick={submitForm}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PopupForm