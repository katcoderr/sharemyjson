// components/UpdateJsonDialog.tsx
"use client"
import { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent, 
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { PencilIcon } from "lucide-react"

interface UpdateJsonDialogProps {
  id: string
  currentName: string
  currentData: string
  onUpdate: (id: string, name: string, value: string) => Promise<void>
}

export function UpdateJsonDialog({ id, currentName, currentData, onUpdate }: UpdateJsonDialogProps) {
  const [jsonData, setJsonData] = useState(currentData)
  const [jsonName, setJsonName] = useState(currentName)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleUpdate = async () => {
    await onUpdate(id, jsonName, jsonData)
    setOpenModal(false)
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <PencilIcon className="h-4 w-4 mr-2 cursor-pointer hover:text-blue-500" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Update JSON</DialogTitle>
          <DialogDescription>
            Update your JSON data.
            
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>JSON Name</Label>
            <Input 
              value={jsonName} 
              onChange={(e) => setJsonName(e.target.value)}
              className="rounded-none"
            />
          </div>
          
          <div className="grid gap-2">
            <Label>JSON Data</Label>
            <CodeMirror
              value={jsonData}
              height="400px"
              extensions={[json()]}
              onChange={(value) => setJsonData(value)}
              className="border shadow-sm"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleUpdate}>
              Update
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}