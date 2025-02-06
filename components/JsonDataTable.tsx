import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';

const jsonDataList = [{
    id : 'dfjkdskjdgjksdhjskg',
    name : 'test',
    createdAt : '2021-09-01',
}]


const JsonDataTable = () => {
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
              <TableCell>{format(new Date(data.createdAt), 'MMMM d, yyyy')}</TableCell>
              {/* <TableCell>
                <button>Share</button>
              </TableCell> */}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default JsonDataTable;
