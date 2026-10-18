import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * HumanFigure — the central figure between the two F forms.
 * Wraps the media plate and provides the integration layer:
 * controlled rim lighting, contact shadow, and the interlace mask
 * that makes the body wrap the letterforms.
 */
export default function HumanFigure({ children, className }: Props) {
  return (
    <div className={className} style={{ contain: 'layout paint' }}>
      {children}
      {/* Rim light overlay — simulated studio key */}
      <span className="hero-human__rim" aria-hidden="true" />
      {/* Contact shadow where body meets ground */}
      <span className="hero-human__contact" aria-hidden="true" />
    </div>
  );
}
