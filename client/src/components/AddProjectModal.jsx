import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { ADD_PROJECT } from './mutations/projectMutations';
import { GET_CLIENTS } from './queries/clientQueries';
import { GET_PROJECTS } from './queries/projectQueries';

export default function AddProjectModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('now');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = () => {
    if (name === '' || description === '' || status === '') {
      return alert('Please fill all forms');
    }

    addProject(name, description, clientId, status);

    setName('');
    setDescription('');
    setStatus('now');
    setClientId('');
  };

  if (loading) return null;
  if (error) return <p>Something wrong</p>;

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModal">
        Add Project
      </button>

      <div
        className="modal fade"
        id="addProjectModal"
        tabIndex="-1"
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">
                Add Project Form
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    Description
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    Phone
                  </label>

                  <select
                    id="status"
                    value={status}
                    className="form-select"
                    onChange={(e) => setStatus(e.target.value)}>
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="client">
                    Client
                  </label>

                  <select
                    id="status"
                    value={clientId}
                    className="form-select"
                    onChange={(e) => setClientId(e.target.value)}>
                    <option value="new">Select Client</option>
                    {data.clients.map((client) => (
                      <option value={client.id} key={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">
                  Add Client
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
