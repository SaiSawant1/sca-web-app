import { Notification } from "./notificaiton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const data = [
  { name: "sai", email: "saisawant2003@gmail.com", profit: "9000" },
  { name: "alex", email: "alex.johnson@example.com", profit: "12000" },
  { name: "mira", email: "mira.patel@example.com", profit: "8500" },
  { name: "ryan", email: "ryan.lee@example.com", profit: "7600" },
  { name: "lena", email: "lena.martinez@example.com", profit: "10500" },
  { name: "tom", email: "tom.anderson@example.com", profit: "9200" },
  { name: "nina", email: "nina.kim@example.com", profit: "11100" },
  { name: "dan", email: "daniel.nguyen@example.com", profit: "9800" },
  { name: "emma", email: "emma.wilson@example.com", profit: "8900" },
  { name: "leo", email: "leo.thomas@example.com", profit: "10200" },
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
          />
        ))}
      </CardContent>
    </Card>
  );
};
