import Link from "next/link";
import DonateButton from "./DonateButton";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <Link href={"/"} className="text-3xl font-golos font-bold md:text-2xl">
        book<span className="text-yellow-500">suno.</span>
      </Link>
      <div className="flex flex-row gap-5 items-center">
        <DonateButton />
        <a href="https://github.com/anonthedev/booksuno" target="_blank">

          <FaGithub size={25} />
        </a>
      </div>
    </div>
  );
}
