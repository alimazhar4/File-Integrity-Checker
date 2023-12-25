"use client";
import Link from "next/link";
import { useState } from "react";
import { ethers } from "ethers";

import FileIntegrityChecker from "@/components/FileIntegrityChecker/FileIntegrityChecker";

import { FaGithub, FaFileSignature, FaWallet } from "react-icons/fa";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [signature, setSignature] = useState("");

  async function requestAccount() {
    // console.log("Requesting account...");

    if (window.ethereum) {
      // console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert(
        "\nEVM Wallet not detected! You need one to use this app.\n\nKindly make sure your web3 wallet browser extensions are active\nOr download one like Metamask if you don't have any."
      );
    }
  }

  async function signMessage() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const message = `Sign this message to prove ownership of ${walletAddress}`;
      const signature = await signer.signMessage(message);
      setSignature(signature);
    } catch (error) {
      console.error("Error signing message:", error);
      alert(`\nError Code: ${error.code} \n${error.message}`);
    }
  }

  return (
    <main className="flex flex-col">
      <div className=" flex justify-center bg-gradient-to-br from-[#00ccFF] to-[#008CFF] hover:from-[#008CFF] hover:to-[#008CFF] text-white text-sm text-center py-2 px-8">
        <Link
          href={"https://github.com/alimazhar4/File-Integrity-Checker"}
          target="_blank"
          rel="nofollow"
          className="font-semibold flex flex-row gap-2 flex-wrap justify-center items-center"
        >
          <FaGithub size={30} color="#ffffff" />
          <span>Click Here To View Source Code at Github</span>
        </Link>
      </div>
      <div className="flex flex-col justify-center pt-10 px-6 sm:px-12 md:px-20">
        <h1 className="text-5xl text-center font-extrabold text-center bg-gradient-to-br from-[#00D8FF] to-[#008CFF] inline-block text-transparent bg-clip-text py-2">
          File Integrity Checker
        </h1>
        <p className="font-semibold px-[10%] md:px-[20%] text-xl text-center mt-4">
          Check the integrity between two files
          <br />
          Just upload both of them below and easily find out if their content
          differs
        </p>
        {!walletAddress ? (
          <div className="mt-10 flex flex-col justify-center text-center">
            <p className="text-lg my-2">Connect Your Web3 Wallet to Continue</p>

            <button
              onClick={requestAccount}
              className=" flex flex-row mx-auto justify-center items-center bg-gradient-to-br from-[#00D8FF] to-[#008CFF] text-white rounded-lg px-4 py-2 border-black hover:from-[#008CFF] hover:to-[#008CFF] transition duration-300"
            >
              <FaWallet size={20} />
              <span className="ml-2">Connect Wallet</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="flex flex-col mt-10 text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-br from-[#00D8FF] to-[#008CFF] inline-block text-transparent bg-clip-text">
                Connected Wallet
              </h3>
              <p>{walletAddress}</p>
              {!signature ? (
                <button
                  onClick={signMessage}
                  className=" mt-4 flex flex-row mx-auto justify-center items-center bg-gradient-to-br from-[#00D8FF] to-[#008CFF] text-white rounded-lg px-4 py-2 border-black hover:from-[#008CFF] hover:to-[#008CFF] transition duration-300"
                >
                  <FaFileSignature size={20} />
                  <span className="ml-2">Sign Signature</span>
                </button>
              ) : (
                <FileIntegrityChecker walletAddress={walletAddress} />
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
