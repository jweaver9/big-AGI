import * as React from 'react';
import { shallow } from 'zustand/shallow';
import { keyframes } from '@emotion/react';


import { Box, List, Typography } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';

import type { DiagramConfig } from '~/modules/aifn/digrams/DiagramsModal';

import type { ConversationHandler } from '~/common/chats/ConversationHandler';
import { InlineError } from '~/common/components/InlineError';
import { PreferencesTab, useOptimaLayout } from '~/common/layout/optima/useOptimaLayout';
import { ShortcutKeyName, useGlobalShortcut } from '~/common/components/useGlobalShortcut';
import { createDMessage, DConversationId, DMessage, getConversation, useChatStore } from '~/common/state/store-chats';
import { useBrowserTranslationWarning } from '~/common/components/useIsBrowserTranslating';
import { useCapabilityElevenLabs } from '~/common/components/useCapabilities';
import { useEphemerals } from '~/common/chats/EphemeralsStore';

import { ChatMessage, ChatMessageMemo } from './message/ChatMessage';
import { CleanerMessage, MessagesSelectionHeader } from './message/CleanerMessage';
import { Ephemerals } from './Ephemerals';
import { PersonaSelector } from './persona-selector/PersonaSelector';
import { useChatShowSystemMessages } from '../store-app-chat';
import { useScrollToBottom } from './scroll-to-bottom/useScrollToBottom';

export const fadeInKeyframes = keyframes`
from { opacity: 0; transform: translateY(-20px); }
to { opacity: 1; transform: translateY(0); }
`;

export const fadeOutKeyframes = keyframes`
from { opacity: 1; transform: translateY(0); }
to { opacity: 0; transform: translateY(20px); }
`;

export function ChatMessageList(props: {
  conversationId: DConversationId | null,
  conversationHandler: ConversationHandler | null,
  capabilityHasT2I: boolean,
  chatLLMContextTokens: number | null,
  fitScreen: boolean,
  isMessageSelectionMode: boolean, 
  onConversationBranch: (conversationId: DConversationId, messageId: string) => void,
  onConversationExecuteHistory: (conversationId: DConversationId, history: DMessage[], chatEffectBeam: boolean) => Promise<void>,
  onTextDiagram: (diagramConfig: DiagramConfig | null) => void,
  onTextImagine: (conversationId: DConversationId, selectedText: string) => Promise<void>,
  onTextSpeak: (selectedText: string) => Promise<void>,
  setIsMessageSelectionMode: (isMessageSelectionMode: boolean) => void,
  sx?: SxProps,
}) {
  const [isImagining, setIsImagining] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [selectedMessages, setSelectedMessages] = React.useState<Set<string>>(new Set());
  const { notifyBooting } = useScrollToBottom();
  const { openPreferencesTab } = useOptimaLayout();
  const [showSystemMessages] = useChatShowSystemMessages();
  const optionalTranslationWarning = useBrowserTranslationWarning();
  const { conversationMessages, historyTokenCount, editMessage, deleteMessage, setMessages } = useChatStore(state => {
    const conversation = state.conversations.find(conversation => conversation.id === props.conversationId);
    return {
      conversationMessages: conversation ? conversation.messages : [],
      historyTokenCount: conversation ? conversation.tokenCount : 0,
      deleteMessage: state.deleteMessage,
      editMessage: state.editMessage,
      setMessages: state.setMessages,
    };
  }, shallow);
  const ephemerals = useEphemerals(props.conversationHandler);
  const { mayWork: isSpeakable } = useCapabilityElevenLabs();

  const { conversationId, capabilityHasT2I, onConversationBranch, onConversationExecuteHistory, onTextDiagram, onTextImagine, onTextSpeak } = props;

  const handleRunExample = React.useCallback(async (text: string) => {
    conversationId && await onConversationExecuteHistory(conversationId, [...conversationMessages, createDMessage('user', text)], false);
  }, [conversationId, conversationMessages, onConversationExecuteHistory]);

  const handleConversationBranch = React.useCallback((messageId: string) => {
    conversationId && onConversationBranch(conversationId, messageId);
  }, [conversationId, onConversationBranch]);

  const handleConversationRestartFrom = React.useCallback(async (messageId: string, offset: number, chatEffectBeam: boolean) => {
    const messages = getConversation(conversationId)?.messages;
    if (messages) {
      const truncatedHistory = messages.slice(0, messages.findIndex(m => m.id === messageId) + offset + 1);
      conversationId && await onConversationExecuteHistory(conversationId, truncatedHistory, chatEffectBeam);
    }
  }, [conversationId, onConversationExecuteHistory]);

  const handleConversationTruncate = React.useCallback((messageId: string) => {
    const messages = getConversation(conversationId)?.messages;
    if (conversationId && messages) {
      const truncatedHistory = messages.slice(0, messages.findIndex(m => m.id === messageId) + 1);
      setMessages(conversationId, truncatedHistory);
    }
  }, [conversationId, setMessages]);

  const handleMessageDelete = React.useCallback((messageId: string) => {
    conversationId && deleteMessage(conversationId, messageId);
  }, [conversationId, deleteMessage]);

  const handleMessageEdit = React.useCallback((messageId: string, newText: string) => {
    conversationId && editMessage(conversationId, messageId, { text: newText }, true);
  }, [conversationId, editMessage]);

  const handleTextDiagram = React.useCallback(async (messageId: string, text: string) => {
    conversationId && onTextDiagram({ conversationId: conversationId, messageId, text });
  }, [conversationId, onTextDiagram]);

  const handleTextImagine = React.useCallback(async (text: string) => {
    if (!capabilityHasT2I)
      return openPreferencesTab(PreferencesTab.Draw);
    if (conversationId) {
      setIsImagining(true);
      await onTextImagine(conversationId, text);
      setIsImagining(false);
    }
  }, [capabilityHasT2I, conversationId, onTextImagine, openPreferencesTab]);

  const handleTextSpeak = React.useCallback(async (text: string) => {
    if (!isSpeakable)
      return openPreferencesTab(PreferencesTab.Voice);
    setIsSpeaking(true);
    await onTextSpeak(text);
    setIsSpeaking(false);
  }, [isSpeakable, onTextSpeak, openPreferencesTab]);

  const handleSelectAll = (selected: boolean) => {
    const newSelected = new Set<string>();
    if (selected)
      for (const message of conversationMessages)
        newSelected.add(message.id);
    setSelectedMessages(newSelected);
  };

  const handleSelectMessage = (messageId: string, selected: boolean) => {
    const newSelected = new Set(selectedMessages);
    selected ? newSelected.add(messageId) : newSelected.delete(messageId);
    setSelectedMessages(newSelected);
  };

  const handleSelectionDelete = () => {
    if (conversationId)
      for (const selectedMessage of selectedMessages)
        deleteMessage(conversationId, selectedMessage);
    setSelectedMessages(new Set());
  };

  useGlobalShortcut(props.isMessageSelectionMode && ShortcutKeyName.Esc, false, false, false, () => {
    props.setIsMessageSelectionMode(false);
  });

  const { diffTargetMessage, diffPrevText } = React.useMemo(() => {
    const [msgB, msgA] = conversationMessages.filter(m => m.role === 'assistant').reverse();
    if (msgB?.text && msgA?.text && !msgB?.typing) {
      const textA = msgA.text, textB = msgB.text;
      const lenA = textA.length, lenB = textB.length;
      if (lenA > 80 && lenB > 80 && lenA > lenB / 3 && lenB > lenA / 3)
        return { diffTargetMessage: msgB, diffPrevText: textA };
    }
    return { diffTargetMessage: undefined, diffPrevText: undefined };
  }, [conversationMessages]);

  React.useEffect(() => {
    if (conversationId)
      notifyBooting();
  }, [conversationId, notifyBooting]);


  const filteredMessages = conversationMessages
    .filter(m => m.role !== 'system' || showSystemMessages);
    

    const WelcomeModule = () => (
      <Box
        className="welcome-module"
        sx={{
          textAlign: 'center',
          transition: 'opacity 2s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%', // Set the height to take full container height
          // Remove the blue by setting the color you want, or use theme color
          backgroundColor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Typography
          component="h1"
          level="h4" // Adjust the level to control the size
          sx={{
            fontSize: '2rem', // Adjust the font size as needed
            fontWeight: 'bold',
            mb: 2, // Margin bottom for spacing
          }}
        >
          Welcome.
        </Typography>
        <Typography
          className="welcome-message"
          sx={{
            // Additional styles for the subheading
            fontSize: '1.5rem', // Adjust the font size as needed
            animation: 'fadeInOut 3s infinite',
          }}
        >
          What would you like to talk about today?
        </Typography>
      </Box>
    );

    
    // Keyframes for fadeInOut animation
    const fadeInOut = keyframes`
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    `;
    
    // Inject the keyframes animation into your emotion cache or global styles
    // This depends on how you've set up emotion or your global CSS.

      {optionalTranslationWarning}

      {props.isMessageSelectionMode && (
        <MessagesSelectionHeader
          hasSelected={selectedMessages.size > 0}
          sumTokens={historyTokenCount}
          onClose={() => props.setIsMessageSelectionMode(false)}
          onSelectAll={handleSelectAll}
          onDeleteMessages={handleSelectionDelete}
        />
      )}

      {filteredMessages.map((message, idx, { length: count }) => {
          const ChatMessageMemoOrNot = message.typing ? ChatMessage : ChatMessageMemo;

          return props.isMessageSelectionMode ? (
            <CleanerMessage
              key={'sel-' + message.id}
              message={message}
              remainingTokens={props.chatLLMContextTokens ? (props.chatLLMContextTokens - historyTokenCount) : undefined}
              selected={selectedMessages.has(message.id)} onToggleSelected={handleSelectMessage}
            />
          ) : (
            <ChatMessageMemoOrNot
              key={'msg-' + message.id}
              message={message}
              diffPreviousText={message === diffTargetMessage ? diffPrevText : undefined}
              fitScreen={props.fitScreen}
              isBottom={idx === count - 1}
              isImagining={isImagining}
              isSpeaking={isSpeaking}
              onConversationBranch={handleConversationBranch}
              onConversationRestartFrom={handleConversationRestartFrom}
              onConversationTruncate={handleConversationTruncate}
              onMessageDelete={handleMessageDelete}
              onMessageEdit={handleMessageEdit}
              onTextDiagram={handleTextDiagram}
              onTextImagine={handleTextImagine}
              onTextSpeak={handleTextSpeak}
            />
          );
        },
      )}

      return (
        <List sx={{ /* styling for the list */ }}>
          {/* mapping messages to components, etc. */}
    
          {ephemerals.length > 0 && (
            <Ephemerals
              ephemerals={ephemerals}
              conversationId={props.conversationId}
              sx={{
                mt: 'auto',
                overflowY: 'auto',
                minHeight: '64px',
              }}
            />
          )}
        </List>
      ); // Close the return statement
    } // Close the function