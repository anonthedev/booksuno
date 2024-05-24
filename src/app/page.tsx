import Dashboard from "@/Components/Dashboard/Dashboard";

export default function Page() {
  return (
    <>
      <main className="lg:hidden flex flex-col w-screen h-screen">
        <section className="bg-black flex flex-row w-full gap-2 p-2 pb-16 h-[100svh] overflow-y-hidden">
          <section className="flex-grow">
            <Dashboard />
          </section>
        </section>
      </main>

      <main style={{height: "100svh"}} className="hidden lg:flex flex-col w-screen">
        <section className="bg-black p-2 flex-grow order-1 h-full md:bg-[#121212]">
          <Dashboard />
        </section>
      </main>
    </>
  )
}
