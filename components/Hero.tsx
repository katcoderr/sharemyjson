import { UploadCloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const Hero = () => (
  <div className="w-full">
    <div className="container mx-auto">
      <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
        <div>
          <Badge variant="outline">We&apos;re live!</Badge>
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
            Paste, Share, Done – Simple & Anonymous JSON Sharing
          </h1>
          <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
            A fast, lightweight tool for developers to share JSON without
            hassle.
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <Button size="lg" className="gap-4" variant="outline">
            <Link href="/dashboard">Upload JSON</Link>{" "}
            <UploadCloudIcon className="w-4 h-4" />
          </Button>
          <Button size="lg" className="gap-4">
            <Link href="/sign-up">Sign Up Here!</Link>{" "}
            <UploadCloudIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);
