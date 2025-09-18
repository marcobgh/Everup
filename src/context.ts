import { createContext, useContext } from "react";

export interface Clients {
    razao: string,
    cnpj: string,
    status: string
}

interface ClientContextType {
    client: Clients[];
    setClient: React.Dispatch<React.SetStateAction<Clients[]>>;
}

export const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function useClientContext() {
    const clients = useContext(ClientContext);

    if (clients === undefined) {
        throw new Error('useClientContext must be used with a ClientContext');
    }

    return clients;
}