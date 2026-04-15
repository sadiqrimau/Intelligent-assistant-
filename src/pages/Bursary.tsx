import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/ui/PageHeader";
import ContentSection from "@/components/ui/ContentSection";
import FAQSection from "@/components/ui/FAQSection";

const bursaryFAQs = [
  {
    question: "When are school fees due?",
    answer: "School fees are due at the beginning of each semester. First semester fees must be paid before registration, and second semester fees are due before mid-semester. A payment plan may be available upon request.",
  },
  {
    question: "Can I pay my fees in installments?",
    answer: "Yes, the university offers an installment payment plan for students who cannot pay the full fee at once. You must apply for this at the Bursary office and get approval before the semester begins. A maximum of two installments is allowed per semester.",
  },
  {
    question: "What happens if I don't pay on time?",
    answer: "Late payment attracts a penalty fee. Students who fail to pay within the extended deadline may be deregistered from courses and denied access to examinations. Outstanding fees must be cleared before proceeding to the next semester.",
  },
  {
    question: "How do I apply for financial aid?",
    answer: "Financial aid applications are submitted to the Bursary office with supporting documents including proof of financial need, academic transcripts, and a letter of recommendation. Applications are reviewed on a case-by-case basis.",
  },
];

const Bursary = () => {
  return (
    <Layout>
      <PageHeader
        title="Bursary & Finance"
        subtitle="Managing your financial obligations with clarity and convenience"
      />

      <section className="content-section">
        <div className="container-custom">
          <div className="grid gap-8">
            <ContentSection title="Fee Structure">
              <p className="mb-4">
                Al-Hikmah University operates a transparent fee structure that covers tuition, administrative charges, and other essential services. Fees vary based on program, level of study, and student category.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 pr-4 font-semibold text-foreground">Program</th>
                      <th className="py-3 pr-4 font-semibold text-foreground">Category</th>
                      <th className="py-3 font-semibold text-foreground">Fee Range (₦)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-3 pr-4">Sciences & Engineering</td>
                      <td className="py-3 pr-4">Fresh Students</td>
                      <td className="py-3">350,000 - 450,000</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Sciences & Engineering</td>
                      <td className="py-3 pr-4">Returning Students</td>
                      <td className="py-3">280,000 - 380,000</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Arts & Social Sciences</td>
                      <td className="py-3 pr-4">Fresh Students</td>
                      <td className="py-3">250,000 - 350,000</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Arts & Social Sciences</td>
                      <td className="py-3 pr-4">Returning Students</td>
                      <td className="py-3">200,000 - 280,000</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Postgraduate Programs</td>
                      <td className="py-3 pr-4">All Categories</td>
                      <td className="py-3">400,000 - 600,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm">
                *Fees are subject to annual review. Contact the Bursary for the most current fee schedule.
              </p>
            </ContentSection>

            <ContentSection title="Payment Methods">
              <p className="mb-4">
                The university accepts payments through various channels for your convenience. All payments must be made using the official university payment platforms to ensure proper documentation.
              </p>
              <h4 className="font-semibold text-foreground mb-2">Accepted Payment Methods:</h4>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Bank Transfer:</strong> Transfer to the university's designated bank accounts</li>
                <li><strong>Online Payment:</strong> Pay through the student portal using debit/credit cards</li>
                <li><strong>Bank Draft:</strong> In favor of Al-Hikmah University (limited acceptance)</li>
                <li><strong>POS Payment:</strong> Available at the Bursary office during working hours</li>
              </ul>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-2">Important Note:</p>
                <p className="text-sm">
                  Always use your matriculation number as payment reference. Keep your payment receipt safe as it is required for registration and any payment-related inquiries.
                </p>
              </div>
            </ContentSection>

            <ContentSection title="Payment Deadlines">
              <p className="mb-4">
                Timely payment of fees is essential for uninterrupted academic activities. The university sets specific deadlines for fee payment each semester.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 pr-4 font-semibold text-foreground">Semester</th>
                      <th className="py-3 pr-4 font-semibold text-foreground">Regular Deadline</th>
                      <th className="py-3 font-semibold text-foreground">Late Payment (with penalty)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-3 pr-4">First Semester</td>
                      <td className="py-3 pr-4">2 weeks after resumption</td>
                      <td className="py-3">Up to 4 weeks after resumption</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Second Semester</td>
                      <td className="py-3 pr-4">2 weeks after resumption</td>
                      <td className="py-3">Up to 4 weeks after resumption</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm">
                Late payment penalty: ₦10,000 for the first week, ₦5,000 for each additional week.
              </p>
            </ContentSection>

            <ContentSection title="Financial Aid & Scholarships">
              <p className="mb-4">
                Al-Hikmah University is committed to making education accessible. Various financial assistance options are available to deserving students.
              </p>
              <h4 className="font-semibold text-foreground mb-2">Available Financial Aid Options:</h4>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Merit Scholarships:</strong> For students with exceptional academic performance (CGPA 4.50 and above)</li>
                <li><strong>Need-Based Assistance:</strong> For students from low-income families</li>
                <li><strong>Sports Scholarships:</strong> For outstanding athletes representing the university</li>
                <li><strong>Staff Children Discount:</strong> Reduced fees for children of university employees</li>
                <li><strong>Sibling Discount:</strong> 10% reduction when multiple siblings are enrolled</li>
              </ul>
              <h4 className="font-semibold text-foreground mb-2">How to Apply:</h4>
              <ol className="list-decimal list-inside space-y-2">
                <li>Obtain the financial aid application form from the Bursary</li>
                <li>Complete the form with accurate information</li>
                <li>Attach all required supporting documents</li>
                <li>Submit before the published deadline</li>
                <li>Await committee review and decision notification</li>
              </ol>
            </ContentSection>

            <FAQSection faqs={bursaryFAQs} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bursary;
