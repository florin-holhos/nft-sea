"use client";

import { useEffect, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import { motion } from "framer-motion";

import Image from "next/image";
import * as Components from "components";
import * as Helpers from "lib/helpers";
import * as Types from "types";
import abiFile from "../../abi.json";

const { abi } = abiFile;
const contractAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS as `0x${string}`;
const contractConfig = { abi, address: contractAddress };

export default function Home() {
  const { address, isConnected, isReconnecting } = useAccount();
  const {
    writeAsync: mint,
    error: mintError,
    data,
  } = useContractWrite({
    ...contractConfig,
    functionName: "mint",
  });

  console.log({ data, mintError });

  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<null | string>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [jsonData, setJsonData] = useState<Types.ObjectMetadata | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [listItemAfterMint, setListItemAfterMint] = useState(true);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      setSelectedFile(null);
      return;
    }

    const file = files[0];

    setSelectedFile(file);
  };

  const resetForm = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const fileInput = document.querySelector("#nft-img") as HTMLInputElement;

    if (fileInput) {
      fileInput.value = "";
    }

    setSelectedFile(null);
    setTitle("");
    setDescription("");
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile || !title || !description) {
      return;
    }

    setIsUploading(true);

    // upload file to pinata
    const fileUploadResponse = await Helpers.pinFileToIPFS(selectedFile, title);

    if (fileUploadResponse.error) {
      setUploadError(fileUploadResponse.error);
      setIsUploading(false);
      return;
    }

    const imgUrl = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${fileUploadResponse.data.IpfsHash}`;

    // create standardized json object and upload it to decentralized storage
    const jsonData = {
      name: title,
      description,
      external_url: window.location.href,
      image: imgUrl,
    };

    const jsonUploadResponse = await Helpers.pinJsonToIPFS(jsonData);

    if (jsonUploadResponse.error) {
      setUploadError(jsonUploadResponse.error);
      setIsUploading(false);
      return;
    }

    const jsonUrl = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${jsonUploadResponse.data.IpfsHash}`;

    setJsonData(jsonData);

    // mint NFT
    // try {
    //   const nft = await mint({
    //     args: [address, jsonUrl],
    //   });

    //   console.log(nft.hash);
    // } catch (error) {
    //   console.log(error);
    // }

    setIsUploading(false);
    resetForm();
  };

  const handleMintButtonMouseOver = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!isConnected) {
      document.querySelector("#wallet-btn")?.classList.add("scale-150");
    }
  };

  const handleMintButtonMouseLeave = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!isConnected) {
      document.querySelector("#wallet-btn")?.classList.remove("scale-150");
    }
  };

  const canMint = isConnected && !isReconnecting && !isUploading;

  return (
    <main className="container mt-6 mb-10 min-h-screen">
      <section className="mt-8">
        <div className="ring-1 ring-white rounded-lg px-8 py-16 bg-white bg-opacity-10 flex flex-col items-center text-center gap-8">
          <Image
            src="mint-new-nft.svg"
            alt="Mint new NFT"
            width={100}
            height={100}
            className="h-11 w-full"
          />

          <p className="text-white opacity-70 max-w-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ad
            voluptates aperiam hic laborum, quasi harum voluptatibus dignissimos
            optio, similique eius tempora est molestiae? Minus ea debitis
            distinctio maiores amet?
          </p>
        </div>
      </section>
      <section className="mt-24 mb-28">
        <form
          action="POST"
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center justify-center w-full gap-5 max-w-2xl m-auto text-white"
        >
          <div
            className="w-full rounded bg-[#383838]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%239E9E9EFF' stroke-width='1' stroke-dasharray='14' stroke-dashoffset='3' stroke-linecap='square'/%3e%3c/svg%3e")`,
              borderRadius: 5,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          >
            {preview && (
              <Image
                src={preview}
                width={100}
                height={100}
                className="w-full rounded-t"
                alt="Upload"
              />
            )}

            <label
              htmlFor="nft-img"
              className="w-full hover:cursor-pointer flex items-center justify-center px-4 py-8 gap-2 text-lg flex-col"
            >
              <div className="flex gap-1">
                <Image
                  src="upload-icon.svg"
                  width={100}
                  height={100}
                  className="w-4"
                  alt="Upload"
                />{" "}
                Upload image
                <input
                  required
                  accept="image/jpeg, image/png, image/gif"
                  type="file"
                  name="upload"
                  id="nft-img"
                  className="absolute opacity-0 -z-10"
                  onChange={handleFileSelect}
                />
              </div>
              <p className="text-sm opacity-60">
                Supported file formats: JPG, GIF, PNG
              </p>
            </label>
          </div>
          <input
            value={title}
            required
            type="text"
            name="title"
            id="nft-title"
            className="w-full bg-[#383838] rounded border border-[#9E9E9E] p-4 placeholder:text-white"
            placeholder="NFT Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            required
            name="description"
            id="nft-description"
            className="w-full bg-[#383838] rounded p-4 border border-[#9E9E9E] placeholder:text-white"
            placeholder="Description"
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
          />

          {uploadError && (
            <div
              className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {uploadError}
            </div>
          )}

          {mintError && (
            <div
              className="p-4 break-all text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {(mintError as Error & { shortMessage: string }).shortMessage}
            </div>
          )}

          <div className="flex justify-evenly w-full gap-4">
            <Components.Button
              id="mint-without-listing"
              title={canMint ? "Mint NFT" : "Wallet not connected"}
              disabled={!canMint}
              variant="text"
              type="submit"
              className="flex-1"
              onMouseOver={handleMintButtonMouseOver}
              onMouseLeave={handleMintButtonMouseLeave}
              onClick={() => setListItemAfterMint(false)}
            >
              Mint without listing
            </Components.Button>

            <Components.Button
              title={canMint ? "Mint NFT" : "Wallet not connected"}
              disabled={!canMint}
              variant="primary"
              type="submit"
              className="flex-1"
              onMouseOver={handleMintButtonMouseOver}
              onMouseLeave={handleMintButtonMouseLeave}
              onClick={() => setListItemAfterMint(true)}
            >
              Mint and list immediately
            </Components.Button>
          </div>
        </form>

        {jsonData &&
          (listItemAfterMint ? (
            <Components.ConfirmationModal
              jsonData={jsonData}
              onClose={() => {
                setJsonData(null);
              }}
            />
          ) : (
            <div className="fixed left-0 right-0 bottom-32 flex justify-center items-center w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <div
                  className="bg-white border w-full max-w-xl border-green-400 text-green-500 px-4 py-3 rounded relative bg-opacity-10 pr-14"
                  role="alert"
                >
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline">
                    {" "}
                    Your NFT Has Been Minted 🎉
                  </span>
                  <span
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    onClick={() => setJsonData(null)}
                  >
                    <svg
                      className="fill-current h-6 w-6 text-green-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
      </section>
    </main>
  );
}
