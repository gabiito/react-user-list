import { SortBy, User } from "@/types";

interface UsersListProps {
  users: User[];
  tableColored: boolean;
  changeSorting: (sorting: SortBy) => void;
  onDeleteUser: (uuid: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  tableColored,
  changeSorting,
  onDeleteUser,
}) => {
  return (
    <table className="w-full">
      <thead className={`${tableColored && 'bg-gray-700 text-white'} transition-colors`}>
        <tr className="py-3 [&>th]:p-2 border-b">
          <th>Photo</th>
          <th
            className="cursor-pointer hover:text-indigo-300"
            onClick={() => changeSorting(SortBy.NAME)}
          >
            First name
          </th>
          <th
            className="cursor-pointer hover:text-indigo-300"
            onClick={() => changeSorting(SortBy.LAST)}
          >
            Last name
          </th>
          <th
            className="cursor-pointer hover:text-indigo-300"
            onClick={() => changeSorting(SortBy.COUNTRY)}
          >
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody
        className={`
          ${tableColored && '[&>tr:nth-child(even)]:bg-gray-300'}
          ${tableColored && '[&>tr:nth-child(odd)]:bg-gray-200'}
          ${tableColored ? '[&>tr]:border-gray-700' : '[&>*]:border-gray-300'}
        `}
      >
        {users.map((user) => (
          <tr
            key={user.login.uuid}
            className="text-center border-b transition-colors [&>td]:p-2"     
          >
            <td>
              <img src={user.picture.thumbnail} alt="User avatar" width={48} height={48} className="mx-auto"/>
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button 
                className="p-2 text-rose-400 hover:text-rose-600"
                onClick={() => onDeleteUser(user.login.uuid)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </td>
          </tr>
        ))
        }
      </tbody>
    </table>
  );
};

export default UsersList;
