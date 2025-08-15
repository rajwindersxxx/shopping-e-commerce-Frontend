import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";

// Define Modal Context Type
interface ModalContextType {
  openModal: (
    content: ReactNode,
    modalName: string,
    modalData?: Record<string, unknown>,
  ) => void;
  closeModal: () => void;
  modalData: Record<string, unknown> | null;
}

// Create Context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Modal Provider
export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<Record<string, unknown> | null>(
    null,
  );

  const openModal = useCallback(
    (
      content: ReactNode,
      modalName: string,
      data?: Record<string, unknown> | null,
    ) => {
      setModalContent(content);
      setActiveModal(modalName);
      setModalData(data || null);
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModalContent(null);
    setActiveModal(null);
    setModalData(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalData }}>
      {children}
      {activeModal &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
            onClick={closeModal}
          >
            <div
              className="bg-natural-beige relative rounded-md bg-white p-4 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-3 -right-3 cursor-pointer rounded-md bg-white p-1 shadow-md"
                onClick={closeModal}
              >
                <HiX />
              </button>
              {modalContent}
            </div>
          </div>,
          document.body,
        )}
    </ModalContext.Provider>
  );
}

// Hook to use modal
// eslint-disable-next-line react-refresh/only-export-components
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
}
