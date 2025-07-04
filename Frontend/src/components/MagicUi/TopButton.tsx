import { Button } from "@/components/ui/button";

interface TopButtonProps {
  text: string;
  handleFunction: () => void;
}

function TopButton({ handleFunction, text }: TopButtonProps) {
  return (
    <div className="absolute top-10 right-20">
      <Button variant="outline" onClick={handleFunction} className="w-fit">
        {text}
      </Button>
    </div>
  );
}

export default TopButton;
