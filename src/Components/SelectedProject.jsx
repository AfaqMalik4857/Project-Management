import Tasks from "./Tasks";

export default function SelectedProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  tasks,
}) {
  const formattedDate = project?.dueDate
    ? new Date(project.dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "No due date available";

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project?.title ?? "Untitled Project"}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={onDelete}
            disabled={!project} // Disable button if project is undefined
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="mb-4 text-stone-600 whitespace-pre-wrap">
          {project?.description ?? "No description available"}
        </p>
      </header>
      <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
    </div>
  );
}
