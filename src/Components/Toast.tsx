import { AiOutlineClose } from "react-icons/ai"
import { useEffect, useState } from "react"

export default function Toast(
    { toast, type }:
        { toast: string, type: "success" | "error" | "" }) {
    const [showToast, setShowToast] = useState<boolean>(true)

    return (
        <div className={`max-w-48 top-[calc(100svh-120px)] right-[calc(50vw-140px)] rounded-lg p-4 md:top-3 md:right-3 ${showToast ? "fixed" : "hidden"}`} style={{ backgroundColor: type === "success" ? "#20c997" : type === "error" ? "#e03131" : "#339af0" }}>
            <div className="flex flex-row gap-2 items-center">
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
