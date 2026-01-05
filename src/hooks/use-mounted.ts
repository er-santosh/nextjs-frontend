import { useState, useEffect, useEffectEvent } from "react";

const useMounted = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  const handleMount = useEffectEvent(() => {
    setMounted(true);
  });

  useEffect(() => {
    handleMount();
  }, []);

  return mounted;
};

export default useMounted;
