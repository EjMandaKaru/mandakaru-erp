import { CalendarClock } from "lucide-react";

type Task = {
  id: number;
  title: string;
  hora: string;
};

type TaskListProps = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: TaskListProps) => (
  <ul className="space-y-2">
    {tasks.map((task) => (
      <li
        key={task.id}
        className="card bg-base-200 p-4 rounded-box flex justify-between items-center"
      >
        <div className="flex items-center gap-2">
          <CalendarClock className="w-4 h-4 text-primary" />
          <span>{task.title}</span>
        </div>
        <span className="badge badge-outline">{task.hora}</span>
      </li>
    ))}
  </ul>
);
