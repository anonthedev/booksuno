import { AiOutlineClose } from "react-icons/ai"
import { useEffect, useState } from "react"

export default function Toast(
    { toast, type }:
        { toast: string, type: "success" | "error" | "" }) {
    const [showToast, setShowToast] = useState<boolean>(true)

    return (
        <div className={`fixed w-fit md:w-auto top-[calc(100svh-120px)] -translate-x-1/2 left-1/2 ml-3 md:top-3 md:right-3 md:-translate-x-0 duration-300 ${showToast ? "block" : "hidden"}`} >
            <div className="w-fit max-w-48 flex flex-row gap-2 items-center p-4 rounded-lg md:max-w-64" style={{ backgroundColor: type === "success" ? "#20c997" : type === "error" ? "#e03131" : "#339af0" }}>
                <span className="text-sm font-semibold">
                    &#9432; {toast}
                </span>
                <button onClick={() => {
                    if (showToast) {
                        setShowToast(false)
                    }
                }} className={``}><AiOutlineClose /></button>
            </div>
        </div>
    )
}
