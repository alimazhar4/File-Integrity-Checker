import { FaCircleXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

const HashCompare = ({ sha3Value1, sha3Value2 }) => {
  const areHashesSame = sha3Value1 === sha3Value2;

  return (
    <div className="mt-6 px-[25%]">
      {areHashesSame ? (
        <div className="flex">
          <div className="flex flex-row mx-auto items-center">
            <FaCheckCircle size={200} color="#008000" />
            <div className="ml-6">
              <p className="text-[#008000] text-2xl font-bold">
                File Content Matched!
              </p>
              <p className="text-[#008000] text-lg">
                The integrity between both of the files is confirmed as their
                hash values match exactly with each other
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="flex flex-row mx-auto items-center">
            <FaCircleXmark size={200} color="#ff0000" />
            <div className="ml-6">
              <p className="text-[#ff0000] text-2xl font-bold">
                File Content Different!
              </p>
              <p className="text-[#ff0000] text-lg">
                The integrity between these both files can&apos;t be confirmed
                because their hash values are different{" "}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HashCompare;
