---
name: hume
description: Documentation and usage guide for hume/react package that exports react component handling streaming, microphone and rendering of user messages
---

You are an expert at prototyping and modifying voice interfaces built with `@humeai/voice-react`.

Your primary responsibility is helping developers safely and quickly modify Hume EVI-powered React applications.

Focus on:

* preserving working audio behavior
* maintaining VoiceProvider state integrity
* minimizing websocket lifecycle bugs
* preventing browser audio permission regressions
* keeping low-latency conversational UX intact

---

# Core Library

The app uses:

```ts
import { VoiceProvider, useVoice } from '@humeai/voice-react';
```

The SDK provides:

* WebSocket lifecycle management
* microphone handling
* assistant audio playback
* message history
* interruption handling
* FFT visualization hooks
* tool call routing

This library is browser-only and is NOT React Native compatible.

---

# Important Constraints

## AudioContext Rule

`connect()` MUST only be called from a direct user gesture.

Correct:

```tsx
<button onClick={() => connect(...)}>
```

Incorrect:

```tsx
useEffect(() => {
  connect();
}, []);
```

Never introduce automatic connection logic on mount.

---

# Preferred Architecture

## Global Provider

Always place a single `VoiceProvider` high in the app tree.

Preferred:

```tsx
<VoiceProvider>
  <App />
</VoiceProvider>
```

Avoid nested providers unless explicitly required.

---

# Preferred State Usage

Prefer granular hooks for high-frequency updates.

Use:

* `useMicFft()`
* `usePlayerFft()`
* `useCallDurationTimestamp()`

Avoid causing rerenders through `useVoice()` for FFT visualizations.

---

# Safe Patterns

## Start Call

```tsx
const { connect } = useVoice();

const start = async () => {
  await connect({
    auth: {
      type: 'accessToken',
      value: accessToken,
    },
    configId,
  });
};
```

## End Call

```tsx
const { disconnect } = useVoice();

<button onClick={disconnect}>
  End Call
</button>
```

---

# Voice UX Guidelines

## Interruptions

Users should be able to interrupt the assistant naturally.

Do NOT:

* disable microphone while assistant speaks
* block interruption events
* aggressively debounce transcript updates

Use:

* `onInterruption`
* `pauseAssistant`
* `resumeAssistant`

---

# Audio Recommendations

Default:

```tsx
enableAudioWorklet={true}
```

Safari 17 may perform better with:

```tsx
enableAudioWorklet={false}
```

Do not remove AudioWorklet support globally without browser detection.

---

# Message Handling

Use `onMessage` for:

* analytics
* transcript streaming
* interim transcript handling
* debugging

Example:

```tsx
<VoiceProvider
  onMessage={(msg) => {
    console.log(msg);
  }}
>
```

Avoid storing duplicate transcript history outside the SDK unless necessary.

---

# Tool Call Handling

Custom tool execution belongs in `onToolCall`.

Example:

```tsx
<VoiceProvider
  onToolCall={async (toolCall) => {
    if (toolCall.name === 'weather') {
      return JSON.stringify({
        temperature: 72,
      });
    }

    return 'unsupported tool';
  }}
>
```

Prefer deterministic and fast tool responses.

Long-running tools should:

* stream progress externally
* avoid blocking conversational flow

---

# Error Handling

Always surface:

* microphone permission failures
* websocket failures
* playback failures

Preferred checks:

```tsx
if (isMicrophoneError) { ... }
if (isSocketError) { ... }
if (isAudioError) { ... }
```

Avoid generic "Something went wrong" UI.

---

# Device Selection

When adding audio device selection:

Use:

```ts
devices: {
  microphoneDeviceId,
  speakerDeviceId,
}
```

Do not hardcode device IDs.

Always handle:

* disconnected devices
* revoked permissions
* unavailable outputs

---

# Recommended UI States

Model these states explicitly:

* disconnected
* connecting
* connected
* muted
* assistant speaking
* paused
* error

Use:

```tsx
status
readyState
isPlaying
isMuted
isPaused
```

---

# Performance Guidance

Avoid:

* rerendering transcript trees on every FFT update
* large message arrays without virtualization
* reconnect loops on transient failures

Prefer:

* memoized transcript items
* granular hooks
* bounded transcript history

Use:

```tsx
messageHistoryLimit={100}
```

---

# Common Safe Refactors

## Add Push-To-Talk

Use:

* `mute()`
* `unmute()`

Avoid reconnecting websocket sessions.

---

## Add Volume Slider

Use:

```tsx
setVolume(level);
```

Clamp values between:

* `0.0`
* `1.0`

---

## Add Live Transcript

Use:

```tsx
messages
lastVoiceMessage
lastUserMessage
```

---

## Add Assistant Pause

Use:

```tsx
pauseAssistant();
resumeAssistant();
```

Do NOT disconnect the session.

---

# Browser Compatibility Notes

Best support:

* Chrome
* Edge
* modern Firefox

Safari caveats:

* AudioWorklet degradation on Safari 17
* autoplay/audio activation restrictions
* stricter microphone permission timing

---

# Anti-Patterns

Never:

* call `connect()` automatically
* recreate VoiceProvider during calls
* reconnect websocket on every render
* store FFT arrays in React state manually
* block the main thread during tool calls
* mutate transcript arrays in place

---

# When Modifying Existing Components

Preserve:

* existing websocket lifecycle
* existing interruption behavior
* existing mute semantics
* existing session settings
* existing auth strategy

Before changing architecture:

1. identify where `VoiceProvider` is mounted
2. identify how `connect()` is triggered
3. identify where tool calls are handled
4. identify whether FFT hooks are already in use
5. preserve audio permission flow

---

# Preferred Refactor Style

Prefer incremental changes over rewrites.

Good:

* isolated hooks
* additive UI controls
* composable subcomponents

Avoid:

* replacing provider architecture
* moving connection ownership unnecessarily
* introducing custom websocket layers

---

# Example Production Structure

```tsx
<VoiceProvider
  onMessage={handleMessage}
  onToolCall={handleTool}
  onAudioStart={handleAudioStart}
  onAudioEnd={handleAudioEnd}
  onClose={handleClose}
  enableAudioWorklet
>
  <VoicePage />
</VoiceProvider>
```

---

# If Asked To Prototype Features

Prefer implementing:

* captions
* waveform visualizers
* push-to-talk
* mute toggles
* interruption indicators
* conversation history
* device selectors
* assistant pause/resume
* latency indicators

Avoid introducing:

* custom media pipelines
* alternative websocket stacks
* server-side audio mixing
* unnecessary audio transcoding

---

# Goal

When editing Hume voice applications:

* preserve conversational responsiveness
* preserve browser audio correctness
* minimize reconnection bugs
* keep UX interruption-friendly
* make minimal reliable changes
* optimize for rapid prototyping

```
```
