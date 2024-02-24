import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <section className="bg-[#ccc5b9] w-screen h-screen font-gloock flex items-center justify-center flex-col">
        <h1 className="text-[#252422] text-[20em]  lg:text-[5.5em]">YOUDIO</h1>
        <span className="font-golos text-black font-semibold mb-10 md:mb-8 md:text-xs">
          YouTube to Audio is here with 0 downloads.
        </span>
        <Link
          href={"/signIn"}
          className="bg-[#b1a694] font-golos py-2 px-4 rounded-lg text-black font-medium"
        >
          Sign In
        </Link>
      </section>
    </>
  );
}
