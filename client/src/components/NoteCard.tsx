import { trpc } from "../trpc";

interface Props {
    note: { _id: string; title: string; description: string; done: boolean };
}

export function NoteCard({ note }: Props) {
    const deleteNote = trpc.note.delete.useMutation();
    const toggleDoneNote = trpc.note.toggleDone.useMutation();
    const utils = trpc.useContext();

    const handleDeleteNote = () => {
        deleteNote.mutate(note._id, {
            onSuccess: (data) => {
                if (data) {
                    utils.note.get.invalidate();
                }
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    const handleToggleDoneNote = () => {
        toggleDoneNote.mutate(note._id, {
            onSuccess: (data) => {
                if (data) {
                    utils.note.get.invalidate();
                }
            },
        });
    };

    return (
        <div
            className={`bg-gray-100 rounded-lg p-4 mb-4 shadow-md ${
                note.done ? "bg-sky-100" : ""
            }`}>
            <div className="flex justify-between items-center">
                <div>
                    <h1
                        className={`text-lg font-bold mb-2 ${
                            note.done ? "line-through" : ""
                        }`}>
                        {note.title}
                    </h1>
                    <p className="text-gray-600">{note.description}</p>
                </div>
                <div className="flex gap-x-2">
                    <button
                        onClick={handleDeleteNote}
                        className="px-3 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 focus:bg-red-600 focus:outline-none">
                        Delete
                    </button>
                    <button
                        onClick={handleToggleDoneNote}
                        className={`px-3 py-2 rounded-md text-white ${
                            note.done
                                ? "bg-green-500 hover:bg-green-600 focus:bg-green-600"
                                : "bg-blue-500 hover:bg-blue-600 focus:bg-blue-600"
                        } focus:outline-none`}>
                        {note.done ? "Undone" : "Done"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NoteCard;
