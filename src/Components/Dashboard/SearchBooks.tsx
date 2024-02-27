import { useState, FormEvent } from "react"
import axios from "axios"
import { useSearch } from "@/zustand/state"
import { FaChevronDown } from "react-icons/fa"
import Link from "next/link"

export default function SearchBooks() {
    const [searching, setSearching] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [collaspeResults, setCollaspeResults] = useState<boolean>(false)

    const [searchFilter, setSearchFilter] = useState("title")

    const { updateSearchResults, searchResults } = useSearch((state: any) => state)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (searchQuery !== "") {
            setSearching(true)
            await axios.get(`/api/search?filter=${searchFilter}&query=${searchQuery}`)
                .then((results) => {
                    updateSearchResults(results.data.books)
                    console.log(results.data)
                })
                .then(() => {
                    setSearching(false)
                    setCollaspeResults(false)
                })
                .catch(() => { setSearching(false) })
        }
    }

    return (
        <section className="w-100 flex flex-col gap-5 font-golos">
            <h2 className="text-4xl font-bold">Search an audiobook</h2>

            <form onSubmit={(e) => { handleSubmit(e) }}
                className="w-full flex flex-row gap-2 md:flex-col">
                <input className="text-black bg-white w-1/2 md:w-full p-4 rounded-md focus:outline-none" placeholder="Enter book name" type="text" name="" id="" onChange={(e) => { setSearchQuery(e.target.value) }} />

                <select className="text-black p-4 rounded-md font-semibold focus:outline-none" onChange={(e) => { setSearchFilter(e.target.value) }} defaultValue={"title"}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="genre">Genre</option>
                </select>

                <button type="submit" disabled={searching} className={`bg-white text-black font-semibold p-4 rounded-md md:w-1/3 ${searching ? "opacity-50" : "opacity-100"}`}>{searching ? "Searching..." : "Search"}</button>
            </form>

            <div className={`${searchResults ? "flex" : "hidden"} flex-row gap-2 items-center w-fit cursor-pointer text-gray-500 font-normal text-sm ease-in duration-300`} onClick={() => { setCollaspeResults(!collaspeResults) }}>
                <FaChevronDown className={`${collaspeResults ? "-rotate-90" : "rotate-0"}`} />
                <span>{collaspeResults ? "Expand search results" : "Collapse search Results"}</span>
            </div>

            {searchResults && searchResults.length > 0 && searchResults.map((book: any) => (
                <div key={book.id} className={`${collaspeResults ? "hidden" : "flex"} flex-row items-center justify-between px-3 ease-in duration-300`}>
                    <Link href={book.id} target="_blank" className="flex flex-row gap-3 items-center">
                        {/* <FaPlay size={20} className="cursor-pointer" /> */}
                        <div className="flex flex-col">
                            <p className="text-gray-200 font-medium">{book.title.length > 40 ? book.title.slice(0, -(book.title.length - 40)) + "..." : book.title}</p>
                            {book.authors.length > 0 && book.authors.map((author: any) => (<p key={author.id} className="text-xs text-gray-500">{author.first_name + " " + author.last_name}</p>))}
                        </div>
                    </Link>
                </div>))
            }
        </section>
    )
}
