'use client'

import { useAudioURL, useCurrentBookInfo, useSearchInputFocus } from "@/zustand/state"
import React, { useState, useRef, useEffect, useCallback } from 'react';
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
    }, [globalAudioURL, updateDuration, updateIsPlaying])

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

    const togglePlay = useCallback(() => {
        updateIsPlaying(true);
        audioRef.current?.play();
    }, [updateIsPlaying]);


    const handleNextAudio = useCallback(() => {
        if (audioInfo.audioIndex < currentBookInfo.episodes.length - 1) {
            const nextAudio = currentBookInfo.episodes[audioInfo.audioIndex + 1]
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
    }, [audioInfo, currentBookInfo, updateAudioInfo, updateIsPlaying, updateGlobalAudioURL])

    const handlePrevAudio = useCallback(() => {
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
    }, [audioInfo, currentBookInfo, updateAudioInfo, updateGlobalAudioURL])

    const togglePause = useCallback(() => {
        updateIsPlaying(false)
        audioRef.current?.pause()
    }, [updateIsPlaying])

    useEffect(() => {
        if (windowAvailable && 'mediaSession' in navigator && currentBookInfo) {
            navigator.mediaSession.metadata = new window.MediaMetadata({
                title: currentBookInfo.bookTitle,
            });

            navigator.mediaSession.setActionHandler('play', togglePlay);
            navigator.mediaSession.setActionHandler('pause', togglePause);
            navigator.mediaSession.setActionHandler("nexttrack", handleNextAudio);
            navigator.mediaSession.setActionHandler("previoustrack", handlePrevAudio);
            navigator.mediaSession.setActionHandler('seekto', (event) => {
                if (audioInfo.current?.currentTime !== event.seekTime) {
                    const newPosition = event.seekTime;
                    audioRef.current!.currentTime = newPosition ?? 0;
                    setCurrentTime(newPosition!);
                }
            });

            // Function to update the media session's position state
            audioRef.current?.addEventListener('timeupdate', updatePositionState);

            // Call the function initially to set the correct position state
            updatePositionState();
        }

        return () => {
            navigator.mediaSession.setActionHandler("play", null);
            navigator.mediaSession.setActionHandler("pause", null);
            navigator.mediaSession.setActionHandler("nexttrack", null);
            navigator.mediaSession.setActionHandler("previoustrack", null);
            navigator.mediaSession.setActionHandler("seekto", null);
        }
    }, [currentBookInfo, handleNextAudio, handlePrevAudio, togglePause, togglePlay, windowAvailable, isPlaying, audioInfo]);

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

    const handleVolumeChange = (volume: number) => {
        audioRef.current!.volume = volume;
    };

    const handleSeek = (time: number) => {
        audioRef.current!.currentTime = time;
        setCurrentTime(time);
    };

    // function updateMediaSessionPosition(position: number) {
    //     if ('mediaSession' in navigator) {
    //         navigator.mediaSession.setPositionState({
    //             duration,
    //             playbackRate: isPlaying ? 1 : 0,
    //             position,
    //         });
    //     }
    // };

    function updatePositionState() {
        if ('setPositionState' in navigator.mediaSession) {
            navigator.mediaSession.setPositionState({
                duration: audioRef.current?.duration || 0,
                playbackRate: audioRef.current?.playbackRate || 1,
                position: audioRef.current?.currentTime || 0,
            });
        }
    }

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

};