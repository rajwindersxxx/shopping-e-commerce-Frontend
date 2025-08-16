import { useState } from "react";
import { useModal } from "../../context/ModalContext";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
// * this model is static component it only use last state when open  not current state
interface props {
  confirmDelete?: () => void;
  message: string;
  type: "confirm" | "message";
}
const ConfirmModel = ({ confirmDelete, message, type }: props) => {
  const { closeModal } = useModal();
  const [disable, setIsDisable] = useState(false);
  function handleDelete() {
    if (confirmDelete) {
      setIsDisable(true);
      confirmDelete();
    }
  }
  function handleClose() {
    setIsDisable(true);
    closeModal();
  }
  return (
    <div className="flex flex-col gap-10 p-4">
      <h2 className="text-2xl font-semibold">{message}</h2>
      {type === "confirm" && (
        <div className="flex justify-center gap-10">
          <SecondaryButton onClick={handleClose} disabled={disable}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleDelete} disabled={disable}>
            Yes
          </PrimaryButton>
        </div>
      )}
      {type === "message" && (
        <div className="flex justify-center">
          <PrimaryButton onClick={handleClose}>OK</PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default ConfirmModel;
