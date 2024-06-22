import { useEffect} from "react";
import { useModal } from "../../context/Modal";

function StandAloneModal({
  modalComponent, // component to render inside the modal
  openOnLoad = true, // boolean flag to control opening on load
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const handleOpenModal = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  // Open modal based on shouldOpenModal state
  useEffect(() => {
    if (openOnLoad) {
      handleOpenModal();
    }
  }, [openOnLoad]);
  return null;
}

export default StandAloneModal;
