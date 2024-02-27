'use client'

import { useAudioURL } from "@/zustand/state"
import React, { useState, useRef, useEffect } from 'react';
import AudioController from './AudioController';

const AudioPlayer = () => {

    const { globalAudioURL } = useAudioURL((state: any) => state)
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(()=>{
        if(globalAudioURL){
            setIsPlaying(true)
            audioRef.current?.play()
        }
    }, [globalAudioURL])

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

    const togglePlay = () => {
        setIsPlaying(true);
        audioRef.current?.play();
    };

    const togglePause = () => {
        setIsPlaying(false)
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
        <div className="w-screen min-h-[54px] px-4">
            <audio ref={audioRef} src={globalAudioURL} />
            <AudioController
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

export default AudioPlayer;
