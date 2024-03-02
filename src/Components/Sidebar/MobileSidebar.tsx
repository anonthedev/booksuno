import Link from "next/link"
import { GoHome } from "react-icons/go"
import { MdOutlineLibraryMusic } from "react-icons/md"

export default function MobileSidebar() {
    return (
        <section className="hidden lg:flex flex-row gap-2 px-4 py-4 w-screen justify-between bg-[#121212] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80">
            <Link href={"/"}><GoHome size={25} /></Link>
            <MdOutlineLibraryMusic size={25} />
            {/* <span></span> */}
        </section>
    )
}
