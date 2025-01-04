import { Separator } from "./ui/separator";

export default function OrSeparator() {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <div className="flex-1">
        <Separator />
      </div>
      or
      <div className="flex-1">
        <Separator />
      </div>
    </div>
  );
}
