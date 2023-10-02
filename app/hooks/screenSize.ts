import { useEffect, useState } from 'react';

function useScreenSize() {
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 641) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 769) {
        setScreenSize('tablet');
      } else if (window.innerWidth < 1025) {
        setScreenSize('largeTablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
}

export default useScreenSize;