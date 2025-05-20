import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h5 className="card-title">{task.title}</h5>
            <p className="card-text text-truncate">{task.description || 'Описание отсутствует'}</p>
          </div>
          <div className="text-muted">ID: {task.id}</div>
        </div>
        <Link to={`/tasks/${task.id}`} className="btn btn-accent w-100 mt-2">Подробнее</Link>
      </div>
    </div>
  );
};

export default TaskCard;
