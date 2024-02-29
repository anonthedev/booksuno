'use client'

import { useState } from "react";
import Feed from "./Feed";
import Image from "next/image";
import Loader from "../Loader";
import SearchBooks from "./SearchBooks";
import Donate from "../Donate";

export default function Dashboard() {
    const [loading, setLoading] = useState<boolean>()

    if (!loading) {
        return (
            <section className="bg-[#121212] p-4 rounded-lg flex flex-col gap-8 h-full mb-2 lg:h-fit">
                <div className="flex flex-row justify-between items-center">
                    <Donate/>
                </div>
                <div className="flex flex-col gap-8 overflow-y-auto lg:overflow-y-hidden lg:mb-28">
                    <SearchBooks />
                    <Feed />
                </div>

            </section>
        )
    } else {
        <div className="w-full h-full items-start justify-center">
            <Loader />
        </div>
    }
}
