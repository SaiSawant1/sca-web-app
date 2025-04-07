import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DollarSign } from "lucide-react";

interface NotificationProps {
  name: string;
  email: string;
  profit: string;
  avatar: string;
  time: string;
}

export const Notification = ({
  name,
  email,
  profit,
  avatar,
  time,
}: NotificationProps) => {
  const profitValue = parseInt(profit);
  const isHighValue = profitValue > 10000;

  return (
    <div className="flex items-center justify-between group transition-all duration-300 hover:bg-muted/50 rounded-lg p-2">
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10 border-2 border-background">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium leading-none">{name}</p>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <DollarSign className={`h-4 w-4 ${isHighValue ? 'text-primary' : 'text-muted-foreground'}`} />
        <span className={`text-sm font-medium ${isHighValue ? 'text-primary' : ''}`}>
          {profitValue.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
