import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading data...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
};
