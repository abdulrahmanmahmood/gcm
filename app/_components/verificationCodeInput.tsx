import React from "react";

interface IVerificationCodeInputProps {
  state: {
    code1: string;
    code2: string;
    code3: string;
    code4: string;
    code5: string;
    code6: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
  inputFocus: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  fieldsRef: React.RefObject<HTMLDivElement>;
}

const VerificationCodeInput: React.FC<IVerificationCodeInputProps> = ({
  state,
  handleChange,
  inputFocus,
  fieldsRef,
}) => {
  return (
    <div ref={fieldsRef} className="mt-2 flex items-center gap-x-2">
      <input
        type="text"
        data-index="0"
        placeholder="0"
        value={state.code1}
        className="w-[70px] h-[75px] rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
        onChange={(e) => handleChange(e, "code1")}
        onKeyUp={inputFocus}
      />
      <input
        type="text"
        data-index="1"
        placeholder="0"
        value={state.code2}
        className="w-[70px] h-[75px] rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
        onChange={(e) => handleChange(e, "code2")}
        onKeyUp={inputFocus}
      />
      <input
        type="text"
        data-index="2"
        placeholder="0"
        value={state.code3}
        className="w-[70px] h-[75px] rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
        onChange={(e) => handleChange(e, "code3")}
        onKeyUp={inputFocus}
      />
      <input
        type="text"
        data-index="3"
        placeholder="0"
        value={state.code4}
        className="w-[70px] h-[75px] rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
        onChange={(e) => handleChange(e, "code4")}
        onKeyUp={inputFocus}
      />{" "}
      <input
        type="text"
        data-index="4"
        placeholder="0"
        value={state.code5}
        className="w-[70px] h-[75px] rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
        onChange={(e) => handleChange(e, "code5")}
        onKeyUp={inputFocus}
      />{" "}
      <input
        type="text"
        data-index="5"
        placeholder="0"
        value={state.code6}
        className="w-[70px] h-[75px] rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
        onChange={(e) => handleChange(e, "code6")}
        onKeyUp={inputFocus}
      />
    </div>
  );
};

export default VerificationCodeInput;
