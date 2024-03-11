import { useState, FormEvent, useEffect } from "react"
import axios from "axios"
import { useSearch, useSearchInputFocus, useCurrentBookInfo } from "@/zustand/state"
import { FaChevronDown } from "react-icons/fa"
import Link from "next/link"
import { PiWaveformBold } from "react-icons/pi"
import Toast from "../Toast"

export default function SearchBooks() {
    const [searching, setSearching] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [collaspeResults, setCollaspeResults] = useState<boolean>(false)
    const [showToast, setShowToast] = useState<boolean>(false)

    const specialCharsRegex = /[^\w\s]|_/g;

    const [searchFilter, setSearchFilter] = useState("title")

    const { updateSearchResults, searchResults } = useSearch((state: any) => state)
    const { updateSearchInputFocused } = useSearchInputFocus((state: any) => state)
    const { currentBookInfo } = useCurrentBookInfo((state: any) => state)

    useEffect(() => {
        if (showToast) {
            const closeToast = setTimeout(() => {
                setShowToast(false)
            }, 3000)
            return () => {
                clearTimeout(closeToast)
            }
        }
    }, [showToast])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (searchQuery !== "") {
            setSearching(true)
            await axios.get(`/api/search?filter=${searchFilter}&query=${searchQuery}`)
                .then((results) => {
                    if (results.data.error !== undefined) {
                        setSearching(false)
                        updateSearchResults([])
                        setShowToast(true)
                    } else {
                        if (searchQuery.split(" ").length > 1) {
                            const filteredResults: any[] = [];
                            results.data.books.forEach((book: any, index: number) => {
                                const title = book.title.toLowerCase().replace(specialCharsRegex, "")
                                if (title.includes(searchQuery.toLowerCase().replace(specialCharsRegex, ""))) {
                                    filteredResults.push(book);
                                }
                            })
                            if (filteredResults.length > 0) {
                                updateSearchResults(filteredResults)
                            } else {
                                updateSearchResults([])
                                setShowToast(true)
                            }
                        } else {
                            updateSearchResults(results.data.books)
                        }
                    }
                })
                .then(() => {
                    setSearching(false)
                    setCollaspeResults(false)
                })
                .catch(() => {
                    setSearching(false)
                    updateSearchResults([])
                    setShowToast(true)
                })
        }
    }

    return (
        <section className="flex flex-col gap-5 font-golos">
            <h2 className="text-4xl font-bold">Search audiobooks</h2>

            <form onSubmit={(e) => { handleSubmit(e) }}
                className="w-full flex flex-row gap-2 md:flex-col">
                <input
                    onFocus={() => { updateSearchInputFocused(true) }}
                    onBlur={() => { updateSearchInputFocused(false) }}
                    className="text-white border-[1px] border-gray-500 bg-transparent w-1/2 md:w-full px-4 py-2 rounded-md focus:outline-none"
                    placeholder={searchFilter === "title" ? "Enter book name" : searchFilter === "author" ? "Enter author's last name" : searchFilter === "genre" ? "Enter genre" : "Enter book name"}
                    type="text"
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                />
                <div className="flex flex-row gap-2 md:justify-center">
                    <select className="text-black px-4 py-2 rounded-md font-medium focus:outline-[1px] duration-300 hover:bg-gray-200" onChange={(e) => { setSearchFilter(e.target.value) }} defaultValue={"title"}>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="genre">Genre</option>
                    </select>
                    <button type="submit" disabled={searching} className={`bg-white text-black font-medium px-4 py-2 rounded-md duration-300 hover:bg-gray-200 ${searching ? "opacity-50" : "opacity-100"}`}>{searching ? "Searching..." : "Search"}</button>
                </div>
            </form>

            {searchResults && searchResults.length > 0 && <div className={`${searchResults ? "flex" : "hidden"} flex-row gap-1 items-center w-full cursor-pointer text-gray-500 font-normal text-sm`} onClick={() => { setCollaspeResults(!collaspeResults) }}>
                <FaChevronDown size={12} className={`${collaspeResults ? "-rotate-90" : "rotate-0"} duration-300`} />
                <span>{collaspeResults ? "Expand search results" : "Collapse search Results"}</span>
                {/* <div className="h-[1px] bg-gray-500 flex-grow mx-2"></div> */}
            </div>}

            {searchResults && searchResults.length > 0 && searchResults.map((book: any) => (
                <div key={book.id} className={`${collaspeResults ? "hidden" : "flex"} flex-row items-center justify-between pl-4 -mt-2`}>
                    <Link href={book.id}
                        className="flex flex-row gap-3 items-center xl:w-full">
                        {/* <FaPlay size={20} className="cursor-pointer" /> */}
                        <PiWaveformBold className={`${currentBookInfo && currentBookInfo.bookId === book.id ? "visible" : "visible"}`} color={`${currentBookInfo && currentBookInfo.bookId === book.id ? "#eab308" : "#272727"}`} />
                        <div className="flex flex-col">
                            <p title={book.title} className="text-gray-200 font-medium text-lg">{book.title.length > 40 ? book.title.slice(0, -(book.title.length - 40)) + "..." : book.title}</p>
                            {book.authors.length > 0 && book.authors.map((author: any) => (<p key={author.id} className="text-xs text-gray-500">{author.first_name + " " + author.last_name}</p>))}
                        </div>
                    </Link>
                </div>))
            }
            {showToast && <Toast toast="Sorry, we couldn't find what you're looking for" type="error" />}
        </section>
    )
}
