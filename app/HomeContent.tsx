"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Settings } from "lucide-react";
import { Upload } from 'lucide-react';
import { ModeToggle } from "@/components/modetoggle";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ReportComponent from "@/components/ReportComponent";
import ChatComponent from "@/components/chatcomponent";
import { UserButton } from "@clerk/nextjs";

const HomeContent = () => {
  const { toast } = useToast();
  const [reportData, setreportData] = useState("");

  const onReportConfirmation = (data: string) => {
    setreportData(data);
    toast({
      description: "Updated!"
    });
  };

  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] bg-background items-center gap-1 border-b px-4">
          <h1 className="text-lg md:text-xl font-semibold text-[#D90013]">
            <span className="flex flex-row">Medibuddy</span>
          </h1>
          <div className="w-full flex flex-row justify-end gap-2 items-center">
            <ModeToggle />
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  {/* <Settings /> */}
                  <Upload />
                  {/* <span className="sr-only">Settings</span> */}
                  <span className="sr-only">Upload</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh]">
                <ReportComponent onReportConfirmation={onReportConfirmation} />
              </DrawerContent>
            </Drawer>

            {/* Clerk's UserButton for handling user options, including sign out */}
            <div className="flex space-x-4 items-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>

        <main
          className="grid flex-1 gap-4 overflow-auto p-4
          grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Display ReportComponent only on medium screens and larger */}
          <div className="hidden md:flex flex-col">
            <ReportComponent onReportConfirmation={onReportConfirmation} />
          </div>
          <div className="lg:col-span-2">
            <ChatComponent reportData={reportData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeContent;
