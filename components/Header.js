import Image from "next/image";

const Header = () => {
    return (
        <div className="shadow-sm border-b sticky top-0 text-white bg-black z-30">
            <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
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
            </div>
        </div>
    )
}

export default Header;