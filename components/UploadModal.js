import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import Modal from "react-modal";
import { CameraIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { userState } from "../atom/userAtom";

const UploadModal = () => {
    const [open, setOpen] = useRecoilState(modalState);

    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(false);

    function addImage(event) {
        const reader = new FileReader();
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    }

    const filePickerRef = useRef(null);
    const captionRef = useRef(null);

    const [currentUser] = useRecoilState(userState);

    async function uploadPost() {
        if (loading) {
            return;
        }

        setLoading(true);

        const docRef = await addDoc(collection(db, "posts"), {
            caption: captionRef.current.value,
            username: currentUser?.name,
            profileImg: currentUser.userImg,
            timestamp: serverTimestamp(),
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url").then(
            async (snapshot) => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadURL,
                });
            }
        );

        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
    }

    return (
        <div>
            {open && (
                <Modal
                    className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-[#121212] text-white border-2 rounded-md shadow-md"
                    isOpen={open}
                    onRequestClose={() => {
                        setOpen(false);
                        setSelectedFile(null);
                    }}
                    ariaHideApp={false}
                >
                    <div className="flex flex-col justify-center items-center h-[100%]">
                        {selectedFile ? (
                            <img
                                onClick={() => setSelectedFile(null)}
                                src={selectedFile}
                                alt=""
                                className="w-full max-h-[250px] object-cover cursor-pointer"
                            />
                        ) : (
                            <CameraIcon
                                onClick={() => filePickerRef.current.click()}
                                className="cursor-pointer h-14 bg-black p-2 rounded-full border-2 text-white"
                            />
                        )}

                        <input
                            type="file"
                            hidden
                            ref={filePickerRef}
                            onChange={addImage}
                        />
                        <input
                            type="text"
                            maxLength="150"
                            placeholder="Please enter your caption..."
                            className="bg-[#262626] m-4 border-none text-center w-full focus:ring-0"
                            ref={captionRef}
                        />
                        <button
                            disabled={!selectedFile || loading}
                            onClick={uploadPost}
                            className="w-full bg-blue-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
                        >
                            Upload Post
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default UploadModal;