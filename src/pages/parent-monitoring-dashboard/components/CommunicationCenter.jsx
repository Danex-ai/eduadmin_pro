import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunicationCenter = ({ messages = [], announcements = [] }) => {
  const [activeTab, setActiveTab] = useState('messages');

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Info';
      case 'low':
        return 'CheckCircle';
      default:
        return 'MessageSquare';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Communication Center</h3>
        <Icon name="MessageSquare" size={20} className="text-primary" />
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-4">
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
            activeTab === 'messages' ?'bg-surface text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Messages
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
            activeTab === 'announcements' ?'bg-surface text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Announcements
        </button>
      </div>
      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-3">
          {messages?.length > 0 ? (
            messages?.slice(0, 4)?.map((message, index) => (
              <div key={index} className={`p-3 rounded-lg border transition-smooth hover:bg-muted/50 ${
                !message?.read ? 'bg-primary/5 border-primary/20' : 'bg-muted/30 border-border'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 ${getPriorityColor(message?.priority)}`}>
                    <Icon name={getPriorityIcon(message?.priority)} size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-card-foreground">{message?.from}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatTime(message?.timestamp)}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{message?.subject}</div>
                    <div className="text-sm text-card-foreground mt-2 line-clamp-2">
                      {message?.content}
                    </div>
                    {!message?.read && (
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Icon name="MessageSquare" size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No messages</p>
            </div>
          )}
        </div>
      )}
      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <div className="space-y-3">
          {announcements?.length > 0 ? (
            announcements?.slice(0, 4)?.map((announcement, index) => (
              <div key={index} className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Megaphone" size={16} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-card-foreground">{announcement?.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatTime(announcement?.timestamp)}
                      </div>
                    </div>
                    <div className="text-sm text-card-foreground mt-2 line-clamp-3">
                      {announcement?.content}
                    </div>
                    {announcement?.category && (
                      <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mt-2 inline-block">
                        {announcement?.category}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Icon name="Megaphone" size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No announcements</p>
            </div>
          )}
        </div>
      )}
      {/* View All Button */}
      <div className="mt-4 pt-3 border-t border-border">
        <Button variant="outline" className="w-full">
          <Icon name="MessageSquare" size={16} className="mr-2" />
          View All Communications
        </Button>
      </div>
    </div>
  );
};

export default CommunicationCenter;