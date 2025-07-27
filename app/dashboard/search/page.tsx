'use client';
import Chat from "@/app/ui/chat/Chat";
import DocumentPrompts from "@/app/ui/documents/document-prompts";
import { Title3 } from "@fluentui/react-components";
import React, { useState } from 'react';
import { getSearchResults } from '@/app/lib/actions';
import ProcessingDialog from "@/app/ui/processingDialog";
export default function Page() {

    const [userPrompt, setUserPrompt] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [showProgress, setShowProgress] = useState(true);
    const [processingMessage, setProcessingMessage] = useState("...");

    const queryParams = new URLSearchParams(window.location.search);
    const fileName = queryParams.get("f");
    const noOfQuestions = queryParams.get("noOfQuestions");

    const handlePromptClick = (prompt: string) => {
        //alert(`Prompt clicked: ${prompt}`);
        setSelectedPrompt(prompt);
        setUserPrompt(prompt); // Set the user prompt to the selected prompt
        // Optionally, you can also send the message immediately
        handleSendMessage();
    };

    const handleSendMessage = () => {
        if( userPrompt.trim() === '') {
            return; // Do not send empty messages
        }
        // Add user message
        const newMessages = [...messages, { sender: 'user', text: userPrompt }];
        //calling HybridSearch API or any other processing can be done here
        setShowProgress(true);
        getSearchResults(userPrompt).then((searchResults) => {
            if (!searchResults || !searchResults.props || !searchResults.props.data || !searchResults.props.data.result) {
                console.error('Invalid search results format or no details found.');
                return;
            }
            let promptResponse = searchResults.props.data.result;
            // Add the response message
            newMessages.push({ sender: 'response', text: promptResponse });
            setShowProgress(false);
            // Update state
            setMessages(newMessages);
        }).catch((error) => {
            console.error('Error fetching search results:', error);
        });
        setUserPrompt(''); // Clear the input after sending 

    }

    return (
        <main>
            <Title3>Document Prompts</Title3>
            <div>
                <DocumentPrompts fileName={fileName || ""} NoOfQuestions={noOfQuestions ? parseInt(noOfQuestions) : undefined} handlePromptClick={handlePromptClick}/>
            </div>
            <div>
                <ProcessingDialog message={processingMessage} showProgress={showProgress} />
                <Chat
                    userPrompt={userPrompt}
                    onUserPromptChange={setUserPrompt}
                    handleSendMessage={handleSendMessage}
                    messages={messages}
                />
            </div>
        </main>
    );
}