import { useState, useEffect } from "react";

const useMounted = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted;
};

export default useMounted;
