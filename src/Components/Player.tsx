'use client'

import { useAudioURL, useCurrentBookInfo, useSearchInputFocus } from "@/zustand/state"
import React, { useState, useRef, useEffect } from 'react';
import AudioController from './AudioController';

export default function AudioPlayer() {
    const { globalAudioURL, isPlaying, updateIsPlaying, updateDuration, updateGlobalAudioURL, updateAudioInfo, audioInfo } = useAudioURL((state: any) => state)
    const { currentBookInfo } = useCurrentBookInfo((state: any) => state)
    const { searchInputFocused } = useSearchInputFocus((state: any) => state)

    const windowAvailable = typeof window !== "undefined"

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [canPlay, setCanPlay] = useState<boolean>(false);

    useEffect(() => {
        if (globalAudioURL) {
            setCanPlay(false)
            updateIsPlaying(true)
            updateDuration(audioRef.current?.duration)
            audioRef.current?.play()
        }
    }, [globalAudioURL])

    useEffect(() => {
        if (isPlaying === true) {
            audioRef.current?.play()
        }
        else if (isPlaying === false) {
            audioRef.current?.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        const audioElement = audioRef.current!;

        const handleTimeUpdate = () => {
            setCurrentTime(audioElement.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audioElement.duration);
        };

        audioElement.addEventListener('timeupdate', handleTimeUpdate);
        audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);

    // useEffect(() => {
    //     console.log(searchInputFocused)
    //     if (globalAudioURL && !searchInputFocused) {
    //         document.onkeydown = (e) => {
    //             if (e.isComposing || e.key === " " || e.key === "Space Bar" || e.code === "Space") {
    //                 e.preventDefault()
    //                 updateIsPlaying(!isPlaying)
    //             }
    //         }
    //     }
    // })

    const handleNextAudio = () => {
        if (audioInfo.audioIndex < currentBookInfo.episodes.length - 1) {
            const nextAudio = currentBookInfo.episodes[audioInfo.audioIndex + 1]
            // console.log(nextAudio)
            updateGlobalAudioURL(nextAudio.epURL)
            updateAudioInfo({
                audioName: nextAudio.epTitle,
                audioAuthor: "",
                bookId: audioInfo.bookId,
                audioIndex: audioInfo.audioIndex + 1,
            })
        } else {
            updateIsPlaying(false)
        }
    }

    const handlePrevAudio = () => {
        if (audioInfo.audioIndex > 0) {
            const prevAudio = currentBookInfo.episodes[audioInfo.audioIndex - 1]
            updateGlobalAudioURL(prevAudio.epURL)
            updateAudioInfo({
                audioName: prevAudio.epTitle,
                audioAuthor: "",
                bookId: audioInfo.bookId,
                audioIndex: audioInfo.audioIndex - 1,
            })
        }
    }

    const togglePlay = () => {
        updateIsPlaying(true);
        audioRef.current?.play();
    };

    const togglePause = () => {
        updateIsPlaying(false)
        audioRef.current?.pause()
    }

    const handleVolumeChange = (volume: number) => {
        audioRef.current!.volume = volume;
    };

    const handleSeek = (time: number) => {
        audioRef.current!.currentTime = time;
        setCurrentTime(time);
    };

    if (windowAvailable) {
        return (
                <div className="w-screen min-h-[54px] px-2">
                    <audio ref={audioRef} src={globalAudioURL} onCanPlay={
                        () => { setCanPlay(true) }
                    } onEnded={handleNextAudio} />
                    <AudioController
                        canPlay={canPlay}
                        onPlay={togglePlay}
                        onPause={togglePause}
                        isPlaying={isPlaying}
                        onVolumeChange={handleVolumeChange}
                        onSeek={handleSeek}
                        currentTime={currentTime}
                        duration={duration}
                    />
                </div>
        );
    }
};