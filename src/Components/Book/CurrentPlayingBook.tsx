"use client"

import { useAudioURL, useCurrentBookInfo } from "@/zustand/state"
import axios from "axios"
import { useEffect, useState } from "react"
import { FaPlay, FaPause } from "react-icons/fa"
import Loader from "../Loader"
import { trimString } from "@/utils/utilFunctions"

export default function CurrentPlayingBook() {
    const [reload, setReload] = useState<boolean>()
    const { audioInfo, updateGlobalAudioURL, globalAudioURL, updateAudioInfo, isPlaying, updateIsPlaying } = useAudioURL((state: any) => state)
    const {currentBookInfo, updateCurrentBookInfo} = useCurrentBookInfo((state: any) => state)
    const [loading, setLoading] = useState<boolean>()

    async function getCurrentBookInfo() {
        await axios.get(`/api/bookDetails?bookId=${audioInfo.bookId}`)
            .then((resp) => { updateCurrentBookInfo(resp.data); setReload(false) })
            .then(() => { setLoading(false) })
            .catch((err) => { console.log(err); setReload(true) })
    }

    useEffect(() => {
        if (audioInfo.bookId) {
            setLoading(true)
            getCurrentBookInfo()
        }
    }, [audioInfo.bookId])

    if (loading) {
        return (
            <section className=" bg-[#121212] flex flex-row gap-2 items-center justify-center w-full h-full font-golos text-center overflow-hidden">
                <Loader />
                <p>Loading...</p>
            </section>
        )
    } else if (!audioInfo.bookId) {
        return (
            <section className=" bg-[#121212] w-full flex flex-row gap-2 items-center justify-center h-full font-golos text-center overflow-hidden">
                <p>Please play some audiobooks</p>
            </section>
        )
    } else if (reload) {
        return (
            <section className=" bg-[#121212] flex flex-row gap-2 items-center justify-center h-full font-golos text-center overflow-hidden">
                <button className="border-[1px] border-gray-500 px-5 py-2 rounded-md duration-300 hover:bg-[#27272a]" onClick={getCurrentBookInfo}>Reload</button>
            </section>
        )
    }

    return (
        <section className="w-full h-full overflow-y-auto">
            {currentBookInfo &&
                <div className="flex flex-col gap-5 p-2">
                    <h2 className="font-bold text-2xl leading-tight font-gloock tracking-wider pl-1">{currentBookInfo.bookTitle}</h2>
                    <p className="font-golos text-sm">{trimString(currentBookInfo.bookDesc, 120)}</p>
                    <div className="flex flex-col gap-5 font-golos">
                        {currentBookInfo.episodes.length > 0 && currentBookInfo.episodes.map((episode: any, index: number) => (
                            <div className="flex flex-row items-center justify-between md:gap-1" key={index}>
                                <div className="flex flex-row gap-2 items-center">
                                    {isPlaying && globalAudioURL === episode.epURL ?
                                        <FaPause
                                            className="cursor-pointer"
                                            size={12}
                                            onClick={() => {
                                                updateIsPlaying(false)
                                            }}
                                        /> : <FaPlay
                                            className="cursor-pointer"
                                            size={12}
                                            onClick={() => {
                                                updateGlobalAudioURL(episode.epURL)
                                                updateAudioInfo({
                                                    audioName: episode.epTitle,
                                                    audioAuthor: "",
                                                    bookId: audioInfo.bookId,
                                                    audioIndex: index,
                                                })
                                                updateIsPlaying(true)
                                            }} />}
                                    <span className="text-sm">{index + 1}.</span>
                                    <span className="text-sm" title={episode.epTitle}>{trimString(episode.epTitle, 20)}</span>
                                </div>
                                <span className="text-gray-500 text-xs">{episode.epDuration}</span>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </section>
    )
}
