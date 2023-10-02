import FormSidebar from "@/app/components/form-sidebar/FormSidebar";
import { ReactNode } from "react";

type layoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: layoutProps) {
  return (
    <div className="flex mobile:items-start max-tablet:flex-col -m-[8px] mobile:-m-[24px] largeTablet:-m-[16px]">
      <div className="sticky top-2 z-20">
        <FormSidebar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
