import Image from "next/image";

import FileIntegrityChecker from "@/components/FileIntegrityChecker/FileIntegrityChecker";

export default function Home() {
  return (
    <main className="flex flex-col justify-center pt-10 px-6 sm:px-12 md:px-20">
      <h1 className="text-5xl text-center font-extrabold text-center bg-gradient-to-br from-[#00D8FF] to-[#008CFF] inline-block text-transparent bg-clip-text py-2">
        File Integrity Checker
      </h1>
      <p className="font-semibold px-[10%] md:px-[20%] text-xl text-center mt-4">
        Check the integrity between two files
        <br />
        Just upload both of them below and easily compare their SHA3 hash values
      </p>
      <FileIntegrityChecker />
    </main>
  );
}
