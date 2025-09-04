import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustIndicators = [
    {
      icon: 'Shield',
      label: 'Secure Login',
      description: 'SSL Encrypted'
    },
    {
      icon: 'Lock',
      label: 'Privacy Protected',
      description: 'FERPA Compliant'
    },
    {
      icon: 'CheckCircle',
      label: 'Trusted Platform',
      description: '99.9% Uptime'
    },
    {
      icon: 'Award',
      label: 'Certified',
      description: 'Education Standard'
    }
  ];

  const certifications = [
    {
      name: 'SOC 2 Type II',
      icon: 'Certificate',
      color: 'text-success'
    },
    {
      name: 'FERPA Compliant',
      icon: 'ShieldCheck',
      color: 'text-primary'
    },
    {
      name: 'ISO 27001',
      icon: 'Award',
      color: 'text-secondary'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
        {trustIndicators?.map((indicator, index) => (
          <div key={index} className="flex items-center space-x-1">
            <Icon name={indicator?.icon} size={14} className="text-success" />
            <span>{indicator?.label}</span>
          </div>
        ))}
      </div>
      {/* Certifications */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-center space-x-1 mb-3">
          <Icon name="Shield" size={16} className="text-primary" />
          <span className="text-sm font-medium text-card-foreground">Security & Compliance</span>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {certifications?.map((cert, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Icon name={cert?.icon} size={16} className={cert?.color} />
              </div>
              <span className="text-xs text-muted-foreground">{cert?.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-primary">500K+</div>
          <div className="text-xs text-muted-foreground">Students</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-secondary">25K+</div>
          <div className="text-xs text-muted-foreground">Teachers</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-accent">1K+</div>
          <div className="text-xs text-muted-foreground">Schools</div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;