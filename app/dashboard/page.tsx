"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ReportComponent from "@/components/ReportComponent";
import ChatComponent from "@/components/chatcomponent";
import { DashboardHeader } from "./components/dashboard-header";

export default function DashboardPage() {
  const { toast } = useToast();

  const [reportData, setreportData] = useState("");
  const onReportConfirmation = (data: string) => {
    setreportData(data);
    toast({
      description: "Updated!",
    });
  };

  return (
    <>
      <DashboardHeader />
      <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="hidden md:flex flex-col">
          <ReportComponent onReportConfirmation={onReportConfirmation} />
        </div>
        <div className="lg:col-span-2">
          <ChatComponent reportData={reportData} />
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed bottom-4 right-4 md:hidden">
              <Settings />
              <span className="sr-only">Settings</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh]">
            <ReportComponent onReportConfirmation={onReportConfirmation} />
          </DrawerContent>
        </Drawer>
      </main>
    </>
  );
} 