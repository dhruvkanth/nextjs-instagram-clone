import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import Modal from "react-modal";
import { CameraIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";

const UploadModal = () => {
    const [openModal, setOpenModal] = useRecoilState(modalState);

    const [selectedFile, setSelectedFile] = useState(null);

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

    return (
        <div>
            {openModal && (
                <Modal
                    className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-[#121212] text-white border-2 rounded-md shadow-md"
                    isOpen={openModal}
                    onRequestClose={() => {
                        setOpenModal(false);
                        setSelectedFile(null);
                    }}
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
                        />
                        <button
                            disabled
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