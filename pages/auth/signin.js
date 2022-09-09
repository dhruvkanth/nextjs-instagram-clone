import Image from "next/image";
import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header"
import { Footer } from "../../components/Footer";

const signin = ({ providers }) => {
    return (
        <div className="bg-[#121212] flex flex-col min-h-screen">
            <div className="flex justify-center space-x-7 mt-20">
                <div>
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name} className="flex flex-col items-center">
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
                            <button onClick={() => signIn(provider.id, { callbackUrl: "/" })} className="bg-blue-600 rounded-lg p-3 text-white hover:bg-blue-700">Sign in with {provider.name}</button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer className="mt-auto" />
        </div>
    );
}

export async function getServerSideProps(context) {
    const providers = await getProviders();
    return {
        props: { providers },
    };
}

export default signin;