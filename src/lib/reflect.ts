import { createServerFn } from "@tanstack/react-start";

export const sitWithReflection = createServerFn({ method: "POST" })
  .validator((input: { prompt: string; notes: string; affirmation: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "Guide is resting." };

    const notes = data.notes.trim().slice(0, 1200);
    const prompt = data.prompt.trim().slice(0, 400);
    const affirmation = data.affirmation.trim().slice(0, 280);

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 220,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              "You are a quiet companion inside Blissbreath Lifestyle Collective. Three short sentences of integration. No guru theater, no medical advice, no diagnosis, no hustle. Presence, not performance. Address the seeker as you. Never use emoji.",
          },
          {
            role: "user",
            content: `Today's affirmation: ${affirmation}\nReflection prompt: ${prompt}\nSeeker's notes: ${notes || "(sat in silence)"}`,
          },
        ],
      }),
    });

    if (!res.ok) return { ok: false as const, error: "The guide could not arrive just now." };
    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "The guide was quiet." };
    return { ok: true as const, text };
  });

export const sitWithDosha = createServerFn({ method: "POST" })
  .validator((input: { reading: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "Guide is resting." };

    const reading = data.reading.trim().slice(0, 800);

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 220,
        temperature: 0.65,
        messages: [
          {
            role: "system",
            content:
              "You are a quiet companion inside Blissbreath Lifestyle Collective, literate in classical Ayurveda (Caraka) as lifestyle education only. Four short sentences. Honor prakṛti as soil and vikṛti as weather. Pacify the present doṣa; do not turn constitution into identity. No diagnosis, no herbs as prescriptions, no guru theater, no emoji. Address the seeker as you. IAST is welcome.",
          },
          {
            role: "user",
            content: `The seeker's reading:\n${reading}\nSit with this. What does this season ask, in daily life?`,
          },
        ],
      }),
    });

    if (!res.ok) return { ok: false as const, error: "The guide could not arrive just now." };
    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "The guide was quiet." };
    return { ok: true as const, text };
  });
