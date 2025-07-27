import React, { useState, useRef, useEffect } from 'react';
import {getSearchResults} from '@/app/lib/actions';
import Markdown from 'react-markdown';
import {
  Send20Regular,
} from "@fluentui/react-icons";
import { Button, Input, makeStyles, shorthands, tokens } from '@fluentui/react-components';
const useStyles = makeStyles({
    chatContainer: {
        width: '100%',
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
        backgroundColor: tokens.colorNeutralBackground2,
        borderRadius: tokens.borderRadiusMedium,
        boxShadow: tokens.shadow4,
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalM,
    },
    messages: {
        minHeight: '120px',
        maxHeight: '200px',
        overflowY: 'auto',
        background: tokens.colorNeutralBackground1,
        ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalXS),
        borderRadius: tokens.borderRadiusSmall,
        marginBottom: tokens.spacingVerticalS,
        fontSize: tokens.fontSizeBase300,
    },
    inputRow: {
        display: 'flex',
        columnGap: tokens.spacingHorizontalS,
        alignItems: 'center',
    },
    userMessage: {
        alignSelf: 'flex-end',
        background: tokens.colorBrandBackground,
        color: tokens.colorNeutralForegroundOnBrand,
        ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalS),
        borderRadius: tokens.borderRadiusMedium,
        marginBottom: tokens.spacingVerticalXXS,
        maxWidth: '60%',
        wordBreak: 'break-word',
    },
    responseMessage: {
        alignSelf: 'flex-start',
        background: tokens.colorNeutralBackground3,
        color: tokens.colorNeutralForeground1,
        ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalS),
        borderRadius: tokens.borderRadiusMedium,
        marginBottom: tokens.spacingVerticalXXS,
        maxWidth: '90%',
        wordBreak: 'break-word',
    },
    label: {
        fontSize: tokens.fontSizeBase200,
        fontWeight: 600,
        marginBottom: '2px',
        display: 'block',
    },
});

type ChatMessage = {
    sender: 'user' | 'response';
    text: string;
};
type ChatProps = {
    userPrompt: string;
    onUserPromptChange: (value: string) => void;
    handleSendMessage: () => void;
    messages: ChatMessage[];
};
export default function Chat({
    userPrompt,
    onUserPromptChange,
    handleSendMessage,
    messages,
}: ChatProps){
    const styles = useStyles();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    //const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState<string>(userPrompt);

    const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
//setInput(ev.target.value);
        onUserPromptChange(ev.target.value);
    };

    // const handleSendMessage = async () => {
    //     if (input.trim()) {
    //         // Add user message
    //         const newMessages = [...messages, { sender: 'user', text: input }];
    //         //calling HybridSearch API or any other processing can be done here
    //         const searchResults = await getSearchResults(input);
    //         //console.log('Search Results:', searchResults);
    //         if (!searchResults || !searchResults.props || !searchResults.props.data || !searchResults.props.data.result) {
    //             console.error('Invalid search results format or no details found.');
    //             return;
    //         }
    //         let promptResponse = searchResults.props.data.result;
    //         //console.log('Prompt Response:', promptResponse);  
    //         // Add a dummy response for demonstration
    //         //newMessages.push({ sender: 'response', text: `Echo: ${input}` });
    //         newMessages.push({ sender: 'response', text: promptResponse });
    //         // Update state
    //         setMessages(newMessages);
    //         setInput('');
    //     }
    // };

    const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.key === 'Enter') {
            handleSendMessage();
        }
    };

    // Scroll to the latest message when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);


    return (
        <div className={styles.chatContainer}>
            <div className={styles.messages}>
                {messages.length === 0 && <div style={{ color: '#888' }}>No messages yet.</div>}
                {messages.map((message, idx) => (
                    <div
                        key={idx}
                        className={message.sender === 'user' ? styles.userMessage : styles.responseMessage}
                    >
                        {/* <span className={styles.label}>
                            {message.sender === 'user' ? 'User' : 'Response'}
                        </span> */}
                        {message.sender === 'user' ? message.text : <Markdown>{message.text}</Markdown>}
                        {/* {message.text} */}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className={styles.inputRow}>
                <Input
                    value={userPrompt}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message…"
                    style={{ flex: 1 }}
                />
                <Button appearance="primary" onClick={handleSendMessage}>
                    <Send20Regular />
                </Button>
            </div>
        </div>
    );
}   