"use client"

import Feed from "./Feed";
import SearchBooks from "./SearchBooks";
import DonateButton from "../DonateButton";
import CurrentPlayingBook from "../Book/CurrentPlayingBook";

export default function Dashboard() {
    return (
        <section className="flex flex-row gap-2 h-full mb-2 lg:h-fit">
            <article className="w-3/4 bg-[#121212] p-4 rounded-lg flex flex-col gap-8 h-full mb-2 lg:h-fit xl:w-full">
                <div className="flex flex-row justify-between items-center">
                    <DonateButton />
                </div>
                <div className="w-full flex flex-col gap-8 overflow-y-auto lg:overflow-y-hidden lg:mb-28">
                    <SearchBooks />
                    <Feed />
                </div>
            </article>
            <article className="w-1/4 h-full p-4 rounded-lg bg-[#121212] xl:hidden">
                <CurrentPlayingBook />
            </article>
        </section>
    )
}
