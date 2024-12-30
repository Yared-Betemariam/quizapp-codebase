"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";

interface ModalWrapperProps {
  children?: React.ReactNode;
  className?: string;
  headerLabel?: string;
  headerDesc?: string;
  trigger: React.ReactNode;
}

export function ModalWrapper({
  children,
  headerDesc,
  headerLabel,
  trigger,
  className,
}: ModalWrapperProps) {
  const handleOnAdd: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
  };
  return (
    <Dialog>
      <DialogTrigger asChild onClick={handleOnAdd}>
        {trigger}
      </DialogTrigger>
      <DialogContent className={cn(className)}>
        <div onClick={handleOnAdd} className="flex flex-col gap-4">
          {headerLabel && (
            <DialogHeader>
              <DialogTitle>{headerLabel}</DialogTitle>
              <DialogDescription>{headerDesc}</DialogDescription>
            </DialogHeader>
          )}
          <div className="flex flex-col">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
