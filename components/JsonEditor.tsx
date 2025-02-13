"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JsonDataTable from "./JsonDataTable";
import AddJsonDialog from "./AddJsonDialog";

const JsonEditor = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const handleSave = async (jsonName: string, jsonData: string) => {
    const response = await fetch("/api/json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: jsonName,
        content: jsonData,
      }),
    });

    if (response.ok) {
      setRefreshKey((prev: number) => prev + 1);
      setErrorMessage("");
      console.log("JSON Saved");
    } else if (response.status === 422) {
      setErrorMessage("Only JSON Data is allowed");
      return response.status;
    } else {
      console.error("Error saving JSON");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved JSON Data</CardTitle>
        <CardDescription>View and share your saved json data</CardDescription>
      </CardHeader>
      <CardContent>
        <JsonDataTable key={refreshKey} />
      </CardContent>
      <CardFooter>
        <AddJsonDialog onSave={handleSave} error={errorMessage} />
      </CardFooter>
    </Card>
  );
};

export default JsonEditor;
