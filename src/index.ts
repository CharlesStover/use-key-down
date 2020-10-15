import { useEffect, useState } from 'react';

export default function useKeyDown(key: string): boolean {
  const [isKeyDown, setIsKeyDown] = useState(false);

  useEffect((): (() => void) => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === key) {
        setIsKeyDown(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent): void => {
      if (e.key === key) {
        setIsKeyDown(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [key]);

  return isKeyDown;
}
