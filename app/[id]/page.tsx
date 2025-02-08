"use client";

import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { useEffect, useState } from "react";
import { JsonData } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface SharedJsonProps {
  params: { id: string };
}

export default function SharedJson({ params }: SharedJsonProps) {
  const { id } = params;
  const [jsonData, setJsonData] = useState<JsonData>();
  const [loading, setLoading] = useState<boolean>(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const linkToCopy = `${baseUrl}/${id}`

  const [iscopied, setIsCopied] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/json/${id}`);
        const data = await response.json();
        setJsonData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching JSON data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="mt-8">Loading your data...</div>;
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl underline font-bold">{jsonData?.name}</h1>
        {!iscopied ? <Button onClick={(e) => {
        navigator.clipboard.writeText(linkToCopy)
        setIsCopied(true)
    }}>Copy Link</Button> : <Button>Copied!</Button>}
      </div>
      <CodeMirror
        value={jsonData?.content || ""}
        height="400px"
        extensions={[json()]}
        editable={false}
        className="border shadow-sm"
      />
    </div>
  );
}
