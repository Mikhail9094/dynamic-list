import { useMemo, useState } from "react";

function useRowLevel(level: number) {
  const [top, setTop] = useState(0);

  const ref = (e: HTMLTableRowElement) => {
    setTop(e?.getBoundingClientRect()?.top || 0);
  };

  const left = useMemo(() => level * 21, [level]);

  return { top, left, ref };
}

export default useRowLevel;
