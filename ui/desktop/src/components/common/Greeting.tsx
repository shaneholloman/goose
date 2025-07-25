import { useState } from 'react';
import { useTextAnimator } from '../../hooks/use-text-animator';

interface GreetingProps {
  className?: string;
  forceRefresh?: boolean;
}

export function Greeting({
  className = 'mt-1 text-4xl font-light animate-in fade-in duration-300',
  forceRefresh = false,
}: GreetingProps) {
  const prefixes = ['Hello!'];
  const messages = [
    ' Ready to get started?',
    ' What would you like to work on?',
    ' Ready to build something amazing?',
    ' What would you like to explore?',
    " What's on your mind?",
    ' What shall we create today?',
    ' What project needs attention?',
    ' What would you like to tackle?',
    ' What would you like to explore?',
    ' What needs to be done?',
    " What's the plan for today?",
    ' Ready to create something great?',
    ' What can be built today?',
    " What's the next challenge?",
    ' What progress can be made?',
    ' What would you like to accomplish?',
    ' What task awaits?',
    " What's the mission today?",
    ' What can be achieved?',
    ' What project is ready to begin?',
  ];

  // Using lazy initializer to generate random greeting on each component instance
  const greeting = useState(() => {
    const randomPrefixIndex = Math.floor(Math.random() * prefixes.length);
    const randomMessageIndex = Math.floor(Math.random() * messages.length);

    return {
      prefix: prefixes[randomPrefixIndex],
      message: messages[randomMessageIndex],
    };
  })[0];

  const messageRef = useTextAnimator({ text: greeting.message });

  return (
    <h1 className={className} key={forceRefresh ? Date.now() : undefined}>
      {/* <span>{greeting.prefix}</span> */}
      <span ref={messageRef}>{greeting.message}</span>
    </h1>
  );
}
