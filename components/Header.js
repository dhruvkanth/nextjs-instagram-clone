import Image from "next/image";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";

const Header = ({ boolean }) => {
    return (
        <div className="shadow-sm border-b sticky top-0 text-white bg-black z-30">
            <div className="flex items-center justify-between max-w-6xl mx-4 lg:mx-auto">
                <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
                    <Image
                        src="https://www.pngkey.com/png/full/28-287308_instagram-logo-text-white.png"
                        layout="fill"
                        className="object-contain"
                        alt="Instagram Logo"
                    />
                </div>
                <div className="cursor-pointer h-24 w-10 relative lg:hidden">
                    <Image
                        src="https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph-900x900.png"
                        layout="fill"
                        className="object-contain"
                        alt="Instagram Logo"
                    />
                </div>
                {boolean &&
                    <div className="relative hidden sm:inline-grid mt-1">
                        <div className="absolute top-2 left-2">
                            <SearchIcon className="h-5 text-[#8e8e8e]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-[#262626] pl-10 text-[#8e8e8e] text-sm focus:ring-black focus:border-black rounded-md"
                        />
                    </div>
                }

                <div className="flex space-x-4 items-center">
                    <HomeIcon className="md:inline-flex h-6 cursor-pointer hover:scale-125 transition-tranform duration-200 ease-out" />
                    <PlusCircleIcon className="md:inline-flex h-6 cursor-pointer hover:scale-125 transition-tranform duration-200 ease-out" />
                    <img
                        src="https://render.fineartamerica.com/images/rendered/small/flat/round-beach-towel/images/artworkimages/medium/1/salman-khan-twinkle-mehta.jpg?transparent=0&targetx=0&targety=0&imagewidth=788&imageheight=788&modelwidth=788&modelheight=788&backgroundcolor=A3A992&orientation=0&producttype=beachtowelround&imageid=5104381"
                        alt="user-image"
                        className="h-10 rounded-full cursor-pointer"
                    />
                </div>
            </div>
        </div>
    )
}

export default Header;