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
}
