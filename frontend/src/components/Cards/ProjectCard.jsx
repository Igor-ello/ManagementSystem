import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.scss';

const importAll = (r) => r.keys().map(r);
const projectImages = importAll(require.context('../../assets/images/projects/', false, /\.(png|jpe?g|svg)$/));

const ProjectCard = ({ project }) => {
  const imageIndex = project.id % 6;

  const getCardStyleClass = () => {
    switch(imageIndex) {
      case 0: return 'project-card--project1';
      case 1: return 'project-card--project2';
      case 2: return 'project-card--project3';
      case 3: return 'project-card--project4';
      case 4: return 'project-card--project5';
      case 5: return 'project-card--project6';
      default: return 'project-card--project1';
    }
  };

  return (
    <div className={`project-card ${getCardStyleClass()}`}>
      <div className="project-card__content">
        <h3 className="project-card__title">{project.name}</h3>
        <p className="project-card__description">
          {project.description || 'Описание отсутствует'}
        </p>
        <Link
          to={`/projects/${project.id}`}
          className="project-card__link"
        >
          Подробнее
        </Link>
      </div>
      <div className="project-card__image-container">
        <img
          src={projectImages[imageIndex]}
          className="project-card__image"
          alt={project.name}
        />
      </div>
    </div>
  );
};

export default ProjectCard;