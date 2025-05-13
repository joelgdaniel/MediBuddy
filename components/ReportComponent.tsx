import React, { ChangeEvent, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import SocialMediaLinks from '@/components/SocialMediaLinks'
// import { toast } from 'sonner'
import { useToast } from "@/components/ui/use-toast"

type Props = {
    onReportConfirmation: (data: string) => void
}

const ReportComponent = ({ onReportConfirmation }: Props) => {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [documentData, setDocumentData] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    function handleDocumentSelection(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedFile(file)
        }
    }

    async function extractDetails(): Promise<void> {
        if (!selectedFile) {
            toast({
                variant: 'destructive',
                description: "Please select a document first!",
            })
            return
        }

        setIsLoading(true)

        try {
            // Convert file to base64
            const base64 = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(selectedFile);
            });

            const response = await fetch('/api/extractreportgemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ base64 }),
            });

            if (!response.ok) {
                throw new Error('Failed to extract details');
            }

            const text = await response.text();
            setDocumentData(text);
        } catch (error) {
            console.error('Error:', error);
            toast({
                variant: 'destructive',
                description: "Failed to extract details. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    function viewDocument() {
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile)
            window.open(url, '_blank')
        } else {
            toast({
                variant: 'destructive',
                description: "No document available to view!",
            })
        }
    }

    return (
        <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
            <fieldset className='relative grid gap-6 rounded-lg border p-4'>
                <legend className="text-sm font-medium">Legal Document</legend>
                {isLoading && (
                    <div className="absolute z-10 h-full w-full bg-card/90 rounded-lg flex flex-row items-center justify-center">
                        Extracting document details...
                    </div>
                )}
                <Input 
                    type='file'
                    accept='.pdf,.doc,.docx,.txt'
                    onChange={handleDocumentSelection} 
                />
                <Button onClick={extractDetails}>1. Upload Document</Button>
                <Button
                    variant="outline"
                    className="text-sm"
                    onClick={viewDocument}
                >
                    View Document
                </Button>
                <Label>Document Summary</Label>
                <Textarea
                    value={documentData}
                    onChange={(e) => {
                        setDocumentData(e.target.value)
                    }}
                    placeholder="Extracted details from your legal document will appear here. Add any additional context or details about your legal situation..."
                    className="min-h-72 resize-none border-0 p-3 shadow-none focus-visible:ring-0" 
                />
                <Button
                    variant="destructive"
                    className="bg-[#0074d976]"
                    onClick={() => {
                        onReportConfirmation(documentData)
                    }}
                >
                    2. Confirm Details
                </Button>
                <div className='flex flex-row items-center justify-center gap-2 p-4'>
                    <Label>Share your thoughts </Label>
                    <SocialMediaLinks />
                </div>
            </fieldset>
        </div>
    )
}

export default ReportComponent