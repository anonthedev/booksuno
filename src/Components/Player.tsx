'use client'

import { useAudioURL } from "@/zustand/state"
import React, { useState, useRef, useEffect } from 'react';
import AudioController from './AudioController';

export default function AudioPlayer() {

    const { globalAudioURL, isPlaying, updateIsPlaying, updateDuration } = useAudioURL((state: any) => state)
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

    useEffect(() => {
        if (globalAudioURL) {
            document.onkeydown = (e) => {
                if (e.isComposing || e.key === " " || e.key === "Space Bar" || e.code === "Space") {
                    e.preventDefault()
                    updateIsPlaying(!isPlaying)
                }
            }
        }
    })

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

    return (
        <div className="w-screen min-h-[54px] px-2">
            <audio ref={audioRef} src={globalAudioURL} onCanPlay={
                () => { setCanPlay(true) }
            } />
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
};