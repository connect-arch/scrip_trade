import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, FileCheck, AlertTriangle, Scale } from "lucide-react"

export function ComplianceInfo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            Regulatory Compliance
          </CardTitle>
          <CardDescription>Understanding RODTEP/ROSCTL trading regulations</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <FileCheck className="h-4 w-4" />
            <AlertDescription className="text-foreground">
              ScripTrade is fully compliant with the Government of India's regulations for duty credit scrip trading
              under RODTEP (Remission of Duties and Taxes on Exported Products) and ROSCTL (Rebate of State and Central
              Taxes and Levies) schemes.
            </AlertDescription>
          </Alert>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="rodtep">
              <AccordionTrigger>RODTEP Scheme Overview</AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>
                  The Remission of Duties and Taxes on Exported Products (RODTEP) scheme was introduced to rebate
                  taxes/duties/levies that are currently not being rebated under any other existing mechanism.
                </p>
                <p className="font-medium text-foreground">Key Features:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Available for all exporters</li>
                  <li>Rates notified by DGFT based on product categories</li>
                  <li>Transferable and tradeable scrips</li>
                  <li>Valid for import of inputs or payment of basic customs duty</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rosctl">
              <AccordionTrigger>ROSCTL Scheme Overview</AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>
                  The Rebate of State and Central Taxes and Levies (ROSCTL) scheme provides rebate on state and central
                  embedded taxes for export of garments and made-ups.
                </p>
                <p className="font-medium text-foreground">Key Features:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Specific to apparel and made-up articles</li>
                  <li>Rebate rates based on product categories</li>
                  <li>Transferable duty credit scrips</li>
                  <li>Can be used for customs duty payment</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="transfer">
              <AccordionTrigger>Transfer and Trading Regulations</AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p className="font-medium text-foreground">Legal Framework:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Scrips are fully transferable as per DGFT regulations</li>
                  <li>Transfer must be executed through proper documentation</li>
                  <li>Both parties must maintain records for 5 years</li>
                  <li>Transfer is subject to applicable taxes</li>
                </ul>
                <p className="mt-3 font-medium text-foreground">Required Documentation:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Original scrip certificate</li>
                  <li>Export documentation</li>
                  <li>Transfer endorsement</li>
                  <li>KYC documents of both parties</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="taxation">
              <AccordionTrigger>Taxation and GST Implications</AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p className="font-medium text-foreground">Tax Considerations:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Transfer of duty credit scrips may be subject to GST</li>
                  <li>Consult your tax advisor for specific implications</li>
                  <li>Maintain proper invoicing for tax compliance</li>
                  <li>Report transactions in GST returns if applicable</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="updates">
              <AccordionTrigger>Recent Regulatory Updates</AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950">
                  <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-900 dark:text-blue-100">
                    Stay informed about the latest updates from DGFT regarding scrip trading regulations.
                  </AlertDescription>
                </Alert>
                <p className="mt-3">Recent changes include:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Updated RODTEP rates for various product categories</li>
                  <li>Enhanced documentation requirements</li>
                  <li>Digital verification processes</li>
                  <li>Extended validity periods for certain scrips</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-accent" />
            Legal Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            ScripTrade provides a platform for connecting buyers and sellers of duty credit scrips. All transactions are
            subject to applicable laws and regulations.
          </p>
          <p>
            Users are responsible for ensuring compliance with all relevant tax laws, DGFT regulations, and customs
            requirements. ScripTrade does not provide legal or tax advice.
          </p>
          <p>
            Rates quoted on the platform are indicative and subject to market conditions. Final transaction terms should
            be confirmed directly between parties with proper legal documentation.
          </p>
          <p className="font-medium text-foreground">
            For legal and tax compliance matters, please consult with qualified professionals.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
