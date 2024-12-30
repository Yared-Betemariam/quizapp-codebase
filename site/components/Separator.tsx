import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

const Separator = ({ className }: { className?: ClassValue }) => {
  return (
    <div className={cn("h-[0.78px] w-full bg-neutral-900/[0.15]", className)} />
  );
};
export default Separator;
