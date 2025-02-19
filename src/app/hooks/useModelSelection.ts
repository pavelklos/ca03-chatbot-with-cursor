import { useState, useEffect } from 'react';
import { ModelType } from '../types/chat';

export function useModelSelection() {
  const [selectedModel, setSelectedModel] = useState<ModelType>('gpt-3.5-turbo');

  useEffect(() => {
    const savedModel = localStorage.getItem('aiModel') as ModelType;
    if (savedModel) {
      setSelectedModel(savedModel);
    }
  }, []);

  const updateModel = (model: ModelType) => {
    setSelectedModel(model);
    localStorage.setItem('aiModel', model);
  };

  return { selectedModel, updateModel };
} 