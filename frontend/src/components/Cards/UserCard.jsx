import React from 'react';
import { Link } from 'react-router-dom';

const importAll = (r) => r.keys().map(r);
const userImages = importAll(require.context('../../assets/images/users/', false, /\.(png|jpe?g|svg)$/));

const UserCard = ({ user }) => {
  const imageIndex = user.id % 6;

  return (
    <div className="card h-100">
      <div className="card-body d-flex align-items-center p-3">
        <div className="flex-shrink-0 me-3">
          <img
            src={userImages[imageIndex]}
            className="rounded-circle user-avatar"
            alt={user.username}
            width="140"
            height="140"
          />
        </div>
        <div className="flex-grow-1">
          <h5 className="card-title mb-1">{user.username}</h5>
          <p className="card-position mb-2">Роль в компании: {user.role}</p>
          <Link to={`/users/${user.id}`} className="btn btn-sm btn-accent">Подробнее</Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;