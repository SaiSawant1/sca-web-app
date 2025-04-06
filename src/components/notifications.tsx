import { Notification } from "./notificaiton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const data = [
  {
    name: "sai",
    email: "saisawant2003@gmail.com",
    profit: "9000",
    avatar: "/01.png",
  },
  {
    name: "alex",
    email: "alex.johnson@example.com",
    profit: "12000",
    avatar: "/01.png",
  },
  {
    name: "mira",
    email: "mira.patel@example.com",
    profit: "8500",
    avatar: "/02.png",
  },
  {
    name: "ryan",
    email: "ryan.lee@example.com",
    profit: "7600",
    avatar: "/01.png",
  },
  {
    name: "lena",
    email: "lena.martinez@example.com",
    profit: "10500",
    avatar: "/01.png",
  },
  {
    name: "tom",
    email: "tom.anderson@example.com",
    profit: "9200",
    avatar: "/02.png",
  },
  {
    name: "nina",
    email: "nina.kim@example.com",
    profit: "11100",
    avatar: "/01.png",
  },
  {
    name: "dan",
    email: "daniel.nguyen@example.com",
    profit: "9800",
    avatar: "/02.png",
  },
  {
    name: "emma",
    email: "emma.wilson@example.com",
    profit: "8900",
    avatar: "/01.png",
  },
  {
    name: "leo",
    email: "leo.thomas@example.com",
    profit: "10200",
    avatar: "/02.png",
  },
];

export const Notifications = () => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Recent sales</CardTitle>
        <CardDescription>You have made 250 sale in last month</CardDescription>
      </CardHeader>
      <CardContent>
        {data.map((item, id) => (
          <Notification
            key={id}
            email={item.email}
            name={item.name}
            profit={item.profit}
            avatar={item.avatar}
          />
        ))}
      </CardContent>
    </Card>
  );
};
