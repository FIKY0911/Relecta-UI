import { Typography } from '../../atoms/Typography/Typography';
import { Card } from '../../atoms/Card/Card';
import type { ReactNode } from 'react';

interface Feature {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface FeatureSectionProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  variant?: 'light' | 'soft';
}

export const FeatureSection = ({ title, subtitle, features, variant = 'light' }: FeatureSectionProps) => {
  return (
    <section className={`py-24 px-6 ${variant === 'soft' ? 'bg-secondary/10' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Typography variant="h2" className="mb-4">{title}</Typography>
          {subtitle && (
            <Typography variant="body" className="text-slate-600 max-w-2xl mx-auto">
              {subtitle}
            </Typography>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} variant="feature" className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 text-primary">
                {feature.icon || (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <Typography variant="h3" className="mb-4 text-xl">{feature.title}</Typography>
              <Typography variant="body" className="text-slate-500 leading-relaxed">
                {feature.description}
              </Typography>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
