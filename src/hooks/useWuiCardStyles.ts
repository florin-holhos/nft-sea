import { useEffect } from "react";
import { useWeb3ModalState } from "@web3modal/wagmi/react";

const useWuiCardStyles = () => {
  const { open } = useWeb3ModalState();

  useEffect(() => {
    if (open) {
      const wuiCard = document
        .querySelector("w3m-modal")
        ?.shadowRoot?.querySelector("wui-flex")
        ?.querySelector("wui-card");

      if (wuiCard) {
        console.log(wuiCard);

        wuiCard.setAttribute(
          "style",
          `
          position: fixed; 
          right: 0; 
          height: 100%; 
          width: 100%;
          max-width: 400px; 
          border-radius: 0; 
          background-color: #000; 
          border-left: 1px solid; 
          border-left-color: rgba(255,255,255,0.2)`
        );
      }
    }
  }, [open]);
};

export default useWuiCardStyles;
