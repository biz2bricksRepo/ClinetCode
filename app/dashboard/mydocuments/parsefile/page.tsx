'use client'
import ParseDocument from "@/app/ui/documents/parse-document";

export default function Page() {
    return (
        
            <div>
                <h1 className="text-2xl font-bold">Parsed Document</h1>
                <ParseDocument />
                
            </div>
        
    );
}