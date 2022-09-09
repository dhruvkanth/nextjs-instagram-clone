import Image from "next/image";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = ({ boolean }) => {
    const { data: session } = useSession();

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
                        className="object-contain hvr"
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
                    <HomeIcon className="md:inline-flex h-6 cursor-pointer hvr" />
                    {session ? (
                        <>
                            <PlusCircleIcon className="h-6 cursor-pointer hvr" />
                            <img
                                onClick={signOut}
                                src={session.user.image}
                                alt="user-image"
                                className="h-10 rounded-full cursor-pointer"
                            />
                        </>
                    ) : (
                        <button onClick={signIn} className="hvr">Sign in</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;