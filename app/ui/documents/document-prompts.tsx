import * as React from 'react';
import { useState, useEffect } from "react";
import { generateDocumentPrompts } from '@/app/lib/actions';
import { List, ListItem, Label,makeStyles, shorthands, tokens } from '@fluentui/react-components';
import ReactMarkdown from 'react-markdown';
import { json } from 'stream/consumers';


type DocumentPromptsProps = {
    fileName: string;
    NoOfQuestions?: number;
    handlePromptClick: (prompt: string) => void;
};

const useStyles = makeStyles({
    label: {
        marginBottom: tokens.spacingVerticalM,
        display: 'block',
    },
    list: {
        marginTop: tokens.spacingVerticalM,
    },
    listItem: {
        ...shorthands.margin(0, 0, tokens.spacingVerticalS, 0),
        padding: tokens.spacingVerticalXS,
        borderRadius: tokens.borderRadiusSmall,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackground3,
        },
    },
});

export default function DocumentPrompts({fileName, NoOfQuestions, handlePromptClick}:DocumentPromptsProps) {

    const styles = useStyles();
  // This component is used to generate

    const [prompts, setPrompts] = useState('');
    //const [selectedPrompt, setSelectedPrompt] = useState('');

    useEffect(() => {
        async function getDocumentPrompts() {
            console.log("Fetching prompts for file:", fileName, "with NoOfQuestions:", NoOfQuestions);
            if (!fileName) {
                    console.log("File name is not provided.");
                    return;
                }
            
            try {
                const response = await generateDocumentPrompts(fileName, NoOfQuestions);
                
                
                if (response && response.props && response.props.data) {
                    //console.log("Response received:", JSON.parse(response.props.data.questions));
                    if( response.props.data.questions === null || response.props.data.questions === undefined) {
                        console.error("No prompts found for the given file.");
                        return;
                    }
                    console.log("Response received:", response.props.data.questions);
                    setPrompts(response.props.data.questions);
                } else {
                    console.error("Failed to fetch prompts.");
                }
            } catch (error) {
                console.error("Error fetching prompts:", error);
            }
        }
        getDocumentPrompts();
    }, [fileName, NoOfQuestions]); 

    // Function to handle the click event for a prompt
    // This function can be used to navigate to a new page or perform an action with the prompt
    // For example, you can redirect to a new page with the prompt as a query parameter
    // Note: The redirect function is not defined in this snippet, you may need to
     function handleUserPromptClick(prompt: string) {
        // Handle the click event for a prompt
        // This function can be used to navigate to a new page or perform an action with the prompt
        //console.log("Prompt clicked:", prompt);
        //setSelectedPrompt(prompt);
        handlePromptClick(prompt); // Call the parent function if provided
        //handlePromptClick && handlePromptClick(prompt); // Call the parent function if provided
        // For example, you can redirect to a new page with the prompt as a query parameter
        // redirect(`/dashboard/mydocuments/prompt?prompt=${encodeURIComponent(prompt)}`);
    }
    
    //JSX to render the component
    return (
        <>
            {/* <ReactMarkdown>{prompts}</ReactMarkdown> */}
            <Label className={styles.label}>Selected Document:{fileName}</Label>
            <List className={styles.list}>
                {prompts.split('\n').map((prompt, index) => (
                    <ListItem className={styles.listItem} key={index} onClick={() =>handleUserPromptClick(prompt)} >
                        <ReactMarkdown>{prompt}</ReactMarkdown>
                    </ListItem>
                ))}
            </List>
            
        </>
    );

}