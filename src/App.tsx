// File: App.tsx

import React, { useState, useEffect } from 'react';
import {
  Brain, Heart, Sun, MessageSquare, Shield, BookOpen, Menu, X,
  ChevronRight, Send, BarChart3, Clock, BookMarked
} from 'lucide-react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth0 } from '@auth0/auth0-react';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative';
};

type ChatView = 'chat' | 'history' | 'analysis' | 'resources' | 'profile';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ChatView>('chat');
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: "Hi! I'm here to listen and support you. How are you feeling today?",
    isUser: false,
    timestamp: new Date(),
    sentiment: 'neutral'
  }]);
  const [inputMessage, setInputMessage] = useState('');

  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setIsChatOpen(true);
      setCurrentView('chat');
    }
  }, [isAuthenticated]);

  if (isLoading) return <div>Loading...</div>;

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Chat', href: '#chat' },
    { name: 'History', href: '#history' },
    { name: 'Analysis', href: '#analysis' },
    { name: 'Resources', href: '#resources' },
    { name: 'Profile', href: '#profile' }
  ];

  const features = [
    { title: 'AI-Powered Support', description: 'Personalized mental health conversations available 24/7', icon: <MessageSquare className="w-8 h-8 text-indigo-500" /> },
    { title: 'Privacy First', description: 'Your data is encrypted and completely confidential', icon: <Shield className="w-8 h-8 text-indigo-500" /> },
    { title: 'Guided Exercises', description: 'Access to grounding and mindfulness techniques', icon: <Heart className="w-8 h-8 text-indigo-500" /> },
    { title: 'Self-Reflection', description: 'Journal your thoughts and track your progress', icon: <BookOpen className="w-8 h-8 text-indigo-500" /> }
  ];

  const resources = [
    { title: "Understanding Anxiety", description: "Learn about the different types of anxiety and coping strategies.", link: "https://www.nimh.nih.gov/health/topics/anxiety-disorders" },
    { title: "Mindfulness Techniques", description: "Simple mindfulness exercises you can practice daily.", link: "https://www.mindful.org/meditation/mindfulness-getting-started/" },
    { title: "Depression Support", description: "Resources and information about managing depression.", link: "https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Depression" },
    { title: "Stress Management", description: "Effective strategies for managing stress in daily life.", link: "https://www.apa.org/topics/stress/managing-stress" }
  ];

  const analyzeSentiment = (text: string): 'positive' | 'neutral' | 'negative' => {
    const positiveWords = ['happy', 'good', 'great', 'better', 'positive', 'hopeful'];
    const negativeWords = ['sad', 'bad', 'worse', 'negative', 'anxious', 'depressed'];
    const words = text.toLowerCase().split(' ');
    let score = 0;
    words.forEach(word => {
      if (positiveWords.includes(word)) score++;
      if (negativeWords.includes(word)) score--;
    });
    return score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
      sentiment: analyzeSentiment(inputMessage)
    };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setTimeout(() => {
      const responses = [
        "I understand how you're feeling. Would you like to talk more about it?",
        "That sounds challenging. How can I help you process these emotions?",
        "You're not alone in feeling this way. Let's work through this together.",
        "Thank you for sharing. What support would be most helpful right now?",
      ];
      const randomResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
        sentiment: 'neutral'
      };
      setMessages(prev => [...prev, randomResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSentimentData = () => {
    const userMessages = messages.filter(m => m.isUser);
    return [
      { name: 'Positive', value: userMessages.filter(m => m.sentiment === 'positive').length },
      { name: 'Neutral', value: userMessages.filter(m => m.sentiment === 'neutral').length },
      { name: 'Negative', value: userMessages.filter(m => m.sentiment === 'negative').length },
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-blue-50 to-pink-50">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-indigo-500" />
              <span className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                NeuroBridge
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-indigo-500 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    if (['Chat', 'History', 'Analysis', 'Resources', 'Profile'].includes(link.name)) {
                      setIsChatOpen(true);
                      setCurrentView(link.name.toLowerCase() as ChatView);
                    } else if (link.name === 'Home') {
                      setIsChatOpen(false);
                    }
                  }}
                >
                  {link.name}
                </a>
              ))}
              {!isAuthenticated ? (
                <button
                  onClick={() => loginWithRedirect()}
                  className="text-indigo-500 hover:underline"
                >
                  Log In
                </button>
              ) : (
                <>
                  <span className="text-gray-600 text-sm">Hi, {user?.name}</span>
                  <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className="text-red-500 hover:underline"
                  >
                    Log Out
                  </button>
                </>
              )}
            </div>
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section for Home */}
      {!isChatOpen && (
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Your Mind's Best Companion
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Experience personalized therapy and support through AI-powered conversations.
            </p>
            <button
              onClick={() => {
                setIsChatOpen(true);
                setCurrentView('chat');
              }}
              className="px-6 py-3 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition-all"
            >
              Check Your Mood
            </button>
          </div>
        </section>
      )}

      {/* Views for Chat, History, etc. */}
      {isChatOpen && (
        <div className="p-4">
          {currentView === 'chat' && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl ${message.isUser ? 'bg-indigo-500 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                      <div>{message.text}</div>
                      <div className="text-xs mt-1 opacity-70">{format(message.timestamp, 'HH:mm')}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 resize-none border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={2}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}

          {currentView === 'history' && (
            <div className="flex-1 overflow-y-auto p-4">
              <h2 className="text-xl font-semibold mb-4">Chat History</h2>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="bg-white p-3 rounded-lg shadow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{message.isUser ? 'You' : 'NeuroBridge'}</span>
                      <span className="text-sm text-gray-500">{format(message.timestamp, 'MMM d, yyyy HH:mm')}</span>
                    </div>
                    <p className="text-gray-700">{message.text}</p>
                    {message.sentiment && (
                      <span className={`text-sm ${
                        message.sentiment === 'positive' ? 'text-green-500' :
                        message.sentiment === 'negative' ? 'text-red-500' :
                        'text-gray-500'
                      }`}>
                        Sentiment: {message.sentiment}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'analysis' && (
            <div className="flex-1 overflow-y-auto p-4">
              <h2 className="text-xl font-semibold mb-4">Conversation Analysis</h2>
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="text-lg font-medium mb-4">Sentiment Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getSentimentData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Session Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-500">{messages.filter(m => m.isUser).length}</div>
                    <div className="text-gray-600">Messages Sent</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-500">{messages.filter(m => !m.isUser).length}</div>
                    <div className="text-gray-600">Responses Received</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-500">{format(new Date(messages[messages.length - 1].timestamp), 'MMM d')}</div>
                    <div className="text-gray-600">Last Activity</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'resources' && (
            <div className="flex-1 overflow-y-auto p-4">
              <h2 className="text-xl font-semibold mb-4">Helpful Resources</h2>
              <div className="grid gap-4">
                {resources.map((resource, index) => (
                  <a key={index} href={resource.link} target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-medium text-indigo-600 mb-2">{resource.title}</h3>
                    <p className="text-gray-600">{resource.description}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {currentView === 'profile' && isAuthenticated && user && (
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-6">My Profile</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
                  <img src={user.picture} alt={user.name} className="w-28 h-28 rounded-full border-4 border-indigo-500 mb-4" />
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-400 mt-2">Logged in via Auth0</p>
                  <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all">
                    Update Info
                  </button>
                </div>
                <div className="bg-white rounded-xl p-6 shadow space-y-4">
                  <h4 className="text-lg font-semibold mb-2">Account Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-gray-600">Messages Sent</span><span className="font-semibold">{messages.filter(m => m.isUser).length}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">AI Responses</span><span className="font-semibold">{messages.filter(m => !m.isUser).length}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Session Active</span><span className="font-semibold">{format(new Date(), 'MMM dd, yyyy')}</span></div>
                  </div>
                  <div className="mt-4 flex gap-4">
                    <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Deactivate</button>
                    <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Activate</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Brain className="w-6 h-6 text-indigo-500" />
              <span className="text-lg font-semibold">NeuroBridge</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#privacy" className="hover:text-indigo-500 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-indigo-500 transition-colors">Terms of Service</a>
              <a href="#contact" className="hover:text-indigo-500 transition-colors">Contact</a>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-500">
              © 2024 NeuroBridge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
