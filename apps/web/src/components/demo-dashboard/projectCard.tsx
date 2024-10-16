import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Project } from "@/types/logging";

interface ProjectCardsProps {
  projects: Project[];
  selectedProject: number | null;
  setSelectedProject: (id: number | null) => void;
  newProjectName: string;
  setNewProjectName: (name: string) => void;
  handleAddProject: () => void;
}

export default function ProjectCards({
  projects,
  selectedProject,
  setSelectedProject,
  newProjectName,
  setNewProjectName,
  handleAddProject,
}: ProjectCardsProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Logging</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Enter the name of the new project you want to add.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddProject}>Add Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            className={`cursor-pointer transition-all duration-200 ${selectedProject === project.id ? "ring-2 ring-blue-500" : "hover:shadow-lg"}`}
            onClick={() => setSelectedProject(project.id)}
          >
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Total Logs: {project.totalLogs}
              </p>
              <p className="text-sm text-gray-500">
                Error Rate: {project.errorRate}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
