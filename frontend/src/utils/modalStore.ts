import { create } from 'zustand';

interface ModalState {
  isContactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
}

// Create the Zustand store
export const useModalStore = create<ModalState>((set) => ({
  isContactModalOpen: false, // Initial state: modal is closed
  // Action to open the modal
  openContactModal: () => set({ isContactModalOpen: true }),
  // Action to close the modal
  closeContactModal: () => set({ isContactModalOpen: false }),
}));