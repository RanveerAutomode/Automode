"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "./components/topbar/TopBar";
import Toast from "./components/toast/Toast";

function Home() {
  const [showToast, setShowToast] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  });

  return null;

  // return <div className="w-full">Home</div>;

  // return (
  //   <div>
  //     <TopBar />
  //   </div>
  // );
}

export default Home;
