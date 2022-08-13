import { FaTrash } from 'react-icons/fa';

export default function ClientRow({ client }) {
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.phone}</td>
      <td>{client.email}</td>
      <td>
        <button className='btn btn-danger bt-sm'>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}
