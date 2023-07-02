import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import Note from "../models/note";

const getNotes = publicProcedure.query(async () => {
    const notes = await Note.find();
    return notes;
});

const createNote = publicProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async ({ input }) => {
        const newNote = new Note({
            title: input.title,
            description: input.description,
        });
        const savedNote = await newNote.save();
        return savedNote;
    });

const deleteNote = publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
        const noteFound = await Note.findByIdAndDelete(input);
        if (!noteFound) throw new Error("Note NOT FOUND");
        return true;
    });

const toggleDone = publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
        try {
            const foundNote = await Note.findById(input);
            if (!foundNote) throw new Error("Note NOT FOUND");
            foundNote.done = !foundNote.done;
            await foundNote.save();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    });

export const notesRouter = router({
    create: createNote,
    get: getNotes,
    delete: deleteNote,
    toggleDone,
});
