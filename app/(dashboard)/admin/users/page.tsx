import React from 'react';
import { getAllUsers } from '@/lib/dbServices';
import { ProfileCard } from '@/components/profile-card';

const UsersListPage = async () => {
  const users = await getAllUsers();
  return (
    <ul className="">
      {users.map((user) => {
        return (
          <li key={user.id}>
            {
              <ProfileCard
                name={user.name!}
                email={user.email}
                image={user.image!}
                role={user.role}
              />
            }
          </li>
        );
      })}
    </ul>
  );
};

export default UsersListPage;
