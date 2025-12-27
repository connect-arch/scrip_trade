"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, MessageSquare, Phone, HelpCircle } from "lucide-react"
import { useState } from "react"

export function SupportCenter() {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFeedbackSubmitted(true)
    setTimeout(() => setFeedbackSubmitted(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-accent" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq1">
              <AccordionTrigger>How long does it take to get a rate quote?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our advanced pricing engine typically analyzes your scrip and provides a competitive rate quote within
                2-5 seconds after posting. The system evaluates current market conditions, demand-supply dynamics, and
                your scrip quantity to calculate the best possible rate.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq2">
              <AccordionTrigger>What happens after I accept a rate?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Once you accept a rate, our team will contact you within 24 hours at your registered email address to
                initiate the transaction process. We'll guide you through the documentation requirements and coordinate
                the transfer process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq3">
              <AccordionTrigger>Can I decline a rate and wait for better offers?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, you can decline any rate quote. When you decline, we'll continue monitoring market conditions and
                will notify you when better rates become available. Your scrip remains active on our platform, and
                you'll receive new quotes as market conditions improve.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq4">
              <AccordionTrigger>What documents do I need to trade my scrip?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You'll need: (1) Original duty credit scrip certificate, (2) Export documentation, (3) Valid ID proof
                (Aadhaar/PAN), (4) GST registration if applicable, and (5) Bank account details. Our team will provide a
                complete checklist once you accept a rate.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq5">
              <AccordionTrigger>How are rates calculated?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our dynamic pricing algorithm considers multiple factors: base rate by scrip type, current market
                demand, supply conditions, your scrip quantity (volume discounts), and market volatility. You can view a
                detailed breakdown of how your rate was calculated in the Rate Analysis section.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq6">
              <AccordionTrigger>Is the platform secure?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, we use bank-grade encryption for all data transmission and storage. Your personal and financial
                information is protected with industry-standard security protocols. We recommend enabling two-factor
                authentication for additional account security.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq7">
              <AccordionTrigger>What are the transaction fees?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our platform charges a small service fee which is included in the rate calculation. The quoted rate you
                see is the final rate you'll receive after all fees. There are no hidden charges. GST may be applicable
                on the service fee as per current tax regulations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq8">
              <AccordionTrigger>How long does the complete transaction take?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Once you accept a rate, the complete transaction typically takes 3-7 business days. This includes
                documentation verification, transfer endorsement, and payment processing. We'll keep you updated at
                every step of the process.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Get in touch with our support team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <Mail className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium text-sm mb-1">Email Support</p>
                <p className="text-sm text-muted-foreground">support@scriptrade.com</p>
                <p className="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <Phone className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium text-sm mb-1">Phone Support</p>
                <p className="text-sm text-muted-foreground">+91-1800-XXX-XXXX</p>
                <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9 AM - 6 PM IST</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <MessageSquare className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium text-sm mb-1">Live Chat</p>
                <p className="text-sm text-muted-foreground">Available in-app</p>
                <p className="text-xs text-muted-foreground mt-1">Instant assistance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Form */}
      <Card>
        <CardHeader>
          <CardTitle>Send Feedback</CardTitle>
          <CardDescription>Help us improve by sharing your thoughts</CardDescription>
        </CardHeader>
        <CardContent>
          {feedbackSubmitted ? (
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
              <AlertDescription className="text-green-900 dark:text-green-100">
                Thank you for your feedback! We appreciate your input and will use it to improve our platform.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback-email">Email</Label>
                <Input id="feedback-email" type="email" placeholder="your.email@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-subject">Subject</Label>
                <Input id="feedback-subject" placeholder="Brief description of your feedback" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-message">Message</Label>
                <Textarea
                  id="feedback-message"
                  placeholder="Share your feedback, suggestions, or report any issues..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Feedback
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
