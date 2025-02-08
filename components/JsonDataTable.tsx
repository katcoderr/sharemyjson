import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { JsonData } from "@prisma/client";
import Link from "next/link";
import { ShareIcon, TrashIcon } from "lucide-react";
import { UpdateJsonDialog } from "./UpdateJsonDialog";

const JsonDataTable = () => {
  const [jsonDataList, setJsonDataList] = useState<JsonData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/json");
      const data = await response.json();
      setJsonDataList(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching JSON data", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/json/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setJsonDataList(jsonDataList.filter((item) => item.id !== id));
      } else {
        console.error("Error deleting JSON data");
      }
    } catch (error) {
      console.error("Error deleting JSON data", error);
    }
  };

  const handleUpdate = async (id: string, name: string, content: string) => {
    try {
      const response = await fetch(`/api/json/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, content }),
      });

      if (response.ok) {
        setJsonDataList(
          jsonDataList.map((item) =>
            item.id === id
              ? { ...item, name, content: content, updatedAt: new Date() }
              : item,
          ),
        );
      } else {
        console.error("Error updating JSON data");
      }
    } catch (error) {
      console.error("Error updating JSON data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading your data...</div>;
  }

  if (jsonDataList.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-6">No JSON data found</div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>
            <span className="sr-only">Share</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jsonDataList.map((data) => {
          return (
            <TableRow key={data.id}>
              <TableCell>{data.name}</TableCell>
              <TableCell>
                {format(new Date(data.createdAt), "MMMM d, yyyy")}
              </TableCell>
              <TableCell className="flex  items-center space-x-3 justify-end">
                <Link href={`/${data.id}`}>
                  <ShareIcon className="h-4 w-4 mr-3" />
                </Link>
                <UpdateJsonDialog
                  id={data.id}
                  currentName={data.name}
                  currentData={data.content}
                  onUpdate={handleUpdate}
                />
                <TrashIcon
                  className="h-4 w-4 cursor-pointer hover:text-destructive"
                  onClick={() => handleDelete(data.id)}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default JsonDataTable;
