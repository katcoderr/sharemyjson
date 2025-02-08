import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Feature = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex gap-4 py-20 lg:py-40 flex-col items-start">
        <div>
          <Badge>sharemyjson.</Badge>
        </div>
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
            Features!
          </h2>
          <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
            Managing huge number of JSON today is already tough.
          </p>
        </div>
        <div className="flex gap-10 pt-12 flex-col w-full">
          <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
            <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Instant Sharing</p>
                <p className="text-muted-foreground text-sm">
                Share JSON data with a unique link in seconds.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Anonymous & Secure</p>
                <p className="text-muted-foreground text-sm">
                No account required to view, and data is securely stored.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Lightning Fast Sharing</p>
                <p className="text-muted-foreground text-sm">
                Optimized backend for ultra-fast data retrieval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);