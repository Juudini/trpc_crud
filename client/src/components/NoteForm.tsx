import { ChangeEvent, FormEvent, useState } from "react";
import { trpc } from "../trpc";
import IconList from "./../assets/checkList.svg";

const initialState = {
    title: "",
    description: "",
};

const MAX_TITLE_LENGTH = 38;
const MAX_DESCRIPTION_LENGTH = 40;

function NoteForm() {
    const [note, setNote] = useState(initialState);
    const addNote = trpc.note.create.useMutation();
    const utils = trpc.useContext();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (note.title.trim() === "" || note.description.trim() === "") {
            return;
        }
        addNote.mutate(note, {
            onSuccess() {
                console.log("Note added successfully");
                utils.note.get.invalidate();
                setNote(initialState);
            },
        });
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (
            (name === "title" && value.length > MAX_TITLE_LENGTH) ||
            (name === "description" && value.length > MAX_DESCRIPTION_LENGTH)
        ) {
            return;
        }
        setNote({ ...note, [name]: value });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-lilac-300 p-10 rounded-md text-center">
            <div className="mb-3">
                <img
                    src={IconList}
                    alt="Icon List"
                    className="w-30 h-30 mx-auto mb-3"
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={note.title}
                    autoFocus
                    onChange={handleChange}
                    maxLength={MAX_TITLE_LENGTH}
                    className="bg-lilac-100 px-3 py-2 w-full block rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-sky-900"
                />
            </div>

            <textarea
                name="description"
                value={note.description}
                placeholder="Description"
                onChange={handleChange}
                maxLength={MAX_DESCRIPTION_LENGTH}
                className="bg-lilac-100 px-3 py-2 w-full block rounded-md mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-sky-900"></textarea>
            <p className="text-sm text-gray-500">
                {note.description.length}/{MAX_DESCRIPTION_LENGTH} characters
            </p>

            <button className="bg-sky-900 hover:bg-sky-800 px-3 py-2 rounded-md text-white">
                Save
            </button>
        </form>
    );
}

export default NoteForm;
