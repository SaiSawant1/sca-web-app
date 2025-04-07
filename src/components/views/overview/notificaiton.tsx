import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface NotificationProps {
  name: string;
  email: string;
  profit: string;
  avatar: string;
  time: string;
}

export const Notification = (
  { email, name, profit, avatar, time }: NotificationProps,
) => {
  return (
    <div className="flex w-full py-4 first:pt-0 last:pb-0">
      <div className="flex items-start gap-4 w-full group">
        <Avatar className="h-9 w-9">
          <AvatarImage src={avatar} alt={name} />
        </Avatar>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={cn(
            "text-sm font-medium",
            parseInt(profit) > 10000 ? "text-green-600 dark:text-green-500" : ""
          )}>
            +${parseInt(profit).toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
      </div>
    </div>
  );
};
