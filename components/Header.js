import Image from "next/image";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import { useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { userState } from "../atom/userAtom";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { useRouter } from "next/router";

const Header = () => {
    const [currentUser, setCurrentUser] = useRecoilState(userState);
    const [open, setOpen] = useRecoilState(modalState);
    const router = useRouter();

    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const fetchUser = async () => {
                    const docRef = doc(
                        db,
                        "users",
                        user.auth.currentUser.providerData[0].uid
                    );
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setCurrentUser(docSnap.data());
                    }
                };
                fetchUser();
            }
        });
    }, []);

    function onSignOut() {
        signOut(auth);
        setCurrentUser(null);
    }

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

                <div className="flex space-x-4 items-center">
                    <HomeIcon onClick={() => router.push("/")} className="md:inline-flex h-6 cursor-pointer hvr" />
                    {currentUser ? (
                        <>
                            <PlusCircleIcon onClick={() => setOpen(true)} className="h-6 cursor-pointer hvr" />
                            <img
                                onClick={onSignOut}
                                src={currentUser?.userImg}
                                alt="user-image"
                                className="h-10 rounded-full cursor-pointer"
                            />
                        </>
                    ) : (
                        <button onClick={() => router.push("/auth/signin")} className="hvr">Sign in</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;