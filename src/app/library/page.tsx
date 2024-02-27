import Sidebar from "@/Components/Sidebar/Sidebar"
import Player from "@/Components/Player"
import MobileSidebar from "@/Components/Sidebar/MobileSidebar"
import Library from "@/Components/Library/Library"

export default function page() {
    return (
        <main className="flex flex-col w-full h-full">
          <section className="bg-black flex flex-row w-full gap-2  p-2 overflow-y-hidden md:overflow-y-auto md:flex-col md:pb-32">
            <Sidebar />
            <section className="flex-grow">
              <Library />
            </section>
          </section>
          <section className="flex-initial md:fixed md:bottom-0">
            <Player />
            <MobileSidebar />
          </section>
        </main>
      )
}
