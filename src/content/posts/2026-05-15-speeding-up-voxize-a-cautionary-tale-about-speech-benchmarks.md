---
title: "Speeding Up Voxize: A Cautionary Tale About Speech Benchmarks"
date: 2026-05-15
---

I spend an unreasonable amount of time typing instructions to AI agents. A few months ago, I decided to streamline this process and built my own dictation system called [Voxize][voxize]. I have it bound to <kbd>Super + S</kbd> on my [NixOS machine][nix-meridian]. I press the hotkey to launch the overlay, talk into the microphone and let the software do the heavy lifting.

<img src="https://media.githubusercontent.com/media/Flemma-Dev/voxize/main/assets/dictation-recording.png" alt="" width="450" height="176" alt="Voxize app preview">

It has performed exceptionally well, especially around dense technical subjects. But the architecture has a frustrating bottleneck. It currently uses a three-phase pipeline:

1. **Live Preview:** A throwaway WebSocket stream via OpenAI's `gpt-4o-mini-transcribe` [($0.003/min)][openai-pricing] that gives me visual feedback while I speak.
2. **Batch:** Once I am done speaking and stop the recording, the full WAV file is sent to `gpt-4o-transcribe` ($0.006/min) for the authoritative transcript.
3. **Cleanup:** A fast LLM pass via `gpt-5.4-nano` to fix formatting and apply custom vocabulary rules.

This works brilliantly for accuracy, but that batch phase introduces a multi-second (usually 3-4s) latency after I stop speaking before the final text appears. I got frustrated with this delay and wanted to see if I could optimise the pipeline. The dream was to replace the first two phases with a single, highly accurate streaming model and eliminate the batch delay entirely.

### Enter ElevenLabs Scribe v2

I did some research and found the [Artificial Analysis AA-WER v2.0 benchmark][aa-wer]. It ranked ElevenLabs' new Scribe v2 model at #1 across 49 different models with a staggering 2.3% Word Error Rate (WER) — nearly twice as accurate as OpenAI's batch model.

At $0.0065/min, Scribe v2 was more expensive than my live preview, but cheaper than running both the preview and the batch phases combined. Faster, cheaper and supposedly more accurate. It sounded perfect.

Before diving headfirst into a massive refactor of the Voxize codebase, I decided to do a spike test.

### Wiring up a quick test

Fortunately, ElevenLabs exposes a WebSocket API for real-time transcription that accepts the exact same 24kHz raw PCM audio that Voxize already captures via PipeWire.

> [!NOTE]
> If you are setting up an ElevenLabs API key for the first time, watch out for the billing UI. It asks you to set a 'Usage Limits' value. This is not dollars, it's credits. Setting a limit of 50 credits (thinking it means $50) is actually about two cents and will immediately throttle your API calls.

I wrote a quick Python harness to stream audio to `wss://api.elevenlabs.io/v1/speech-to-text/realtime` and set up my test environment.

<!--
```shellsession
# Store the API key in GNOME Keyring so we don't hardcode it:
$ secret-tool store --label='ElevenLabs API Key' service elevenlabs key api
# Run the test harness:
$ python spike/elevenlabs_scribe_v2.py --live
```
-->

Initially, I tried burst-sending pre-recorded WAV files from old Voxize sessions into the WebSocket to automate the tests. That failed immediately. Scribe v2 relies heavily on its Voice Activity Detection (VAD) to know when to commit a transcript. If you feed it audio faster than real-time, the VAD sees one unbroken utterance, gets confused and never commits the final text.

To get real numbers, I had to grab the microphone and do a live dictation test.

### The definitive vocabulary test

I put together a ~40-second script packed with domain-specific technical terms extracted from my actual day-to-day Voxize usage. I recorded myself reading it and then ran that exact same script through all three models: Scribe v2, OpenAI's batch model and OpenAI's cheap throwaway preview model (I was consistent in the script delivery to ensure a fair test).

Here is the exact script I read:

> "We have a Next.js app deployed on Vercel with edge functions for the API routes. The backend uses PostgreSQL through Drizzle, not through Supabase directly, because we need complex analytical queries. The data is managed by Payload CMS. On my local NixOS machine, I run the dev server from a tmux session inside Ghostty. Claude helps with the code reviews on GitHub, and Moshi handles the product side. The Voxize overlay captures audio via PipeWire and sends it over a WebSocket to the OpenAI transcription API."

And here is the Scribe v2 output:

> "We have a mixed JS app deployed on with each function API routes. The backend uses PostgreSQL through Drizzle, not through Supabase directly, because we need complex analytical queries. The data is managed by Payload CMS. On my local NixOS machine, I run from a session inside Ghosty. Claude helps with the review on GitHub, and Moshe handles the production side. The VoxSight overlay captures audio via PipeWire and sends it over WebSocket to the OpenAPI transcription API."

If you read closely, you will realise it is completely mangled.

Let's look at the scorecard for the technical terms:

| Term           | Scribe v2 (Realtime) | OpenAI `gpt-4o-transcribe` (Batch) |
| -------------- | -------------------- | ---------------------------------- |
| Next.js        | 'mixed JS'           | **Next.js**                        |
| Vercel         | _dropped entirely_   | **Vercel**                         |
| edge functions | 'each function'      | **Edge Functions**                 |
| dev server     | _dropped entirely_   | **dev server**                     |
| tmux           | _dropped entirely_   | **tmux**                           |
| Voxize         | 'VoxSight'           | 'Voxice'                           |

During my tests, Scribe v2 had **dismal accuracy**. It dropped words completely and confidently hallucinated the rest.

Meanwhile, OpenAI's batch model scored way better. Even more surprising, OpenAI's cheapest throwaway live preview model (the one that costs half the price of Scribe v2) scored nearly as well as the batch model — miles ahead of Scribe v2.

### Phonetics over Context

Why did the #1 model on the benchmark fail so catastrophically for my specific use case?

My working hypothesis is that it comes down to acoustic mapping versus prior knowledge. If you look at the AA-WER v2.0 methodology, the dataset evaluates models on voice agent interactions, parliamentary proceedings and corporate earnings calls. This means clean audio and standard corporate or political vocabulary. To be clear, Scribe v2 is likely an incredible model for general dictation or customer service routing — exactly what the benchmark tests.

But it seems to me that Scribe v2 acts as a purely acoustic model. It appears brilliant at phonetics, but when it encounters a niche developer term, it guesses based on sounds ('Next.js' becomes 'mixed JS').

OpenAI's models, on the other hand, seem to benefit heavily from their underlying LLM training data. I suspect they possess some form of prior knowledge. When the audio sounds vaguely like 'pipe-wire' in the context of Linux, the model likely infers that 'PipeWire' is a real piece of software and transcribes it perfectly.

I originally assumed that even if Scribe v2 made a few mistakes, my cleanup LLM phase would fix them. This is a fallacy. A cleanup LLM can easily fix a phonetic near-miss like 'Voxice' to 'Voxize' if you provide a vocabulary hint. But when an STT model drops the word 'tmux' entirely, the information is permanently lost. No LLM can hallucinate a dropped word back into existence.

### Conclusion

Benchmarks are not lying to you, but they are absolutely not testing your specific use case.

My spike test proved that the latency of my three-phase pipeline is a necessary evil. Replacing it with a faster model that cannot comprehend technical vocabulary would trade latency for accuracy — the exact wrong trade-off for a developer tool. The current pipeline stays.

Takeaway: Always validate tools against your own messy, real-world data and never blindly trust a leaderboard.

Happy hacking!

[voxize]: https://github.com/Flemma-Dev/voxize
[nix-meridian]: https://github.com/StanAngeloff/nix-meridian
[aa-wer]: https://artificialanalysis.ai/articles/aa-wer-v2
[openai-pricing]: https://developers.openai.com/api/docs/pricing#transcription-and-speech
