import { useCallback, useState } from "react";

function useModal(): [
    boolean,
    () => void,
    () => void
] {
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);
    
    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    return [modalIsOpen, openModal, closeModal];
}

export default useModal;