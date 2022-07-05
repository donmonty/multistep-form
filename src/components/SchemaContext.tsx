import React, { useContext } from "react";
import useSchema from "../lib/useSchema";


export type SchemaContextProps = {
  currentSchema: any;
  loadPageSchema: (page: string, option?: string) => void;
}

const SchemaContext = React.createContext<SchemaContextProps>({
  currentSchema: null,
  loadPageSchema: () => {},
});

// Custom hooks
export function useSchemaContext() {
  return useContext(SchemaContext);
}

// Providers
export function SchemaProvider({ children }: { children: any }) {
  const { currentSchema, loadPageSchema } = useSchema();

  return (
    <SchemaContext.Provider value={{ currentSchema, loadPageSchema }}>
      {children}
    </SchemaContext.Provider>
  );
}

