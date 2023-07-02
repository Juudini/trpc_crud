import NotesList from "./components/NotesList";
import NoteForm from "./components/NoteForm";
export default function AppContent() {
    return (
        <div className="max-w-xl m-auto h-screen py-40">
            <h1 className="text-5xl font-bold tex-center py-5"></h1>
            <NoteForm />
            <NotesList />
        </div>
    );
}
