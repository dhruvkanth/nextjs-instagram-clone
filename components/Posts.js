import Post from './Post';

const Posts = () => {
    const posts = [
        {
            id: "1",
            username: "salmankhan",
            userImg: "https://render.fineartamerica.com/images/rendered/small/flat/round-beach-towel/images/artworkimages/medium/1/salman-khan-twinkle-mehta.jpg?transparent=0&targetx=0&targety=0&imagewidth=788&imageheight=788&modelwidth=788&modelheight=788&backgroundcolor=A3A992&orientation=0&producttype=beachtowelround&imageid=5104381",
            img: "https://images.unsplash.com/photo-1604341841227-6dd5c2255842?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
            caption: "Nice picture"

        },
        {
            id: "2",
            username: "jacobtan",
            userImg: "https://render.fineartamerica.com/images/rendered/small/flat/round-beach-towel/images/artworkimages/medium/1/salman-khan-twinkle-mehta.jpg?transparent=0&targetx=0&targety=0&imagewidth=788&imageheight=788&modelwidth=788&modelheight=788&backgroundcolor=A3A992&orientation=0&producttype=beachtowelround&imageid=5104381",
            img: "https://images.unsplash.com/photo-1604341841227-6dd5c2255842?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
            caption: "New picture from my city"

        }
    ]
    return <div>
        {posts.map(post => (
            <Post
                key={post.id}
                id={post.id}
                username={post.username}
                userImg={post.userImg}
                img={post.img}
                caption={post.caption}
            />
        ))}
    </div>;
}

export default Posts;