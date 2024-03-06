"use client"

import axios from "axios"
import { useMemo, useState } from "react"
import Link from "next/link"
import Loader from "../Loader"
import { FaArrowRight } from "react-icons/fa6";
import { PiWaveformBold } from "react-icons/pi";
import { useCurrentBookInfo } from "@/zustand/state"

export default function Feed() {
    const [feed, setFeed] = useState<any>()
    const [loading, setLoading] = useState<boolean>()
    const { currentBookInfo } = useCurrentBookInfo((state: any) => state)

    useMemo(() => {
        setLoading(true)
        axios.get("/api/feed")
            .then((resp): void => {
                setFeed(resp.data)
            })
            .then(() => { setLoading(false) })
            .catch((err) => { console.log(err) })
    }, [])

    return (
        <section className="flex flex-col gap-5 font-golos">
            <h2 className="text-3xl font-bold">You might like</h2>
            <div className="flex flex-col gap-4">
                {!loading ? feed && feed.books.length > 0 && feed.books.map((book: any) => (
                    <div className="flex flex-row gap-3 items-center justify-between" key={book.id}>
                        <Link href={book.id} className="flex flex-row gap-3 items-center cursor-pointer w-fit md:w-full">
                            <PiWaveformBold className={`${currentBookInfo && currentBookInfo.bookId === book.id ? "visible" : "visible"}`} color={`${currentBookInfo && currentBookInfo.bookId === book.id ? "#eab308" : "#272727"}`} />
                            <div>
                                <p className={`text-gray-200 font-medium text-lg`}>{book.title.length > 40 ? book.title.slice(0, -(book.title.length - 40)) + "..." : book.title}</p>
                                {book.authors.length > 0 && book.authors.map((author: any) => (<p key={author.id} className="text-xs text-gray-500">{author.first_name + " " + author.last_name}</p>))}
                            </div>
                        </Link>
                        <Link href={book.id} className="pr-2 lg:pr-0">
                            <FaArrowRight color="#6b7280" />
                        </Link>
                    </div>
                )) : <div className="flex flex-row gap-2 items-center justify-center my-2">
                    <Loader />
                    <p>Loading...</p>
                </div>}
            </div>
        </section>
    )
}
