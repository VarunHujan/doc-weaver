import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, ArrowLeft, CheckCircle, AlertCircle, FileSearch } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock extracted data
const mockData = {
  documentTitle: "Q4 Financial Report 2024",
  pages: 12,
  processedAt: new Date().toLocaleString(),
  extractedFields: [
    { label: "Company Name", value: "Acme Corporation" },
    { label: "Report Period", value: "October - December 2024" },
    { label: "Total Revenue", value: "$2,450,000" },
    { label: "Net Profit", value: "$485,000" },
    { label: "Document Type", value: "Financial Statement" },
  ],
  summary: `This Q4 2024 financial report from Acme Corporation shows strong performance with total revenue of $2.45M, representing a 15% increase from the previous quarter. The net profit margin stands at 19.8%, indicating healthy operational efficiency.

Key highlights include:
• Revenue growth driven by new product launches
• Operating expenses reduced by 8% through automation
• Cash reserves increased to $1.2M
• No significant outstanding liabilities reported

The document appears to be in compliance with standard financial reporting formats and contains all required disclosures.`,
  confidence: 94,
  status: "success" as const,
};

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data] = useState(mockData);

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your report is being prepared for download.",
    });
    
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: "Report saved to your downloads folder.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 gradient-subtle">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      </div>
      
      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold">DocProcessor</h1>
          </div>
          <Button variant="ghost" onClick={() => navigate("/upload")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Upload
          </Button>
        </div>
        
        {/* Status Card */}
        <Card className="mb-6 animate-slide-up">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                data.status === "success" ? "bg-green-100" : "bg-destructive/10"
              }`}>
                {data.status === "success" ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-destructive" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{data.documentTitle}</h2>
                <p className="text-sm text-muted-foreground">
                  {data.pages} pages • Processed {data.processedAt}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {data.confidence}% confidence
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        {/* Extracted Data */}
        <Card className="mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileSearch className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Extracted Data</CardTitle>
            </div>
            <CardDescription>
              Key information extracted from your document
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {data.extractedFields.map((field, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">{field.label}</span>
                    <span className="text-sm font-medium text-right">{field.value}</span>
                  </div>
                  {index < data.extractedFields.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* AI Summary */}
        <Card className="mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded gradient-primary flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary-foreground">AI</span>
              </div>
              <CardTitle className="text-lg">AI Summary</CardTitle>
            </div>
            <CardDescription>
              AI-generated analysis of your document
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {data.summary}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Actions */}
        <div className="flex gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Button variant="gradient" size="lg" className="flex-1" onClick={handleDownload}>
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate("/upload")}>
            Process Another
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
