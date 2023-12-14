import React from "react";
import * as Types from "types";
import * as Components from "components";
import Confetti from "react-confetti";
import Image from "next/image";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";

type Props = {
  jsonData: Types.ObjectMetadata;
  onClose: () => void;
};

const ConfirmationModal: React.FC<Props> = (props) => {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti
        opacity={0.7}
        width={width * 0.7}
        height={height}
        className="m-auto"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur -z-10"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeIn", duration: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="p-5 mx-4 w-full max-w-lg bg-black border-l border-white border-opacity-20 rounded-2xl flex flex-col text-white gap-5"
        >
          <Image
            src={props.jsonData.image + "?img-width=512"}
            quality={80}
            width={512}
            height={512}
            className="w-full rounded object-cover"
            alt="Upload"
          />

          <div>
            <h2 className="font-bold text-[22px] font-cinzel mb-2">
              {props.jsonData.name}
            </h2>
            <p className="opacity-70 font-light whitespace-pre-wrap">
              {props.jsonData.description}
            </p>
          </div>

          <Components.Button
            variant="primary"
            className="self-center min-w-[155px]"
            onClick={props.onClose}
          >
            Continue
          </Components.Button>
        </motion.div>
      </div>
    </>
  );
};

export default ConfirmationModal;
