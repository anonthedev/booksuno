import Link from "next/link";
import DonateButton from "./DonateButton";

export default function Navbar() {
    return (
        <div className="w-full flex flex-row justify-between items-center">
            <Link href={"/"} className="text-3xl font-golos font-bold md:text-2xl">book<span className="text-yellow-500">suno.</span></Link>
            <DonateButton />
        </div>
    )
}
