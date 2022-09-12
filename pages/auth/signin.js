import Image from "next/image";
import { Footer } from "../../components/Footer";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "../../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const SignIn = () => {

    const router = useRouter();
    async function onGoogleClick() {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            const user = auth.currentUser.providerData[0];
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    userImg: user.photoURL,
                    uid: user.uid,
                    timestamp: serverTimestamp(),
                });
            }
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-[#121212] flex flex-col min-h-screen">
            <div className="flex justify-center space-x-7 mt-20">
                <div>
                    <div className="flex flex-col items-center">
                        <div className="cursor-pointer h-32 w-24 relative">
                            <Image
                                src="https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph-900x900.png"
                                layout="fill"
                                className="object-contain"
                                alt="Instagram Logo"
                            />
                        </div>
                        <div className="cursor-pointer h-32 w-24 relative">
                            <Image
                                src="https://www.pngkey.com/png/full/28-287308_instagram-logo-text-white.png"
                                layout="fill"
                                className="object-contain"
                                alt="Instagram Logo"
                            />
                        </div>
                        <button onClick={onGoogleClick} className="bg-blue-600 rounded-lg p-3 text-white hover:bg-blue-700">Sign in with Google</button>
                    </div>
                </div>
            </div>
            <Footer className="mt-auto" />
        </div>
    );
}

export default SignIn;