import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const db = await mongoose.connect("mongodb://localhost/trpcdb");
        console.log(
            `Database is connected to ${db.connection.db.databaseName}`
        );
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};
