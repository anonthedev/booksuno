/* eslint-disable @next/next/no-img-element */
"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../Loader"
import { useAudioURL, useBookInfo, useCurrentBookInfo } from "@/zustand/state"
import { FaPlay, FaPause } from "react-icons/fa"
import DonateButton from "../DonateButton"
import CurrentPlayingBook from "./CurrentPlayingBook"

export default function Book({ id }: { id: string }) {
    const [loading, setLoading] = useState<boolean>()
    const { updateGlobalAudioURL, globalAudioURL, updateAudioInfo, isPlaying, updateIsPlaying } = useAudioURL((state: any) => state)
    const { updateBookInfo, bookInfo } = useBookInfo((state: any) => state)
    const { updateCurrentBookInfo, currentBookInfo } = useCurrentBookInfo((state: any) => state)

    useEffect(() => {
        setLoading(true)
        axios.get(`/api/bookDetails?bookId=${id}`)
            .then((resp): void => {
                updateBookInfo(resp.data)
            })
            .then(() => {
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return (
            <section className="w-3/4 bg-[#121212] p-4 rounded-lg flex flex-row gap-2 items-center justify-center h-full mb-2 lg:h-fit lg:w-full font-golos">
                <Loader />
                <p>Loading...</p>
            </section>
        )
    }

    return (
        <section className="flex flex-row gap-2 h-full w-full">
            <section className="w-3/4 bg-[#121212] p-4 rounded-lg flex flex-col gap-8 h-full mb-2 xl:w-full lg:h-fit">
                <div className="flex flex-row justify-between items-center">
                    <DonateButton />
                </div>
                <div className="flex flex-col gap-8 overflow-y-auto lg:overflow-y-hidden lg:mb-28">
                    {bookInfo &&
                        <div className="flex flex-col gap-5 max-w-3xl">
                            <h2 className="font-bold text-6xl leading-tight font-gloock tracking-wider md:text-4xl pl-1">{bookInfo.bookTitle}</h2>
                            <p className="font-golos">{bookInfo.bookDesc}</p>
                            <div className="flex flex-col gap-5 font-golos">
                                {bookInfo.episodes.length > 0 && bookInfo.episodes.map((episode: any, index: number) => (
                                    <div className="flex flex-row w-full items-center justify-between md:gap-1" key={index}>
                                        <div className="flex flex-row gap-2 items-center text-lg w-fit">
                                            {isPlaying && globalAudioURL === episode.epURL ?
                                                <FaPause
                                                    className="cursor-pointer"
                                                    size={20}
                                                    onClick={() => {
                                                        updateIsPlaying(false)
                                                    }}
                                                /> : <FaPlay
                                                    className="cursor-pointer"
                                                    size={18}
                                                    onClick={() => {
                                                        updateGlobalAudioURL(episode.epURL)
                                                        updateAudioInfo({
                                                            audioName: episode.epTitle,
                                                            audioAuthor: "",
                                                            bookId: id,
                                                            audioIndex: index,
                                                        })
                                                        updateIsPlaying(true)
                                                        updateCurrentBookInfo(bookInfo)
                                                    }} />}
                                            <span>{index + 1}.</span>
                                            <span className={`md:hidden`} title={episode.epTitle}>{episode.epTitle.length > 60 ? episode.epTitle.slice(0, -(episode.epTitle.length - 60)) + "..." : episode.epTitle}</span>
                                            <span className="hidden md:block text-base" title={episode.epTitle}>{episode.epTitle.length > 40 ? episode.epTitle.slice(0, -(episode.epTitle.length - 40)) + "..." : episode.epTitle}</span>
                                        </div>
                                        <span className="text-gray-500 text-sm">{episode.epDuration}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </section>
            <section className="w-1/4 h-full p-2 rounded-lg bg-[#121212] xl:hidden">
                <CurrentPlayingBook />
            </section>
        </section>
    )
}
