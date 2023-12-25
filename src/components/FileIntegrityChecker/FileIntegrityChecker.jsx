"use client";
import { useState, useRef } from "react";
import { SHA3 } from "crypto-js";
import { useRouter } from "next/navigation";

import HashCompare from "./HashCompare";

import { FaFileArrowUp } from "react-icons/fa6";
import { CgSpinner } from "react-icons/cg";

const FileIntegrityChecker = ({ walletAddress }) => {
  const router = useRouter();

  const file1InputRef = useRef(null);
  const file2InputRef = useRef(null);

  const [file1, setFile1] = useState(null);
  const [sha3Value1, setSha3Value1] = useState(null);
  const [file1Size, setFile1Size] = useState(null);

  const [file2, setFile2] = useState(null);
  const [sha3Value2, setSha3Value2] = useState(null);
  const [file2Size, setFile2Size] = useState(null);

  const formatFileSize = (sizeInBytes) => {
    const kilobytes = sizeInBytes / 1024;
    return kilobytes.toFixed(2) + " KB";
  };

  const handleFileChange1 = (e) => {
    const selectedFile = e.target.files[0];
    setFile1(selectedFile);

    // Calculate SHA-3 value when a file is selected
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const sha3 = SHA3(fileContent, { outputLength: 256 }).toString();
        setSha3Value1(sha3 + walletAddress);
        setFile1Size(formatFileSize(selectedFile.size));
      };
      reader.readAsBinaryString(selectedFile);
    }
  };

  const handleFileChange2 = (e) => {
    const selectedFile = e.target.files[0];
    setFile2(selectedFile);

    // Calculate SHA-3 value when a file is selected
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const sha3 = SHA3(fileContent, { outputLength: 256 }).toString();
        setSha3Value2(sha3 + walletAddress);
        setFile2Size(formatFileSize(selectedFile.size));
      };
      reader.readAsBinaryString(selectedFile);
    }
  };

  const handleClear1 = () => {
    setFile1(null);
    setSha3Value1(null);
    setFile1Size(null);

    if (file1InputRef.current) {
      file1InputRef.current.value = "";
    }
  };

  const handleClear2 = () => {
    setFile2(null);
    setSha3Value2(null);
    setFile2Size(null);

    if (file2InputRef.current) {
      file2InputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row mt-6">
        <div className="w-full md:w-[50%] px-12 flex flex-col border-b-2 border-b-[#008CFF] md:border-b-0 md:border-r-2 md:border-r-[#008CFF] py-12 md:py-6">
          <input
            type="file"
            ref={file1InputRef}
            onChange={handleFileChange1}
            onClick={handleClear1}
            style={{ display: "none" }}
          />
          <button
            onClick={() => file1InputRef.current.click()}
            className=" flex flex-row mx-auto justify-center items-center bg-gradient-to-br from-[#00D8FF] to-[#008CFF] text-white rounded-lg px-4 py-2 border-black hover:from-[#008CFF] hover:to-[#008CFF] transition duration-300"
          >
            <FaFileArrowUp size={20} />
            <span className="ml-2">Upload File #1</span>
          </button>
          {file1 && (
            <div className="mt-6">
              <h3 className="font-extrabold text-2xl text-center my-2">
                Upload Details
              </h3>

              <p className="text-lg break-words">
                <b>File Name:</b> {file1.name}
              </p>
              <p className="text-lg">
                <b>File Size:</b> {file1Size}
              </p>
              <p className="text-lg">
                <b>Hash Value:</b>
              </p>
              <p className="text-md">
                {sha3Value1 ? (
                  <p className="hash-output break-words">{sha3Value1}</p>
                ) : (
                  <div className="flex flex-row items-center">
                    <CgSpinner
                      size={30}
                      color="#000000"
                      className="animate-spin"
                    />
                    <span className="ml-2">
                      File Uploading, Please Wait ...
                    </span>
                  </div>
                )}
              </p>
            </div>
          )}
        </div>
        <div className="w-full md:w-[50%] px-12 flex flex-col mt-6 md:mt-0 border-b-2 border-b-[#008CFF] md:border-b-0 pt-6 pb-12 md:pb-6">
          <input
            type="file"
            ref={file2InputRef}
            onChange={handleFileChange2}
            onClick={handleClear2}
            style={{ display: "none" }}
          />
          <button
            onClick={() => file2InputRef.current.click()}
            className=" flex flex-row mx-auto justify-center items-center bg-gradient-to-br from-[#00D8FF] to-[#008CFF] text-white rounded-lg px-4 py-2 border-black hover:from-[#008CFF] hover:to-[#008CFF] transition duration-300"
          >
            <FaFileArrowUp size={20} />
            <span className="ml-2">Upload File #2</span>
          </button>
          {file2 && (
            <div className="mt-6">
              <h3 className="font-extrabold text-2xl text-center my-2">
                Upload Details
              </h3>
              <p className="text-lg break-words">
                <b>File Name:</b> {file2.name}
              </p>
              <p className="text-lg">
                <b>File Size:</b> {file2Size}
              </p>
              <p className="text-lg">
                <b>Hash Value:</b>
              </p>
              <p className="text-md">
                {sha3Value2 ? (
                  <p className="hash-output break-words">{sha3Value2}</p>
                ) : (
                  <div className="flex flex-row items-center">
                    <CgSpinner
                      size={30}
                      color="#000000"
                      className="animate-spin"
                    />
                    <span className="ml-2">
                      File Uploading, Please Wait ...
                    </span>
                  </div>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10">
        {!file1 || !file2 ? (
          <p className="font-medium px-[20%] text-xl text-center mt-20 mb-10">
            Please Upload Both of the Files To Check Integrity
          </p>
        ) : (
          <>
            {sha3Value1 && sha3Value2 ? (
              <div>
                {router.push("#hashCompare")}
                <HashCompare sha3Value1={sha3Value1} sha3Value2={sha3Value2} />
              </div>
            ) : (
              <div className="flex">
                <div className="flex flex-col items-center mx-auto mt-20">
                  <CgSpinner
                    size={40}
                    color="#000000"
                    className="animate-spin"
                  />
                  <span className="mt-4 font-medium px-[20%] text-xl text-center">
                    Please Wait for Both SHA3 Hash Values to be Calculated
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FileIntegrityChecker;
