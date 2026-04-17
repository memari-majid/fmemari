import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const inquirySchema = z.object({
  category: z.enum([
    "collaboration",
    "publication",
    "student",
    "speaking",
    "clinical",
    "general",
  ]),
  autoReply: z.string().max(550),
});

export type InquiryCategory = z.infer<typeof inquirySchema>["category"];

export async function classifyInquiry(input: {
  name: string;
  message: string;
  apiKey: string;
  modelId: string;
}) {
  const openai = createOpenAI({ apiKey: input.apiKey });
  const { object } = await generateObject({
    model: openai(input.modelId),
    schema: inquirySchema,
    prompt: `You are the intake assistant for the academic website of Dr. Fereidoon Memari, a surgical oncologist and cancer researcher at the Cancer Research Center, Cancer Institute of Iran (Tehran University of Medical Sciences).

Classify this contact form message into exactly one category:
- collaboration: research collaboration, joint study, multi-center trial, co-authorship
- publication: question about a specific paper, citation, reprint request, peer review invitation
- student: graduate student / fellowship inquiry, research supervision, thesis advising
- speaking: invited talk, conference, panel, interview, media request
- clinical: clinical question, case referral, patient inquiry (note: do not give medical advice)
- general: other or unclear

Then write a short personalized acknowledgment (2-4 sentences) the visitor will see on the website after submitting. Use their name if natural. Be warm and professional. For "clinical" inquiries, kindly clarify that the website cannot provide individual medical advice and direct them to seek care through their treating physician or the Cancer Institute of Iran. Do not promise specific timelines.

Name: ${input.name}
Message:
${input.message}`,
  });
  return object;
}

export function fallbackInquiryResponse(): {
  category: InquiryCategory;
  autoReply: string;
} {
  return {
    category: "general",
    autoReply:
      "Thank you for reaching out. Your message has been received — Dr. Memari will respond when his schedule allows.",
  };
}
