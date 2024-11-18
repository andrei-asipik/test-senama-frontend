export interface FormModalProps {
  open: boolean;
  carId?: string | null;
  onClose: () => void;
  onSave: () => void;
}
