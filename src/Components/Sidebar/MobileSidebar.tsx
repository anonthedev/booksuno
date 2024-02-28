import Link from "next/link"
import { GoHome } from "react-icons/go"
import { MdOutlineLibraryMusic } from "react-icons/md"

export default function MobileSidebar() {
    return (
        <section className="hidden lg:flex flex-row gap-2 px-4 py-4 w-screen justify-between bg-gradient-to-t from-black to-[#2a2929]">
            <Link href={"/"}><GoHome size={25} /></Link>
            <MdOutlineLibraryMusic size={25} />
            {/* <span></span> */}
        </section>
    )
}
