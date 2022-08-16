import AddClientModal from '../AddClientModal';
import AddProjectModal from '../AddProjectModal';
import Clients from '../Clients';
import Projects from '../Projects';

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  );
}
