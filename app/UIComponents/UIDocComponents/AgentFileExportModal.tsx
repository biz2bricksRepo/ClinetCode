import React, { useEffect, useState } from "react";
import AgentFileExport from "./AgentFileExport";
import { firestoreList, populateExcel } from "../../UILibraries/AgentAPIs";

interface AgentFileExportModalProps {
  open: boolean;
  onClose: () => void;
  selectedAgent: string;
  onAgentChange: (value: string) => void;
  fileName: string;
  onExport: () => void;
}

const AgentFileExportModal: React.FC<AgentFileExportModalProps> = ({
  open,
  onClose,
  selectedAgent,
  onAgentChange,
  fileName,
  onExport,
}) => {
  const [agentOptions, setAgentOptions] = useState<string[]>([]);
  const [exportStatus, setExportStatus] = useState<string>("");

  useEffect(() => {
    if (open) {
      firestoreList("001")
        .then((res) => {
          // Debug: log raw response
          console.log('Raw firestoreList response:', res);
          let agents: string[] = [];
          if (Array.isArray(res)) agents = res;
          else if (res && Array.isArray(res.agents)) agents = res.agents;
          else if (res && Array.isArray(res.agentnames)) agents = res.agentnames;
          else if (res && typeof res === 'object') agents = Object.values(res).flat();
          setAgentOptions(agents);
          console.log('Agents list from firestoreList:', agents);
        })
        .catch(() => setAgentOptions([]));
    }
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold px-2"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {exportStatus && (
          <div className="mb-2 text-blue-700 font-semibold">{exportStatus}</div>
        )}
        <AgentFileExport
          agentOptions={agentOptions}
          selectedAgent={selectedAgent}
          onAgentChange={onAgentChange}
          fileName={fileName}
          onExport={async () => {
            setExportStatus("Exporting to excel ..Pls wait.");
            let fileNameToExport = fileName;
            if (fileNameToExport.toLowerCase().endsWith('.md')) {
              fileNameToExport = fileNameToExport.replace(/\.md$/i, '.pdf');
            }
            try {
              await populateExcel('001', selectedAgent, fileNameToExport);
              setExportStatus("Data uploaded successfully.");
              setTimeout(() => {
                setExportStatus("");
                onClose();
              }, 1500);
            } catch (e: any) {
              setExportStatus('Failed to export data: ' + (e?.message || e));
            }
          }}
        />
      </div>
    </div>
  );
};

export default AgentFileExportModal;
