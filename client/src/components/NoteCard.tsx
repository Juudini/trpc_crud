import { trpc } from "../trpc";

interface Props {
    note: { _id: string; title: string; description: string; done: boolean };
}

export function NoteCard({ note }: Props) {
    const deleteNote = trpc.note.delete.useMutation();
    const toggleDoneNote = trpc.note.toggleDone.useMutation();
    const utils = trpc.useContext();

    return (
        <div className="bg-sky-800 p-2 my-2 flex justify-between">
            <div>
                <h1 className="font-bold text-xl">{note.title}</h1>
                <p>{note.description}</p>
            </div>
            <div className="flex gap-x-2">
                <button
                    onClick={() => {
                        deleteNote.mutate(note._id, {
                            onSuccess: (data) => {
                                if (data) {
                                    utils.note.get.invalidate();
                                }
                            },
                            onError(error) {
                                console.log(error);
                            },
                        });
                    }}
                    className="bg-pink-900 px-3 py-2 rounded-md text-white ml-auto">
                    Delete
                </button>

                <button
                    onClick={() => {
                        toggleDoneNote.mutate(note._id, {
                            onSuccess: (data) => {
                                if (data) {
                                    utils.note.get.invalidate();
                                }
                            },
                        });
                    }}
                    className={`px-3 py-2 rounded-md text-white ml-auto ${
                        note.done ? "bg-zinc-500" : "bg-sky-900"
                    }`}>
                    {note.done ? "Undone" : "Done"}
                </button>
            </div>
        </div>
    );
}

export default NoteCard;
