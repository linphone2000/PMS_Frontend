import { createContext, useContext, useMemo, useState } from "react";

const MasterContext = createContext();

export const MasterProvider = ({ children }) => {
  // States
  const [tableChanged, setTableChanged] = useState(false);

  // Memo
  const masterContextValue = useMemo(
    () => ({
      tableChanged,
      setTableChanged,
    }),
    [tableChanged]
  );

  return (
    <MasterContext.Provider value={masterContextValue}>
      {children}
    </MasterContext.Provider>
  );
};

export const useMaster = () => {
  return useContext(MasterContext);
};
