/* eslint-disable @next/next/no-img-element */
"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../Loader"
import { useAudioURL } from "@/zustand/state"
import { FaPlay, FaPause } from "react-icons/fa"

export default function Book({ id }: { id: string }) {
    const [bookInfo, setBookInfo] = useState<any>()
    const [loading, setLoading] = useState<boolean>()
    const { updateGlobalAudioURL, globalAudioURL, updatePlay, play } = useAudioURL((state: any) => state)

    useEffect(() => {
        setLoading(true)
        axios.get(`/api/bookDetails?bookId=${id}`)
            .then((resp): void => {
                setBookInfo(resp.data)
            })
            .then(() => {
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return (
            <section className="bg-[#121212] p-4 rounded-lg flex flex-row gap-1 items-center justify-center h-full mb-2 lg:h-fit font-golos">
                <Loader />
                <p>Loading...</p>
            </section>
        )
    }

    return (
        <section className="bg-[#121212] p-4 rounded-lg flex flex-col gap-8 h-full mb-2 lg:h-fit">
            <div className="flex flex-row justify-between items-center">
                <a href="https://www.buymeacoffee.com/anonthedev" target="_blank">
                    <img
                        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                        alt="Buy Me A Coffee"
                        width={145}
                        height={30}
                    />
                </a>
            </div>
            <div className="flex flex-col gap-8 overflow-y-auto lg:overflow-y-hidden lg:mb-28">
                {bookInfo &&
                    <div className="flex flex-col gap-5 max-w-3xl">
                        <h2 className="font-bold text-6xl leading-tight font-gloock tracking-wider md:text-4xl pl-1">{bookInfo.bookTitle}</h2>
                        <p className="font-golos">{bookInfo.bookDesc}</p>
                        <div className="flex flex-col gap-5 font-golos">
                            {bookInfo.episodes.length > 0 && bookInfo.episodes.map((episode: any, index: number) => (
                                <div className="flex flex-row gap-2 items-center text-lg w-fit" key={index}>
                                    {globalAudioURL && globalAudioURL === episode.epURL ? <FaPause
                                        className="cursor-pointer"
                                        size={20}
                                        onClick={() => {
                                        }}
                                    /> : <FaPlay
                                        className="cursor-pointer"
                                        size={20}
                                        onClick={() => {
                                            updateGlobalAudioURL(episode.epURL)
                                        }} />}
                                    <span>{index + 1}.</span>
                                    <span className="md:hidden" title={episode.epTitle}>{episode.epTitle.length > 60 ? episode.epTitle.slice(0, -(episode.epTitle.length - 60)) + "..." : episode.epTitle}</span>
                                    <span className="hidden md:block" title={episode.epTitle}>{episode.epTitle.length > 40 ? episode.epTitle.slice(0, -(episode.epTitle.length - 40)) + "..." : episode.epTitle}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>

        </section>
    )
}
