import Link from "next/link";
import FileIntegrityChecker from "@/components/FileIntegrityChecker/FileIntegrityChecker";

import { FaGithub } from "react-icons/fa";

export default function Home() {
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
          Just upload both of them below and easily compare their SHA3 hash
          values
        </p>
        <FileIntegrityChecker />
      </div>
    </main>
  );
}
