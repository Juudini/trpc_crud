import { trpc } from "./trpc";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AppContent from "./AppContent";
function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [httpBatchLink({ url: "http://localhost:3000/trpc" })],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <AppContent />
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default App;

