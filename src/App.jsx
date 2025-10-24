import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Input, Textarea, Switch, Select, SelectItem } from '@heroui/react';
import { motion } from 'framer-motion';
import { GuidedTour } from './components';
import AnimatedSection from './components/AnimatedSection';
import CustomTooltipExample from './components/CustomTooltipExample';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const mainTourSteps = [
  {
    selector: '#welcome-section',
    title: 'Welcome to React Guided Tour!',
    content: 'This is a powerful library for creating interactive tours in your React applications. Let me show you around!',
  },
  {
    selector: '#feature-cards',
    title: 'Feature Overview',
    content: 'Here you can see all the amazing features this library offers. Each card represents a different capability.',
  },
  {
    selector: '#demo-section',
    title: 'Interactive Demo',
    content: 'Try out different tour configurations and see how they work in real-time.',
  },
  {
    selector: '#code-example',
    title: 'Easy Integration',
    content: 'Integration is simple! Just import the component and define your tour steps.',
  },
  {
    selector: '#start-button',
    title: 'Ready to Start?',
    content: 'Click this button anytime to restart the tour. You can also use keyboard navigation!',
  },
];

const formTourSteps = [
  {
    selector: '#form-name',
    title: 'Enter Your Name',
    content: 'Start by entering your full name in this field.',
  },
  {
    selector: '#form-email',
    title: 'Email Address',
    content: 'Provide a valid email address for communication.',
  },
  {
    selector: '#form-message',
    title: 'Your Message',
    content: 'Tell us what you think about the tour feature!',
  },
  {
    selector: '#form-submit',
    title: 'Submit Form',
    content: 'Click here when you\'re ready to submit your feedback.',
  },
];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tourKey, setTourKey] = useState(0);
  const [useCustomTooltip, setUseCustomTooltip] = useState(false);
  const { parallaxY, opacity, scale } = useScrollAnimation();

  const resetTour = () => {
    localStorage.clear();
    setTourKey(prev => prev + 1);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground">
        <GuidedTour
          key={`main-${tourKey}`}
          steps={mainTourSteps}
          options={{
            storageKey: 'mainTour',
            onComplete: () => console.log('Main tour completed!'),
            onSkip: () => console.log('Main tour skipped!'),
          }}
          theme={isDarkMode ? 'dark' : 'light'}
          autoStart={true}
          customTooltip={useCustomTooltip ? <CustomTooltipExample /> : null}
        >
          {/* Header */}
          <motion.header 
            className="bg-primary text-primary-foreground p-6 sticky top-0 z-50"
          >
            <div className="container mx-auto flex justify-between items-center">
              <motion.h1 
                className="text-3xl font-bold"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                React Guided Tour Demo
              </motion.h1>
              <motion.div 
                className="flex items-center gap-4"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Switch
                  checked={useCustomTooltip}
                  onChange={(e) => setUseCustomTooltip(e.target.checked)}
                  size="lg"
                >
                  Custom Tooltip
                </Switch>
                <Switch
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode(e.target.checked)}
                  size="lg"
                >
                  Dark Mode
                </Switch>
                <Button
                  id="start-button"
                  color="secondary"
                  variant="solid"
                  onPress={resetTour}
                >
                  Restart Tours
                </Button>
              </motion.div>
            </div>
          </motion.header>

          {/* Welcome Section */}
          <section id="welcome-section" className="container mx-auto py-12 px-6">
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              style={{ y: parallaxY }}
            >
              <AnimatedSection animation="fadeUp">
                <h2 className="text-4xl font-bold mb-4">Welcome to Interactive Tours</h2>
              </AnimatedSection>
              <AnimatedSection animation="fadeUp" delay={0.2}>
                <p className="text-xl text-default-600">
                  Create engaging user experiences with step-by-step guided tours using React and HeroUI.
                </p>
              </AnimatedSection>
            </motion.div>
          </section>

          {/* Feature Cards */}
          <section id="feature-cards" className="container mx-auto py-8 px-6">
            <AnimatedSection animation="fadeUp">
              <h3 className="text-2xl font-bold mb-6 text-center">Key Features</h3>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatedSection animation="slideRight" delay={0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <h4 className="text-lg font-semibold">Smart Positioning</h4>
                    </CardHeader>
                    <CardBody>
                      <p>Tooltips automatically adjust their position based on available viewport space.</p>
                    </CardBody>
                  </Card>
                </motion.div>
              </AnimatedSection>
              <AnimatedSection animation="fadeUp" delay={0.2}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <h4 className="text-lg font-semibold">Keyboard Navigation</h4>
                    </CardHeader>
                    <CardBody>
                      <p>Use arrow keys to navigate and ESC to exit the tour at any time.</p>
                    </CardBody>
                  </Card>
                </motion.div>
              </AnimatedSection>
              <AnimatedSection animation="slideLeft" delay={0.3}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <h4 className="text-lg font-semibold">Progress Tracking</h4>
                    </CardHeader>
                    <CardBody>
                      <p>Built-in progress indicators and state persistence across sessions.</p>
                    </CardBody>
                  </Card>
                </motion.div>
              </AnimatedSection>
            </div>
          </section>

          {/* Demo Section */}
          <section id="demo-section" className="container mx-auto py-8 px-6">
            <AnimatedSection animation="fadeUp">
              <h3 className="text-2xl font-bold mb-6 text-center">Try Different Tours</h3>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form Tour */}
              <AnimatedSection animation="scale" delay={0.1}>
                <Card>
                <CardHeader>
                  <h4 className="text-lg font-semibold">Form Tour Example</h4>
                </CardHeader>
                <CardBody>
                  <GuidedTour
                    key={`form-${tourKey}`}
                    steps={formTourSteps}
                    options={{
                      storageKey: 'formTour',
                      toggleButtonPosition: 'bottom-left',
                    }}
                    theme={isDarkMode ? 'dark' : 'light'}
                    showToggleButton={true}
                  >
                    <form className="space-y-4">
                      <Input
                        id="form-name"
                        label="Full Name"
                        placeholder="Enter your name"
                        variant="bordered"
                      />
                      <Input
                        id="form-email"
                        label="Email"
                        placeholder="your@email.com"
                        type="email"
                        variant="bordered"
                      />
                      <Textarea
                        id="form-message"
                        label="Message"
                        placeholder="Share your thoughts..."
                        variant="bordered"
                        rows={4}
                      />
                      <Button
                        id="form-submit"
                        color="primary"
                        className="w-full"
                      >
                        Submit Feedback
                      </Button>
                    </form>
                  </GuidedTour>
                </CardBody>
              </Card>
              </AnimatedSection>

              {/* Settings Example */}
              <AnimatedSection animation="scale" delay={0.2}>
                <Card>
                <CardHeader>
                  <h4 className="text-lg font-semibold">Settings Configuration</h4>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <Select
                      label="Language"
                      placeholder="Select a language"
                      variant="bordered"
                    >
                      <SelectItem key="en">English</SelectItem>
                      <SelectItem key="es">Spanish</SelectItem>
                      <SelectItem key="fr">French</SelectItem>
                    </Select>
                    <Select
                      label="Theme"
                      placeholder="Select theme"
                      variant="bordered"
                    >
                      <SelectItem key="light">Light</SelectItem>
                      <SelectItem key="dark">Dark</SelectItem>
                      <SelectItem key="auto">Auto</SelectItem>
                    </Select>
                    <div className="space-y-2">
                      <Switch size="sm">Email notifications</Switch>
                      <Switch size="sm">Push notifications</Switch>
                      <Switch size="sm">Marketing emails</Switch>
                    </div>
                  </div>
                </CardBody>
              </Card>
              </AnimatedSection>
            </div>
          </section>

          {/* Code Example */}
          <section id="code-example" className="container mx-auto py-8 px-6">
            <AnimatedSection animation="fadeUp">
              <h3 className="text-2xl font-bold mb-6 text-center">Quick Start</h3>
            </AnimatedSection>
            <AnimatedSection animation="rotate" delay={0.2}>
              <Card className="max-w-4xl mx-auto">
              <CardBody>
                <pre className="bg-default-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`import { GuidedTour } from './components';

const steps = [
  {
    selector: '#step1',
    title: 'First Step',
    content: 'This is your first tour step!'
  },
  // Add more steps...
];

function App() {
  return (
    <GuidedTour steps={steps} autoStart={true}>
      <YourApp />
    </GuidedTour>
  );
}`}</code>
                </pre>
              </CardBody>
            </Card>
            </AnimatedSection>
          </section>

          {/* Footer */}
          <footer className="bg-default-100 mt-12 py-6">
            <div className="container mx-auto text-center">
              <p className="text-default-600">
                Built with React, HeroUI, and Framer Motion
              </p>
            </div>
          </footer>
        </GuidedTour>
      </div>
    </div>
  );
}

export default App;