import React from 'react';
import { Card, CardContent } from './ui/card';

interface User {
  name: string;
}

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div className="space-y-2">
      {users.map((user, index) => (
        <Card key={`${user.name}-${index}`}>
          <CardContent className="p-4 text-lg font-medium">
            {user.name}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
