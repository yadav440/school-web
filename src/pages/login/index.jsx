import React from 'react';
import { Helmet } from 'react-helmet';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import LoginFooter from './components/LoginFooter';

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login - SchoolHub | Educational Management Platform</title>
        <meta name="description" content="Secure login to SchoolHub educational management platform. Access your role-specific dashboard for comprehensive school administration and learning management." />
        <meta name="keywords" content="school login, education platform, student portal, teacher dashboard, school management" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Branding & Information */}
            <div className="hidden lg:block space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 px-4 py-2 bg-primary/10 rounded-full">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-primary">System Online</span>
                </div>
                
                <h2 className="text-4xl font-bold text-foreground leading-tight">
                  Empowering Education Through Technology
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Join thousands of educators, students, and administrators who trust SchoolHub 
                  for comprehensive educational management and seamless learning experiences.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-primary rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-foreground">Multi-Role Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Tailored dashboards for administrators, teachers, students, and parents
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-secondary rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-foreground">Real-time Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Instant notifications for grades, assignments, and announcements
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-accent rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-foreground">Secure Platform</h3>
                  <p className="text-sm text-muted-foreground">
                    FERPA compliant with enterprise-grade security measures
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-success rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-foreground">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Round-the-clock assistance for all your educational needs
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full">
              <div className="bg-card rounded-2xl shadow-elevation-4 border border-border p-8 lg:p-10">
                <LoginHeader />
                
                <div className="space-y-8">
                  <TrustSignals />
                  <LoginForm />
                  <LoginFooter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;