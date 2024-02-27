import { create } from 'zustand'

export const useAudioURL = create((set) => ({
    globalAudioURL: "",
    skipTo: 0,
    duration: 0,
    play: false,
    audioInfo: {audioName: "", audioAuthor: ""},
    audioElRef: null,
    updateGlobalAudioURL: (newURL: string) => set({ globalAudioURL: newURL }),
    updateSkipTo: (seconds: number) => set({ skipTo: seconds }),
    updateDuration: (duration: number) => set({ duration: duration }),
    updatePlay: (play: boolean) => set({ play: play}),
    updateAudioElRef: (elRef: HTMLAudioElement) => set({ audioElRef: elRef}),
    updateAudioInfo: (info: any) => set({ audioInfo: {audioName: info.audioName, audioAuthor: info.audioAuthor}})
}))

export const useUserDetails = create((set) => ({
    userDetails: null,
    updateUserDetails: (details: any) => set({ userDetails: details }),
}))

export const useSearch = create((set) => ({
    searchResults: null,
    updateSearchResults: (results: any) => set({ searchResults: results })
}))