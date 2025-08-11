import { AlertTriangle } from "lucide-react";
import { ReactNode } from "react";

type AlertProps = {
  children: ReactNode;
};

export const Alert = ({ children }: AlertProps) => (
  <div className="alert alert-warning flex items-start gap-4">
    <AlertTriangle className="w-5 h-5" />
    <div>{children}</div>
  </div>
);
