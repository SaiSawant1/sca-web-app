import { Avatar, AvatarImage } from "./ui/avatar";

interface NotificationProps {
  name: string;
  email: string;
  profit: string;
  avatar: string;
}

export const Notification = (
  { email, name, profit, avatar }: NotificationProps,
) => {
  return (
    <div className="flex w-full p-2">
      <div className="flex justify-center items-center gap-2 w-full">
        <Avatar>
          <AvatarImage src={avatar} />
        </Avatar>
        <div className="w-full flex justify-between items-center ">
          <div>
            <div>{name}</div>
            <div className="text-slate-600">{email}</div>
          </div>
          <div className="font-bold">
            +{profit}$
          </div>
        </div>
      </div>
    </div>
  );
};
