import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './BackButton.module.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => navigate(-1)}
    >
      <Icon name="chevron-left" size={16} />
      Back
    </button>
  );
};
