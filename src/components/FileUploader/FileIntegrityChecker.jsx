"use client";
import { useState, useRef } from "react";
import { SHA3 } from "crypto-js";

import { FaFileArrowUp } from "react-icons/fa6";
import { CgSpinner } from "react-icons/cg";

const FileIntegrityChecker = () => {
  const file1InputRef = useRef(null);
  const file2InputRef = useRef(null);

  const [file1, setFile1] = useState(null);
  const [sha3Value1, setSha3Value1] = useState(null);

  const [file2, setFile2] = useState(null);
  const [sha3Value2, setSha3Value2] = useState(null);

  const handleFileChange1 = (e) => {
    const selectedFile = e.target.files[0];
    setFile1(selectedFile);

    // Calculate SHA-3 value when a file is selected
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const sha3 = SHA3(fileContent, { outputLength: 256 }).toString();
        setSha3Value1(sha3);
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
        setSha3Value2(sha3);
      };
      reader.readAsBinaryString(selectedFile);
    }
  };

  const handleClear1 = () => {
    setFile1(null);
    setSha3Value1(null);

    if (file1InputRef.current) {
      file1InputRef.current.value = "";
    }
  };

  const handleClear2 = () => {
    setFile2(null);
    setSha3Value2(null);

    if (file2InputRef.current) {
      file2InputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="flex flex-row mt-20">
        <div className="w-[50%] px-6 flex flex-col">
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
              <p className="text-lg">
                <b>File Name:</b> {file1.name}
              </p>
              <p className="text-lg">
                <b>Hash Value:</b>
              </p>
              <p className="text-md">
                {sha3Value1 ? (
                  sha3Value1
                ) : (
                  <div className="flex flex-row items-center">
                    <CgSpinner
                      size={30}
                      color="#000000"
                      className="animate-spin"
                    />
                    <span className="ml-2">Calculating, please wait ...</span>
                  </div>
                )}
              </p>
            </div>
          )}
        </div>
        <div className="w-[50%] px-6 flex flex-col">
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
              <p className="text-lg">
                <b>File Name:</b> {file2.name}
              </p>
              <p className="text-lg">
                <b>Hash Value:</b>
              </p>
              <p className="text-md">
                {sha3Value2 ? (
                  sha3Value2
                ) : (
                  <div className="flex flex-row items-center">
                    <CgSpinner
                      size={30}
                      color="#000000"
                      className="animate-spin"
                    />
                    <span className="ml-2">Calculating, please wait ...</span>
                  </div>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileIntegrityChecker;
