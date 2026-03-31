import { createContext, useContext, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

type ConfirmOptions = {
  title?: string;
  message: string;
  onConfirm: () => void;
};

const ConfirmContext = createContext<any>(null);

export const useConfirm = () => useContext(ConfirmContext);

export function ConfirmProvider({ children }: any) {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const showConfirm = (opts: ConfirmOptions) => {
    setOptions(opts);
    setVisible(true);
  };

  const handleConfirm = () => {
    options?.onConfirm();
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <ConfirmContext.Provider value={{ showConfirm }}>
      {children}

      <ConfirmDialog
        visible={visible}
        title={options?.title}
        message={options?.message || ""}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
}
