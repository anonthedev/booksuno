'use client'

import { useAudioURL } from "@/zustand/state"
import { useEffect, useRef } from "react"

export default function Player() {
    const { globalAudioURL, play, duration, skipTo, updateDuration } = useAudioURL((state: any) => state)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const updateDurationPerSec = setInterval(()=>{
            updateDuration(audioRef.current?.currentTime)
        }, 1000)

        return ()=>{
            clearInterval(updateDurationPerSec)
        }
    }, [])

    useEffect(()=>{
        
    }, [])

    return (
        <div className="w-screen">
            <audio ref={audioRef} className="w-full rounded-none" src={globalAudioURL} controls></audio>
        </div>
    )
}
