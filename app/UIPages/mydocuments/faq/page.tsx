
"use client";

import FAQDocument from "../../../UIComponents/UIQAComponents/FAQDocument";
import FreeTextQA from "../../../UIComponents/UIQAComponents/FreeTextQA";

export default function FAQAndQA() {
  return (
    <div className="flex flex-col md:flex-row gap-16 p-4 max-w-6xl mx-auto">
      {/* Left: FAQ Documents Section */}
      <div className="md:w-2/3 w-full">
        <FAQDocument />
      </div>
      {/* Right: Free Text QA Section */}
      <div className="md:w-1/3 w-full">
        <FreeTextQA />
      </div>
    </div>
  );
}
