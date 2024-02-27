import Dashboard from "@/Components/Dashboard/Dashboard";
import Player from "@/Components/Player";
import MobileSidebar from "@/Components/Sidebar/MobileSidebar";
import Sidebar from "@/Components/Sidebar/Sidebar";

export default function Page() {
  return (
    <>
      <main className="lg:hidden flex flex-col w-screen h-screen lg:h-[100svh]">
        <section className="bg-black flex flex-row w-full gap-2  p-2 pb-16 h-[100svh] overflow-y-hidden lg:flex-col">
          <Sidebar />
          <section className="flex-grow">
            <Dashboard />
          </section>
        </section>
        {/* <section className="lg:hidden fixed bottom-0">
          <Player />
          <MobileSidebar />
        </section> */}
      </main>

      <main style={{height: "100svh"}} className="hidden lg:flex flex-col w-screen">
        <section className="bg-black p-2 flex-grow order-1 h-full ">
          <Dashboard />
        </section>
      </main>
    </>
  )
}
