import Post from './Post';

const Posts = () => {
    const posts = [
        {
            id: "1",
            username: "salmankhan",
            userImg: "https://render.fineartamerica.com/images/rendered/small/flat/round-beach-towel/images/artworkimages/medium/1/salman-khan-twinkle-mehta.jpg?transparent=0&targetx=0&targety=0&imagewidth=788&imageheight=788&modelwidth=788&modelheight=788&backgroundcolor=A3A992&orientation=0&producttype=beachtowelround&imageid=5104381",
            img: "https://images.newindianexpress.com/uploads/user/imagelibrary/2021/9/16/w1200X800/Salman_Khan_AFP.jpg",
            caption: "Nice picture"

        },
        {
            id: "2",
            username: "jacobtan",
            userImg: "https://render.fineartamerica.com/images/rendered/small/flat/round-beach-towel/images/artworkimages/medium/1/salman-khan-twinkle-mehta.jpg?transparent=0&targetx=0&targety=0&imagewidth=788&imageheight=788&modelwidth=788&modelheight=788&backgroundcolor=A3A992&orientation=0&producttype=beachtowelround&imageid=5104381",
            img: "https://images.newindianexpress.com/uploads/user/imagelibrary/2021/9/16/w1200X800/Salman_Khan_AFP.jpg",
            caption: "my idol."

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