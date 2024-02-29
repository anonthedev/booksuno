/* eslint-disable @next/next/no-img-element */
import UPIQR from "@/resources/upi.png"

export default function page() {
    return (
        <section className="w-screen h-screen flex flex-col items-center justify-center gap-4 mx-8 lg:mx-0 md:-mt-12">
            <div className="">
                <img className="w-80 rounded-md md:w-72" src={UPIQR.src} alt="UPI QR Code" />
            </div>
            <span>OR</span>
            <div>
                <a href="https://www.buymeacoffee.com/anonthedev" target="_blank">
                    <img
                        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                        alt="Buy Me A Coffee"
                        width={145}
                        height={30}
                    />
                </a>
            </div>
        </section>
    )
}