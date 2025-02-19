import { useChat } from 'ai/react';
import { useState } from 'react';
import { useModelSelection } from '../hooks/useModelSelection';
import MessageList from './MessageList';
import InputField from './InputField';
import ModelSelector from './ModelSelector';
import ErrorDisplay from './ErrorDisplay';

export default function ChatInterface() {
  const { selectedModel, updateModel } = useModelSelection();
  const [error, setError] = useState<string | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  } = useChat({
    api: '/api/openai/chat',
    body: { model: selectedModel },
    onError: (error) => setError(error.message),
  });

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <ModelSelector
          selectedModel={selectedModel}
          onChange={updateModel}
        />
      </div>
      
      {error && <ErrorDisplay error={error} onDismiss={() => setError(null)} />}
      
      <div className="flex-1 overflow-y-auto mb-4">
        <MessageList messages={messages} />
      </div>
      
      <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4">
        <InputField
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          onStop={stop}
        />
      </div>
    </div>
  );
} 