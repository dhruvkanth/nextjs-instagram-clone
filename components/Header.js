import Image from "next/image";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { useRouter } from "next/router";

const Header = ({ boolean }) => {
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const router = useRouter();

    return (
        <div className="shadow-sm border-b sticky top-0 text-white bg-black z-30">
            <div className="flex items-center justify-between max-w-6xl mx-4 lg:mx-auto">
                <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
                    <Image
                        src={logo2}
                        layout="fill"
                        className="object-contain"
                        alt="Instagram Logo"
                        onClick={() => router.push("/")}
                    />
                </div>
                <div className="cursor-pointer h-24 w-10 relative lg:hidden">
                    <Image
                        src={logo1}
                        layout="fill"
                        className="object-contain hvr"
                        alt="Instagram Logo"
                        onClick={() => router.push("/")}
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
                    <HomeIcon onClick={() => router.push("/")} className="md:inline-flex h-6 cursor-pointer hvr" />
                    {session ? (
                        <>
                            <PlusCircleIcon onClick={() => setOpen(true)} className="h-6 cursor-pointer hvr" />
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