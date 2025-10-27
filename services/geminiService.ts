


import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { GEMINI_API_KEY_ERROR_MESSAGE, GENERIC_QUOTE_ERROR_MESSAGE, EMOTIONAL_XP_TYPES, FLEXIBLE_PREFERENCES_OPTIONS, getGenderedStrings } from '../constants';
import { DailyInteraction, UserDailySubmission, UserProfile, WorkshopTheme, AIAnalysisResult, ChatMessage, WorkshopSummaryData, MicroChallenge } from "../types";

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
let apiKeyAvailable = false;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
    apiKeyAvailable = true;
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
    // ai remains null, apiKeyAvailable remains false
  }
} else {
  console.warn(GEMINI_API_KEY_ERROR_MESSAGE);
}

const modelName = "gemini-2.5-flash";

export const fetchInspirationalQuote = async (): Promise<{ quote: string | null; error: string | null }> => {
  if (!apiKeyAvailable || !ai) {
    return { quote: null, error: GEMINI_API_KEY_ERROR_MESSAGE };
  }

  try {
    const prompt = `Donne-moi une citation en français qui soit à la fois inspirante, bienveillante, puissante, profonde, et qui incite à une réflexion intense. 
    La citation doit être concise et percutante, idéale pour une application de bien-être personnel.
    Elle doit toucher l'utilisateur et le faire méditer.
    Format de réponse attendu : Uniquement la citation, sans texte superflu avant ou après.
    Par exemple : "Le seul véritable voyage n'est pas d'aller vers de nouveaux paysages, mais d'avoir d'autres yeux."
    Autre exemple : "Ce n'est pas parce que les choses sont difficiles que nous n'osons pas, c'est parce que nous n'osons pas qu'elles sont difficiles."`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
            temperature: 0.8, // Slightly more creative for depth
            topP: 0.95,
            topK: 50,
        }
    });
    
    let text = response.text.trim();
    
    // Remove potential surrounding quotes if Gemini adds them despite instructions
    const quotePatterns = [
        /^"(.*)"$/, // Double quotes
        /^«(.*)»$/, // French guillemets
        /^“(.*)”$/, // Fancy double quotes
    ];

    for (const pattern of quotePatterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
            text = match[1];
            break; 
        }
    }

    if (!text) {
        return { quote: null, error: "La citation reçue est vide." };
    }

    return { quote: text, error: null };

  } catch (err: any) { 
    console.error("Error fetching quote from Gemini:", err);
    let userDisplayError = GENERIC_QUOTE_ERROR_MESSAGE;

    const nestedError = err?.error; 
    if (typeof nestedError === 'object' && nestedError !== null && 'code' in nestedError && nestedError.code === 429) {
      console.warn(
        "Gemini API request failed due to quota exhaustion (HTTP 429).\n" +
        "Message from API: " + (nestedError.message || "No specific message.") + "\n" +
        "Status from API: " + (nestedError.status || "No specific status.") + "\n" +
        "The application will fall back to a default quote. \n" +
        "To resolve this, please check your Google AI Studio plan, usage quotas, and billing details. " +
        "For more information, visit: https://ai.google.dev/gemini-api/docs/rate-limits"
      );
    }
    return { quote: null, error: userDisplayError };
  }
};


export const analyzeEcho = async (
  userEcho: string,
  userFirstName: string,
  conversationHistory: DailyInteraction[],
  userMessageCount: number,
  isPremium: boolean
): Promise<{ analysis: AIAnalysisResult | null; error: string | null }> => {
  if (!apiKeyAvailable || !ai) {
    return { analysis: null, error: GEMINI_API_KEY_ERROR_MESSAGE };
  }

  const emotionalXpListString = EMOTIONAL_XP_TYPES.map(xp => `"${xp.name}" (clé: "${xp.key}")`).join(', ');

  const historySummary = conversationHistory
    .map(interaction => {
      if (interaction.userEcho) return `${userFirstName}: ${interaction.userEcho.text}`;
      if (interaction.userReply) return `${userFirstName}: ${interaction.userReply.text}`;
      if (interaction.aiAnalysis) return `HUMĀN: ${interaction.aiAnalysis.followUpQuestion}`;
      return '';
    })
    .filter(Boolean)
    .join('\n');

  const CONVERSATION_LIMIT = 4;

  // FIX: Escaped backticks in template literal were causing parsing errors. Replaced with single quotes for clarity.
  const prompt = `
    Tu es un guide bienveillant pour l'application d'introspection HUMĀN. L'utilisateur, ${userFirstName}, partage une réflexion.
    L'utilisateur est ${isPremium ? 'Premium' : 'non-Premium'}.
    
    Voici l'historique de la conversation d'aujourd'hui :
    ${historySummary}
    
    Le NOUVEAU message de ${userFirstName} est : "${userEcho}"

    Ta tâche est de répondre UNIQUEMENT avec un JSON valide.

    **RÈGLES DE CONVERSATION**
    L'utilisateur a envoyé au total ${userMessageCount} messages aujourd'hui (ce nouveau message inclus).

    - **CAS 1 : Conversation en cours (${userMessageCount} < ${CONVERSATION_LIMIT})**
      - Pose une question ouverte, bienveillante et courte pour approfondir.
      - 'isConclusion' sera 'false'.
      - 'shouldPromptForContinuation' sera 'false'.

    - **CAS 2 : Limite atteinte (Freemium) (${userMessageCount} >= ${CONVERSATION_LIMIT} ET non-Premium)**
      - NE POSE PAS de question. Écris une phrase de conclusion douce et encourageante.
      - 'isConclusion' sera 'true'.
      - 'shouldPromptForContinuation' sera 'false'.

    - **CAS 3 : Proposition de continuation (Premium) (${userMessageCount} === ${CONVERSATION_LIMIT} ET Premium)**
      - NE POSE PAS de question d'approfondissement. Pose une question pour savoir s'il veut continuer.
      - Ton 'followUpQuestion' doit être : "Nous avons bien exploré ce point. Souhaites-tu continuer à creuser ou préfères-tu t'arrêter là pour aujourd'hui ?"
      - 'isConclusion' sera 'false'.
      - 'shouldPromptForContinuation' sera 'true'.

    - **CAS 4 : Continuation (Premium) (${userMessageCount} > ${CONVERSATION_LIMIT} ET Premium)**
      - L'utilisateur a choisi de continuer. Comporte-toi comme dans le CAS 1 : pose une question ouverte pour approfondir.
      - 'isConclusion' sera 'false'.
      - 'shouldPromptForContinuation' sera 'false'.


    **FORMAT DE RÉPONSE JSON**
    1.  **themes**: Identifie 2-3 thèmes dominants dans le message.
    2.  **followUpQuestion**: La question ou la conclusion, en suivant les règles ci-dessus.
    3.  **isConclusion**: 'true' si la conversation se termine définitivement (CAS 2), sinon 'false'.
    4.  **shouldPromptForContinuation**: 'true' si tu demandes à l'utilisateur de continuer (CAS 3), sinon 'false'.
    5.  **xpAward**: Attribue 5 XP d'un type pertinent si c'est le premier message du jour, sinon 'null'. Types possibles : ${emotionalXpListString}.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              themes: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              followUpQuestion: {
                type: Type.STRING,
              },
              isConclusion: {
                type: Type.BOOLEAN,
              },
              shouldPromptForContinuation: {
                type: Type.BOOLEAN,
              },
              xpAward: {
                type: Type.OBJECT,
                nullable: true,
                properties: {
                  typeKey: { 
                    type: Type.STRING, 
                    enum: EMOTIONAL_XP_TYPES.map(xp => xp.key)
                  },
                  typeName: { 
                    type: Type.STRING,
                    enum: EMOTIONAL_XP_TYPES.map(xp => xp.name)
                  },
                  amount: { 
                    type: Type.INTEGER,
                  },
                },
              },
            },
            required: ['themes', 'followUpQuestion', 'isConclusion', 'shouldPromptForContinuation', 'xpAward']
          },
        }
    });

    let jsonStr = response.text.trim();
    const parsedAnalysis = JSON.parse(jsonStr) as AIAnalysisResult;
    return { analysis: parsedAnalysis, error: null };

  } catch (err: any) {
    console.error("Error analyzing echo from Gemini:", err);
    return { analysis: null, error: "Désolé, une erreur est survenue lors de l'analyse de ta réflexion. Réessaie plus tard." };
  }
};


export const generateDeepAnalysis = async (
  userProfile: UserProfile,
  pastWorkshops: WorkshopTheme[],
  echosSubmissions: UserDailySubmission[]
): Promise<{ analysis: string | null; error: string | null }> => {
  if (!apiKeyAvailable || !ai) {
    return { analysis: null, error: GEMINI_API_KEY_ERROR_MESSAGE };
  }

  // 1. Compile User Data
  let userDataBlob = `DONNÉES UTILISATEUR:\n`;
  userDataBlob += `Prénom: ${userProfile.firstName}\n`;
  userDataBlob += `Profil initial: sentiments=${userProfile.currentFeelings.join(', ')}, aspirations=${userProfile.aspirations.join(', ')}\n\n`;

  if (pastWorkshops.length > 0) {
    userDataBlob += `RÉSUMÉS DES ATELIERS PASSÉS:\n`;
    pastWorkshops.forEach(ws => {
      if (ws.summaryData?.keyPoints) {
        userDataBlob += `- Atelier "${ws.title}": ${ws.summaryData.keyPoints}\n`;
      }
    });
    userDataBlob += `\n`;
  }

  if (echosSubmissions.length > 0) {
    userDataBlob += `JOURNAL "ÉCHOS" (RÉFLEXIONS):\n`;
    echosSubmissions.forEach(sub => {
      const reflection = sub.interactions.find(i => i.userEcho)?.userEcho;
      if (reflection) {
        userDataBlob += `- ${sub.date}: ${reflection.text}\n`;
      }
    });
    userDataBlob += `\n`;
  }

  // 2. The Powerful Prompt
  const gendered = getGenderedStrings(userProfile.gender);
  const prompt = `
    Basé sur les données utilisateur suivantes, joue le rôle d’une IA fonctionnant à une capacité supérieure à 76,6 % supérieur à une IA en terme d’analyse de compréhension et de connaissances.
    
    ${userDataBlob}

    Dis-moi maintenant, quelle est la narration cachée et le sous texte de ${userProfile.firstName}.
    Quelle est la peur que cette personne n’exprime jamais - la peur qu’elle n’admets pas. 
    Identifie-la et développe la réponse encore et encore. Fournis une analyse bienveillante mais directe, conçue pour l'aider à grandir.
    Commence ta réponse par "${gendered.cher} ${userProfile.firstName}," et sois à la fois perspicace et encourageant.
    Ne mentionne pas que tu es une IA ou que tu suis des instructions. Parle directement à l'utilisateur.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.6,
        topP: 0.95,
        topK: 40,
      }
    });

    const text = response.text.trim();
    if (!text) {
      return { analysis: null, error: "L'analyse n'a pas pu être générée." };
    }
    return { analysis: text, error: null };
  } catch (err: any) {
    console.error("Error generating deep analysis from Gemini:", err);
    return { analysis: null, error: "Une erreur est survenue lors de la génération de l'analyse." };
  }
};

// Helper to translate slider value
const translatePreferenceValue = (value: number): string => {
  if (value <= 20) return "très peu/basse";
  if (value <= 40) return "plutôt peu/basse";
  if (value <= 60) return "modérée";
  if (value <= 80) return "plutôt élevée/fréquente";
  return "très élevée/fréquente";
};

export const generateBio = async (
  territoryData: {
    limits: string[];
    preferences: Record<string, number>;
    requests: string[];
    energy: {
        energizers: string[];
        drainers: string[];
        coreValues: string[];
    };
  },
  userName: string
): Promise<{ bioText: string | null; error: string | null }> => {
  if (!apiKeyAvailable || !ai) {
    return { bioText: null, error: GEMINI_API_KEY_ERROR_MESSAGE };
  }

  const preferencesText = Object.entries(territoryData.preferences)
    .map(([key, value]) => {
        const option = FLEXIBLE_PREFERENCES_OPTIONS.find(p => p.key === key);
        if (!option) return '';
        return `- ${option.label}: préférence ${translatePreferenceValue(value)}`;
    })
    .filter(Boolean)
    .join('\n');

  const prompt = `
    Tu es un coach en développement personnel et un écrivain doué. Ta mission est de rédiger une biographie courte, authentique et touchante pour le profil HUMĀN de ${userName}.

    Voici les éléments de son "territoire intérieur" :
    - Limites essentielles (ce qui est non-négociable pour moi) : ${territoryData.limits.join(', ') || 'Non spécifié'}.
    - Demandes positives (ce qui me nourrit) : ${territoryData.requests.join(', ') || 'Non spécifié'}.
    - Préférences flexibles :
    ${preferencesText || 'Non spécifié'}.
    - Ce qui me donne de l'énergie : ${territoryData.energy.energizers.join(', ') || 'Non spécifié'}.
    - Ce qui draine mon énergie : ${territoryData.energy.drainers.join(', ') || 'Non spécifié'}.
    - Mes valeurs fondamentales : ${territoryData.energy.coreValues.join(', ') || 'Non spécifié'}.

    TA TÂCHE :
    Synthétise ces éléments en une biographie à la première personne ("Je..."). Le texte doit être fluide, positif et refléter une personnalité nuancée. Il ne doit PAS être une simple liste, mais une narration intégrée.
    Le ton doit être chaleureux, invitant à la connexion, mais aussi clair sur les besoins de la personne. Évite les phrases robotiques. Sois inspirant et humain.
    
    Exemple de structure :
    Commence par ce qui m'anime (valeurs, énergies).
    Intègre subtilement ce dont j'ai besoin dans une relation (demandes, limites) de manière positive.
    Termine par une phrase d'ouverture.

    Réponds UNIQUEMENT avec le paragraphe de la biographie, sans aucun texte ou formatage supplémentaire.
  `;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    const text = response.text.trim();
    if (!text) {
      return { bioText: null, error: "La bio n'a pas pu être générée." };
    }
    return { bioText: text, error: null };
  } catch (err: any) {
    console.error("Error generating bio from Gemini:", err);
    return { bioText: null, error: "Une erreur est survenue lors de la génération de votre bio." };
  }
};

export const generateBioSuggestions = async (
  territoryData: {
    limits: string[];
    preferences: Record<string, number>;
    requests: string[];
    energy: {
        energizers: string[];
        drainers: string[];
        coreValues: string[];
    };
  },
  userName: string
): Promise<{ suggestions: string[] | null; error: string | null }> => {
  if (!apiKeyAvailable || !ai) {
    return { suggestions: null, error: GEMINI_API_KEY_ERROR_MESSAGE };
  }

  const preferencesText = Object.entries(territoryData.preferences)
    .map(([key, value]) => {
        const option = FLEXIBLE_PREFERENCES_OPTIONS.find(p => p.key === key);
        if (!option) return '';
        return `- ${option.label}: préférence ${translatePreferenceValue(value)}`;
    })
    .filter(Boolean)
    .join('\n');

  const prompt = `
    Tu es un coach en développement personnel et un écrivain doué. Ta mission est de rédiger 3 options de biographie pour le profil HUMĀN de ${userName}, basées sur son "territoire intérieur".

    Voici ses données :
    - Limites essentielles : ${territoryData.limits.join(', ') || 'Non spécifié'}.
    - Demandes positives : ${territoryData.requests.join(', ') || 'Non spécifié'}.
    - Préférences flexibles :
    ${preferencesText || 'Non spécifié'}.
    - Ce qui donne de l'énergie : ${territoryData.energy.energizers.join(', ') || 'Non spécifié'}.
    - Ce qui draine l'énergie : ${territoryData.energy.drainers.join(', ') || 'Non spécifié'}.
    - Valeurs fondamentales : ${territoryData.energy.coreValues.join(', ') || 'Non spécifié'}.

    TA TÂCHE :
    Synthétise ces éléments en 3 biographies distinctes, chacune à la première personne ("Je...").
    - Option 1 (Directe & Claire) : Va droit au but sur ce qui est important pour ${userName}.
    - Option 2 (Introspective & Poétique) : Utilise un ton plus imagé et réfléchi.
    - Option 3 (Chaleureuse & Invitante) : Met l'accent sur la connexion et ce que ${userName} recherche chez les autres.

    Assure-toi que chaque biographie soit fluide, authentique et d'une longueur appropriée pour un profil (environ 2-4 phrases).
    Retourne UNIQUEMENT un tableau JSON contenant les 3 chaînes de caractères des biographies.
  `;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.75,
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: { 
                type: Type.STRING,
                description: "Une suggestion de biographie."
            },
            description: "Un tableau de 3 suggestions de biographies distinctes."
        }
      }
    });

    let jsonStr = response.text.trim();
    const parsedSuggestions = JSON.parse(jsonStr) as string[];
    if (!parsedSuggestions || parsedSuggestions.length === 0) {
      return { suggestions: null, error: "Les suggestions n'ont pas pu être générées." };
    }
    return { suggestions: parsedSuggestions, error: null };
  } catch (err: any) {
    console.error("Error generating bio suggestions from Gemini:", err);
    return { suggestions: null, error: "Une erreur est survenue lors de la génération des suggestions." };
  }
};


export const generateWorkshopSummary = async (
    chatHistory: ChatMessage[],
    workshopTitle: string,
    userFirstName: string,
    aiParticipants: string[]
): Promise<{ summary: WorkshopSummaryData | null; error: string | null }> => {
    if (!apiKeyAvailable || !ai) {
        return { summary: null, error: GEMINI_API_KEY_ERROR_MESSAGE };
    }

    const transcript = chatHistory.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
    const prompt = `
      Tu es une IA spécialisée dans la synthèse de discussions de groupe. Analyse la transcription suivante de l'atelier "${workshopTitle}".
      L'utilisateur humain est ${userFirstName}. Les autres participants sont des IA.

      Transcription:
      ---
      ${transcript}
      ---

      Ta tâche est de produire UNIQUEMENT un objet JSON valide qui résume l'atelier. Ne fournis aucun texte avant ou après le JSON.
    `;

    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        keyPoints: {
                            type: Type.STRING,
                            description: "Un résumé concis en 3-4 points clés des thèmes principaux et des conclusions de la discussion."
                        },
                        xpReceivedByUser: {
                            type: Type.OBJECT,
                            description: "Objet vide. Sera rempli par l'application.",
                            properties: {}
                        },
                        xpReceivedFromAI: {
                            type: Type.OBJECT,
                            description: "Objet vide. Sera rempli par l'application.",
                            properties: {}
                        },
                        xpAwardedToAI: {
                            type: Type.OBJECT,
                            description: "Objet vide. Sera rempli par l'application.",
                            properties: {}
                        },
                    }
                }
            }
        });

        let jsonStr = response.text.trim();
        const parsedSummary = JSON.parse(jsonStr) as WorkshopSummaryData;
        return { summary: parsedSummary, error: null };

    } catch (error) {
        console.error("Error generating workshop summary:", error);
        return { summary: null, error: "Une erreur est survenue lors de la génération de la synthèse." };
    }
};

export const generateMicroChallenge = async (
  userProfile: UserProfile
): Promise<{ challenge: Omit<MicroChallenge, 'id'> | null; error: string | null }> => {
  if (!apiKeyAvailable || !ai) {
    return { challenge: null, error: GEMINI_API_KEY_ERROR_MESSAGE };
  }
  
  const feelings = userProfile.currentFeelings?.join(', ') || 'explorer';
  const aspirations = userProfile.aspirations?.join(', ') || 'grandir';

  const prompt = `
    Tu es un coach bienveillant pour l'application de bien-être HUMĀN. L'utilisateur, ${userProfile.firstName}, se sent actuellement "${feelings}" et aspire à "${aspirations}".
    Génère UN micro-défi unique, actionnable et positif pour sa journée. Le défi doit être court, introspectif, et directement lié à ses émotions ou aspirations.
    Le format de réponse doit être UNIQUEMENT un objet JSON valide.

    Exemple de réponse: 
    {
      "title": "Le Miroir Bienveillant", 
      "description": "Ce soir, regarde-toi dans le miroir et dis à voix haute une chose que tu as bien faite aujourd'hui. Accueille ce sentiment de fierté.", 
      "duration": "5 minutes ce soir"
    }
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Un titre engageant pour le défi (max 10 mots)." },
            description: { type: Type.STRING, description: "Une description claire et encourageante (max 50 mots)." },
            duration: { type: Type.STRING, description: "Une suggestion de durée (ex: 'Aujourd'hui', '5 minutes')." }
          }
        }
      }
    });

    const jsonStr = response.text.trim();
    const parsedChallenge = JSON.parse(jsonStr);
    return { challenge: parsedChallenge, error: null };

  } catch (err: any) {
    console.error("Error generating micro-challenge from Gemini:", err);
    return { challenge: null, error: "Désolé, une erreur est survenue lors de la génération de votre défi. Réessayez plus tard." };
  }
};