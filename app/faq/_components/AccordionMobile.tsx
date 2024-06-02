"use client";

import { Accordion } from "@/components/ui/accordion";
import { useEffect, useState } from "react";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export function AccordionMobile({ children }: React.PropsWithChildren) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <Accordion type="single">{children}</Accordion>
  ) : (
    <Accordion type="multiple">{children}</Accordion>
  );
}
