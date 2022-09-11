import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { db } from "../firebase";
import { DotsHorizontalIcon, HeartIcon, ChatIcon, BookmarkIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";

const Post = ({ img, userImg, caption, username, id }) => {

  const { data: session } = useSession();

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);

  const [likes, setLikes] = useState([]);

  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")), (snapshot) => { setComments(snapshot.docs) }
    )
  }, [db, id])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => { setLikes(snapshot.docs) });
  }, [db]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.name) !== -1);
  }, [likes]);

  async function likePost() {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.name));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.name), {
        username: session.user.name,
      });
    }
  }

  async function sendComment(event) {
    event.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.name,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  }

  return (
    <div className="bg-[#000000] text-white mt-7 border rounded-md">

      <div className="flex items-center p-5">
        <img className="h-12 rounded-full object-cover border p-1 mr-3" src={userImg} alt={username} />
        <p className="font-bold flex-1">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      <img className="object-fill w-full" src={img} alt="" />

      {session &&
        <div className="flex justify-between px-4 py-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="text-red-400 btn"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      }

      {likes.length > 1 ? (
        <p className="font-bold mx-5 my-3">{likes.length} likes</p>
      ) : (
        <p className="font-bold mx-5 my-3">{likes.length} like</p>
      )}

      <p className="p-5 truncate"><span className="font-bold mr-2">{username}</span>{caption}</p>

      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
          {comments.map(comment => (
            <div key={comment.data().id} className="flex items-center space-x-2 mb-2">
              <img className="h-7  rounded-full object-cover" src={comment.data().userImage} alt="user-image" />
              <p className="font-semibold">{comment.data().name}</p>
              <p className="flex-1 truncate">{comment.data().comment}</p>
              <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
      )}

      {session &&
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            className="bg-[#000000] border-none flex-1 focus:ring-0"
            type="text"
            placeholder="Enter your comment..."
          />
          <button
            type="submit"
            onClick={sendComment}
            disabled={!comment.trim()}
            className="text-blue-400 font-bold disabled:text-blue-200">
            Post
          </button>
        </form>
      }

    </div>
  );
}

export default Post;
