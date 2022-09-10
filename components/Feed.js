import Posts from "./Posts";

const Feed = () => {
    return (
        <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-3xl mx-auto">
            <section className="md:col-span-3 bg-[#121212] mx-3">
                <Posts />
            </section>
        </main>
    )
}

export default Feed;