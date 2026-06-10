import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type SceneType =
  | 'intro'
  | 'memories'
  | 'timeline'
  | 'letter'
  | 'question'
  | 'yes-ending'
  | 'no-ending';

interface SceneContextType {
  currentScene: SceneType;
  previousScene: SceneType | null;
  isLoading: boolean;
  loadingMessage: string;
  goToScene: (scene: SceneType, withLoader?: boolean, message?: string) => void;
  goBack: () => void;
  answer: 'yes' | 'no' | null;
  setAnswer: (answer: 'yes' | 'no') => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

const loadingMessages: Record<SceneType, string> = {
  intro: 'Opening your story...',
  memories: 'Loading memories...',
  timeline: 'Replaying our journey...',
  letter: 'Opening chapter...',
  question: 'One more thing...',
  'yes-ending': 'Unlocking hidden feelings...',
  'no-ending': 'Unlocking hidden feelings...',
};

export function SceneProvider({ children }: { children: ReactNode }) {
  const [currentScene, setCurrentScene] = useState<SceneType>('intro');
  const [previousScene, setPreviousScene] = useState<SceneType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);

  const goToScene = useCallback(
    (scene: SceneType, withLoader = true, message?: string) => {
      if (withLoader) {
        setIsLoading(true);
        setLoadingMessage(message || loadingMessages[scene]);

        /* Snappy transition: 380–680 ms */
        const duration = 380 + Math.random() * 300;

        setTimeout(() => {
          setIsLoading(false);
          setPreviousScene(currentScene);
          setCurrentScene(scene);
        }, duration);
      } else {
        setPreviousScene(currentScene);
        setCurrentScene(scene);
      }
    },
    [currentScene],
  );

  const goBack = useCallback(() => {
    if (previousScene) {
      setCurrentScene(previousScene);
      setPreviousScene(null);
    }
  }, [previousScene]);

  return (
    <SceneContext.Provider
      value={{
        currentScene,
        previousScene,
        isLoading,
        loadingMessage,
        goToScene,
        goBack,
        answer,
        setAnswer,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene must be used within SceneProvider');
  }
  return context;
}
