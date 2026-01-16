"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}

export default function InfoItem({ icon: Icon, label, children }: InfoItemProps) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="w-6 h-6 mt-1 flex-shrink-0 text-black" />
      <div>
        <p className="font-medium text-black">{label}</p>
        <div className="text-zinc-600 text-black">{children}</div>
      </div>
    </div>
  );
}
