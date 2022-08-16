import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import ClientInfo from '../ClientInfo';
import DeleteProject from '../DeleteProject';
import { GET_PROJECT } from '../queries/projectQueries';

export default function Project() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: id },
  });

  if (loading) return null;
  if (error) return <p>Something wrong</p>

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to='/' className='btn btn-light btm-sm w-25 d-inline ms-auto'>
            Go Back
          </Link>

          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className='mt-3'>Project Status:</h5>
          <div className="lead">{data.project.status}</div>

          <ClientInfo client={data.project.client}/>

          <DeleteProject projectId={data.project.id}/>
        </div>
      )}
    </>
  );
}
