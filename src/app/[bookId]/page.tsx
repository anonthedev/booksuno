import Book from "@/Components/Book/Book";
import Player from "@/Components/Player";
import MobileSidebar from "@/Components/Sidebar/MobileSidebar";
import Sidebar from "@/Components/Sidebar/Sidebar";

export default function page({ params }: { params: { bookId: string } }) {
    return (
        <>
            <main className="lg:hidden flex flex-col w-screen h-screen lg:h-[100svh]">
                <section className="bg-black flex flex-row w-full gap-2 p-2 pb-16 h-[100svh] overflow-y-hidden lg:flex-col">
                    <Sidebar />
                    <section className="flex-grow">
                        <Book id={params.bookId} />
                    </section>
                </section>
                {/* <section className="lg:hidden fixed bottom-0">
                    <Player />
                    <MobileSidebar />
                </section> */}
            </main>

            <main style={{ height: "100svh" }} className="hidden lg:flex flex-col w-screen">
                <section className="bg-[#121212] p-2 flex-grow order-1 h-full">
                    <Book id={params.bookId} />
                </section>
                {/* <section className="fixed bottom-0 order-2">
                    <Player />
                    <MobileSidebar />
                </section> */}
            </main>
        </>
    )
}
