import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Icon } from '../Icon';
import styles from './PicturesSlider.module.scss';

interface Slide {
  image: string;
  alt: string;
}

interface Props {
  slides: Slide[];
  intervalMs?: number;
}

export const PicturesSlider: React.FC<Props> = ({
  slides,
  intervalMs = 5000,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

  if (slides.length === 0) {
    return null;
  }

  const goTo = (next: number) =>
    setIndex((next + slides.length) % slides.length);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.track}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map(slide => (
          <div className={styles.slide} key={slide.image}>
            <img src={slide.image} alt={slide.alt} />
          </div>
        ))}
      </div>

      <button
        type="button"
        className={cn(styles.navButton, styles.prev)}
        aria-label="Previous slide"
        onClick={() => goTo(index - 1)}
      >
        <Icon name="chevron-left" />
      </button>

      <button
        type="button"
        className={cn(styles.navButton, styles.next)}
        aria-label="Next slide"
        onClick={() => goTo(index + 1)}
      >
        <Icon name="chevron-right" />
      </button>

      <div className={styles.dashes}>
        {slides.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            className={cn(styles.dash, { [styles.active]: i === index })}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
};
