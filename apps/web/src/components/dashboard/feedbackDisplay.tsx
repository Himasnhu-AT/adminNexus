import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Archive, Trash2 } from "lucide-react";

export default function FeedbackDisplay({
  feedback,
  feedbackSort,
  setFeedbackSort,
  sortedFeedback,
  handleArchiveFeedback,
  handleDeleteFeedback,
}) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Feedback and Bug Tracking</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                setFeedbackSort({
                  field: "timestamp",
                  direction: "desc",
                })
              }
            >
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setFeedbackSort({
                  field: "timestamp",
                  direction: "asc",
                })
              }
            >
              Oldest First
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setFeedbackSort({ field: "type", direction: "asc" })
              }
            >
              Type
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setFeedbackSort({ field: "status", direction: "asc" })
              }
            >
              Status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>
            Manage user feedback and bug reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {sortedFeedback.map((item) => (
              <div
                key={item.id}
                className="mb-4 p-4 bg-white rounded-lg shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      item.type === "bug"
                        ? "bg-red-100 text-red-800"
                        : item.type === "feature"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {item.type.toUpperCase()}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      item.status === "open"
                        ? "bg-yellow-100 text-yellow-800"
                        : item.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : item.status === "closed"
                            ? "bg-green-100 text-green-800"
                            : item.status === "archived"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {item.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-800 mb-2">{item.title}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleArchiveFeedback(item.id)}
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteFeedback(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
