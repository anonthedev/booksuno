import { create } from 'zustand'

export const useAudioURL = create((set) => ({
    globalAudioURL: "",
    skipTo: 0,
    duration: 0,
    play: false,
    updateGlobalAudioURL: (newURL: string) => set({ globalAudioURL: newURL }),
    updateSkipTo: (seconds: number) => set({ skipTo: seconds }),
    updateDuration: (duration: number) => set({ duration: duration }),
    updatePlay: (play: boolean) => set({ play: play})
}))

export const useUserDetails = create((set) => ({
    userDetails: null,
    updateUserDetails: (details: any) => set({ userDetails: details }),
}))

export const useSearch = create((set) => ({
    searchResults: null,
    updateSearchResults: (results: any) => set({ searchResults: results })
}))