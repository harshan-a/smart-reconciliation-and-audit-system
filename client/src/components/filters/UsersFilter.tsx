import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import type { Role } from "../../types"
import { getUsers } from "../../api/users"

type Users = { _id: string; name: string; role: Role }

type UsersFilterProps = {
  uploadBy: string
  setUploadby: Dispatch<SetStateAction<string>>
}

export default function UsersFilter({
  uploadBy,
  setUploadby,
}: UsersFilterProps) {
  const [users, setUsers] = useState<Users[]>()

  useEffect(() => {
    const fetchUsers = async function () {
      const { data }: { data: { data: Users[] } } = await getUsers()
      setUsers(data.data)
    }
    fetchUsers()
  }, [])

  return (
    <div>
      <label htmlFor="users">Uploaded By: </label>
      <select
        name="users"
        id="users"
        value={uploadBy}
        onChange={(e) => setUploadby(e.target.value)}
        className="text-[14px] py-1 p-1.5 border border-gray-300 rounded transition-all focus:outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-400">
        {users
          ? users.map((user, i) => {
              return (
                <option value={user._id} className="text-black" key={i}>
                  {user.name} ({user.role}){" "}
                </option>
              )
            })
          : "no users"}
      </select>
    </div>
  )
}
