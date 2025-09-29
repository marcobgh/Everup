import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import "./Alert.css"

type AlertType = "error" | "success" | "alert";

type UiContextType = {
    showAlert: (content: ReactNode, type?: AlertType) => void;
    hideAlert: () => void;
}

type AlertState = {
    content: ReactNode;
    type: AlertType;
} | null;

const UiContext = createContext<UiContextType | undefined>(undefined);

export function UiProvider({children}: {children: ReactNode}) {
    const [alert, setAlert] = useState<AlertState>(null);

    const showAlert = (content: ReactNode, type: AlertType = "alert") => setAlert({ content, type });

    const hideAlert = () => setAlert(null);

    useEffect( () => {
        if (!alert) return;

        const timer = setTimeout(() => {
            hideAlert();
        }, 5000);

        return () => clearTimeout(timer);
    }, [alert])


    return (
        <UiContext.Provider value={{ showAlert, hideAlert}}>
            {alert && (
                <div className={`popup-container ${alert.type}`}>
                <span className="error-detail">
                    {alert.content}{" "}
                    {alert.type === "error" && (
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    )}
                    {alert.type === "success" && (
                    <i className="fa-solid fa-circle-check"></i>
                    )}
                    {alert.type === "alert" && (
                    <i className="fa-solid fa-circle-info"></i>
                    )}
                </span>
                </div>
            )}
            {children}
        </UiContext.Provider>
    )
}

export function useUi() {
    const context = useContext(UiContext);
    if (!context) throw new Error("useUi precisa estar dentro de UiProvider");
    return context;
}