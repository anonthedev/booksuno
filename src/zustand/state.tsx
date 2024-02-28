import { create } from 'zustand'

export const useAudioURL = create((set) => ({
    globalAudioURL: "",
    isPlaying: false,
    audioInfo: {audioName: "", audioAuthor: ""},
    updateGlobalAudioURL: (newURL: string) => set({ globalAudioURL: newURL }),
    updateIsPlaying: (play: boolean) => set({ isPlaying: play}),
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