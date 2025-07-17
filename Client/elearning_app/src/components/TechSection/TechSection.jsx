import React from "react";

const TechSection = () => {
  const techImageList = [
    {
      id: 1,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.SjqA5gcA69fsmVVLtzE8RwHaCm?pid=Api&P=0&h=180",
    },
    {
      id: 2,
      image:
        "https://qtxasset.com/quartz/qcloud5/media/image/fiercepharma/1643911445/211125_SANOFI_LOGO_RGB.png?VersionId=OMpFG4JDGfUAqlOFOmgnVsWJ9p8X8X.v",
    },
    {
      id: 3,
      image:
        "https://mma.prnewswire.com/media/1481065/ForagerProject_Logo.jpg?p=facebook",
    },
    {
      id: 4,
      image:
        "https://www.thecloroxcompany.com/wp-content/uploads/2022/08/TCC_Stacked_1200x1200.png",
    },
    {
      id: 5,
      image:
        "https://tse3.mm.bing.net/th/id/OIP.y866kWyxEpjf1mHV-QfPqAHaCM?pid=Api&P=0&h=180",
    },
  ];

  return (
    <>
      <div className="block">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-4">
            {techImageList.map((item) => (
              <div
                key={item.id}
                className="w-64 h-24 flex items-center justify-center"
              >
                <img
                  src={item.image}
                  alt={`Tech ${item.id}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TechSection;
