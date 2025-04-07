import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from "./notificaiton";
import { Button } from "@/components/ui/button";
import { Bell, ChevronRight, DollarSign, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const data = [
  {
    name: "sai",
    email: "saisawant2003@gmail.com",
    profit: "9000",
    avatar: "/01.png",
    time: "2 minutes ago",
  },
  {
    name: "alex",
    email: "alex.johnson@example.com",
    profit: "12000",
    avatar: "/01.png",
    time: "5 minutes ago",
  },
  {
    name: "mira",
    email: "mira.patel@example.com",
    profit: "8500",
    avatar: "/02.png",
    time: "10 minutes ago",
  },
  {
    name: "ryan",
    email: "ryan.lee@example.com",
    profit: "7600",
    avatar: "/01.png",
    time: "15 minutes ago",
  },
  {
    name: "lena",
    email: "lena.martinez@example.com",
    profit: "10500",
    avatar: "/01.png",
    time: "20 minutes ago",
  },
  {
    name: "tom",
    email: "tom.anderson@example.com",
    profit: "9200",
    avatar: "/02.png",
    time: "25 minutes ago",
  },
  {
    name: "nina",
    email: "nina.kim@example.com",
    profit: "11100",
    avatar: "/01.png",
    time: "30 minutes ago",
  },
  {
    name: "dan",
    email: "daniel.nguyen@example.com",
    profit: "9800",
    avatar: "/02.png",
    time: "35 minutes ago",
  },
  {
    name: "emma",
    email: "emma.wilson@example.com",
    profit: "8900",
    avatar: "/01.png",
    time: "40 minutes ago",
  },
  {
    name: "leo",
    email: "leo.thomas@example.com",
    profit: "10200",
    avatar: "/02.png",
    time: "45 minutes ago",
  },
];

const totalProfit = data.reduce((acc, curr) => acc + parseInt(curr.profit), 0);
const averageProfit = totalProfit / data.length;

export const Notifications = () => {
  return (
    <Card className="flex-1 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Recent Sales
            </CardTitle>
            <Badge variant="outline" className="h-6 font-normal">
              {data.length} transactions
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <CardDescription className="text-sm text-muted-foreground flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-primary" />
              Total: ${totalProfit.toLocaleString()}
            </CardDescription>
            <CardDescription className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-primary" />
              Avg: ${averageProfit.toLocaleString()}
            </CardDescription>
          </div>
        </div>
        <Badge variant="secondary" className="h-8 w-8 p-0 flex items-center justify-center">
          <Bell className="h-4 w-4" />
        </Badge>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-6">
          <div className="space-y-4 py-2">
            {data.map((item, id) => (
              <Notification
                key={id}
                email={item.email}
                name={item.name}
                profit={item.profit}
                avatar={item.avatar}
                time={item.time}
              />
            ))}
          </div>
        </ScrollArea>
        <Separator className="my-4" />
        <div className="p-6 pt-0">
          <Button 
            variant="outline" 
            className="w-full group transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            <span>View All Sales</span>
            <ChevronRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
