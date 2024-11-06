import { useState } from "react";
import NewProject from "./Components/NewProject";
import NoProjectSelected from "./Components/NoProjectSelected";
import ProjectSidebar from "./Components/ProjectSidebar";
import SelectedProject from "./Components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: id,
    }));
  }

  function handleDeleteProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      ),
      tasks: prevState.tasks.filter(
        (task) => task.projectId !== prevState.selectedProjectId
      ),
    }));
  }

  function handleStartAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  function handleCancelAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  function handleAddProject(projectData) {
    const projectId = Math.random();
    const newProject = {
      ...projectData,
      id: projectId,
    };
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: projectId,
      projects: [...prevState.projects, newProject],
    }));
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content;
  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else {
    content = (
      <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectState.tasks.filter(
          (task) => task.projectId === projectState.selectedProjectId
        )}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
