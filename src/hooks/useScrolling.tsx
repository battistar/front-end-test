import { useEffect, useState } from 'react';

const useScrolling = (endOffset = 100): { end: boolean } => {
  const [end, setEnd] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - endOffset) {
        setEnd(true);
      } else {
        setEnd(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [endOffset]);

  return { end };
};

export default useScrolling;
