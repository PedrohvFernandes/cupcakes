import { useEffect, useState } from 'react';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

type debounceProps = {
  fn: () => void;
  timeMs: number;
};

// Essa função é um desquicador, ela vai esperar o tempo que você passar para executar a função. O processo de debouncing é a eliminação de uma oscilação em alguma coisa. Também é dito que o debouncing é processo de garantir que uma função seja chamada apenas depois de um tempo sem ser chamada.
const debounce = ({ fn, timeMs }: debounceProps) => {
  let timer: ReturnType<typeof setTimeout> | null;
  return () => {
    clearTimeout(timer as ReturnType<typeof setTimeout>);
    timer = setTimeout(() => {
      timer = null;
      fn();
    }, timeMs);
  };
};

const useGetWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    const debouncedHandleResize = debounce({
      fn: () => setWindowDimensions(getWindowDimensions()),
      timeMs: 500,
    });

    // window.addEventListener('resize', handleResize);
    // return () => window.removeEventListener('resize', handleResize);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  return windowDimensions;
};

export default useGetWindowDimensions;