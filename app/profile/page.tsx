import { getUser } from "../lib/dal";

const containerClass = "flex items-center m-3";
const labelClass = "w-1/3 text-gray-500 font-bold pr-4";
const valueClass = "w-2/3 text-gray-400 font-bold";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) {
    return (
      <div className="m-3 max-w-sm">
        <div className="text-xl text-gray-500 font-bold m-3">Profile</div>
        <div>No user found</div>
      </div>
    );
  }
  return (
    <div className="m-3 max-w-sm">
      <div className="text-xl text-gray-500 font-bold m-3">Profile</div>
      <div className={containerClass}>
        <div className={labelClass}>Name</div>
        <div className={valueClass}>{user.name}</div>
      </div>
      <div className={containerClass}>
        <div className={labelClass}>E-mail</div>
        <div className={valueClass}>{user.email}</div>
      </div>
      <div className={containerClass}>
        <div className={labelClass}>Team</div>
        <div className={valueClass}>{user.team}</div>
      </div>
      <div className={containerClass}>
        <div className={labelClass}>Role</div>
        <div className={valueClass}>{user.role}</div>
      </div>
    </div>
  );
}
