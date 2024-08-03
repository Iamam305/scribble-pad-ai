'use client'

import Verify from "@/components/verify"
import { Suspense } from "react"


const Page = () => {


    return (
        <Suspense fallback={< div>Loading...</div>}>
            <Verify />
        </Suspense>


    )
}

export default Page