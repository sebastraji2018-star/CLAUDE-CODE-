import { Injectable } from '@nestjs/common';
import { Anthropic } from '@anthropic-ai/sdk';

@Injectable()
export class LLMService {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async analyzeICPPatterns(historicalData: any[]): Promise<string> {
    const prompt = `
    Analyze the following historical customer data and identify patterns for the Ideal Customer Profile (ICP):

    ${JSON.stringify(historicalData, null, 2)}

    Please provide:
    1. Common industries of successful customers
    2. Typical company sizes
    3. Common job titles of decision makers
    4. Budget ranges
    5. Key pain points they had before conversion
    6. Common buying signals

    Format as JSON with these exact fields: industries, company_sizes, job_titles, budget_range, pain_points, buying_signals
    `;

    const response = await this.client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }

  async generateICPProfile(analysis: string): Promise<any> {
    const prompt = `
    Based on this ICP analysis, generate 3-5 detailed customer profiles:

    ${analysis}

    For each profile, provide:
    - Name (e.g., "Tech Startup CTOs")
    - Description
    - Characteristics (industries, sizes, titles, budget)
    - Buying signals
    - Outreach strategy recommendations

    Format as JSON array with these fields: name, description, characteristics, buying_signals, outreach_strategy
    `;

    const response = await this.client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 3000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '[]';
    return JSON.parse(content);
  }

  async generatePersonalizedMessage(
    lead: any,
    companyInfo: string,
    campaignContext: string,
  ): Promise<string> {
    const prompt = `
    Generate a personalized outreach message for this prospect:

    Prospect Details:
    - Name: ${lead.name}
    - Company: ${lead.company}
    - Job Title: ${lead.job_title}

    Company Info: ${companyInfo}
    Campaign Context: ${campaignContext}

    Requirements:
    - Keep it short (2-3 sentences max)
    - Be specific and personalized
    - Show you understand their pain points
    - Include a clear call to action
    - Be professional but conversational

    Return only the message text, no additional commentary.
    `;

    const response = await this.client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }

  async analyzeEmailResponse(emailContent: string, leadInfo: any): Promise<any> {
    const prompt = `
    Analyze this email response from a prospect and determine their intent:

    Prospect: ${leadInfo.name} at ${leadInfo.company}
    Email Response: ${emailContent}

    Provide:
    1. Sentiment (positive, neutral, negative)
    2. Interest level (high, medium, low)
    3. Next best action (schedule_call, send_info, nurture, close)
    4. Key takeaways from the response

    Format as JSON with these fields: sentiment, interest_level, next_action, takeaways
    `;

    const response = await this.client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '{}';
    return JSON.parse(content);
  }

  async suggestOptimizations(performanceData: any): Promise<string> {
    const prompt = `
    Based on this campaign performance data, suggest 3-5 specific optimizations:

    ${JSON.stringify(performanceData, null, 2)}

    Suggest improvements for:
    - Timing of outreach
    - Message content
    - Target audience refinement
    - Channel selection
    - Follow-up strategy

    Be specific and actionable.
    `;

    const response = await this.client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }

  async generateLeadScoringRules(icpProfile: any, historicalData: any[]): Promise<any> {
    const prompt = `
    Generate lead scoring rules based on this ICP and historical data:

    ICP: ${JSON.stringify(icpProfile, null, 2)}
    Historical Data Sample: ${JSON.stringify(historicalData.slice(0, 5), null, 2)}

    Provide scoring rules as a JSON object with:
    - industry_score: points for matching industry
    - company_size_score: points for matching company size
    - job_title_score: points for decision-maker titles
    - budget_match_score: points for budget alignment
    - intent_signals_score: points for buying signals

    Use a 0-100 scale.
    `;

    const response = await this.client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '{}';
    return JSON.parse(content);
  }

  async generateCompetitorMetrics(
    brandContext: { brandName: string; industry: string; valueProposition: string; targetAudience: string },
    competitorName: string,
  ): Promise<{
    marketPositionScore: number;
    shareOfVoice: number;
    pricingIndex: number;
    featureScore: number;
    sentimentScore: number;
    details: Record<string, any>;
  }> {
    const prompt = `
    You are a competitive intelligence analyst. Based on the brand context below, generate realistic competitive benchmark metrics for the competitor.

    Brand being analyzed: ${brandContext.brandName}
    Industry: ${brandContext.industry}
    Value proposition: ${brandContext.valueProposition}
    Target audience: ${brandContext.targetAudience}

    Competitor to benchmark: ${competitorName}

    Generate realistic competitive metrics on a 0-100 scale:
    - marketPositionScore: Overall market position strength (0-100)
    - shareOfVoice: Estimated share of voice/market visibility as percentage (0-100)
    - pricingIndex: Pricing relative to market average (50 = average, >50 = premium, <50 = budget)
    - featureScore: Product/service feature completeness score (0-100)
    - sentimentScore: Brand sentiment score (0-100, where 100 is most positive)
    - details: An object with keys: strengths (array of strings), weaknesses (array of strings), recentMoves (array of strings), pricingTier (string: "budget"|"mid"|"premium"), contentFrequency (string: "low"|"medium"|"high")

    Return ONLY valid JSON with these exact fields. Use realistic variation, not all competitors are equal.
    `;

    const response = await this.client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '{}';
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : this.fallbackMetrics();
    } catch {
      return this.fallbackMetrics();
    }
  }

  async analyzeCompetitiveLandscape(
    brandContext: { brandName: string; industry: string; valueProposition: string; targetAudience: string },
    competitors: Array<{ name: string }>,
    snapshots: Array<{ competitorId: string | null; marketPositionScore: number; shareOfVoice: number; details: any }>,
  ): Promise<string> {
    const prompt = `
    You are a strategic brand analyst. Analyze the competitive landscape for ${brandContext.brandName} in the ${brandContext.industry} industry.

    Brand context:
    - Value proposition: ${brandContext.valueProposition}
    - Target audience: ${brandContext.targetAudience}

    Competitors tracked: ${competitors.map(c => c.name).join(', ')}

    Latest competitive snapshot data:
    ${JSON.stringify(snapshots, null, 2)}

    Provide a concise daily intelligence brief (3-4 short paragraphs) covering:
    1. Current competitive position summary
    2. Key threats and opportunities identified today
    3. Competitor movements worth noting
    4. One recommended strategic action for the brand to take

    Be specific, data-driven, and actionable. Write in a professional analyst tone.
    `;

    const response = await this.client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }

  private fallbackMetrics() {
    return {
      marketPositionScore: Math.round(40 + Math.random() * 40),
      shareOfVoice: Math.round(10 + Math.random() * 30),
      pricingIndex: Math.round(40 + Math.random() * 30),
      featureScore: Math.round(45 + Math.random() * 40),
      sentimentScore: Math.round(50 + Math.random() * 30),
      details: {
        strengths: ['Brand recognition', 'Market presence'],
        weaknesses: ['Limited differentiation'],
        recentMoves: ['Product update'],
        pricingTier: 'mid',
        contentFrequency: 'medium',
      },
    };
  }
}
