'use client'

import SummarizeDocument from "@/app/ui/documents/summarize-document";
export default function Page() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Document Summary</h1>
            <SummarizeDocument />
        </div>
    );
}
