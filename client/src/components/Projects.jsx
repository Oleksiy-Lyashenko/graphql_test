import { useQuery } from '@apollo/client';
import ProjectCard from './ProjectCard';
import { GET_PROJECTS } from './queries/projectQueries';

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something wrong</p>

  return (
    <>
      {data.projects.length > 0 ? (
        <>
          {data.projects.map(project => (
            <ProjectCard key={project.id} project={project}/>
          ))}
        </>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}
