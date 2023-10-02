"use client";

import { useState } from "react";

// import EditIcon from "@/public/admin/profile/edit-2.svg";

const articles = () => {
    const [hoverId, setHoverId] = useState<number|null>(null);
  const sidebarData = [
    "Getting Started",
    "Item & Services",
    "Sales Order",
    "Banking",
    "Customers & Vendors",
    "Contacts",
    "Chart of Account",
    "Invoices",
    "Shipments",
    "Receipts",
    "Credit Note",
    "Purchase Order",
    "e-Invoices",
    "Bills",
    "Unit of Masurement",
    "Production Order",
    "Reports",
    "Goods Receipt Notes",
    "GST",
    "Taxes",
    "Users & Roles",
    "Expenses",
    "Opening Balance",
  ];

  const contentList= [
    "How to create Sales Order?",
    "How to set an Automation in creating a Sales Order and convert it into Invoice?",
    "How to turn on auto Sales Order Creation?",
    "How to convert Sales order into Invoice manually?",
  ]

  return (
    <div className="w-full h-[100%]">
      {/* <h1>Articles</h1> */}
      <div className="flex h-[100%]">
        <div className="w-[220px] h-full overflow-auto bg-white  p-6">
            {sidebarData.map((item, index) => {
                return (
                    <div key={index} className={`${index===2 && "font-semibold text-primary-500"} cursor-pointer px-4 py-2 text-b2 text-neutral-400`}>
                        <p>{item}</p>
                    </div>
                )
            })
            }
        </div>

        <div className="bg-[#F1F4F9] p-6">
          <h1 className="text-title text-neutral-700 font-medium mb-[30px]">Sales Order</h1>
          <div>
            {contentList.map((item, index) => {
                return (
                    <div key={index} className="flex items-center gap-2 mb-3 cursor-pointer" onMouseEnter={()=>setHoverId(index)} onMouseLeave={ ()=>setHoverId(null) }>
                        <div className={`${hoverId===index && "!bg-primary-500"} h-1.5 w-1.5 bg-neutral-600 rounded-full`}></div>
                        <p className={`${hoverId===index && "text-primary-500"} text-b2 text-neutral-600`}>{item}</p>
                    </div>
                )
            })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default articles;
