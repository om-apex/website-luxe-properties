import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Markdown,
} from '@react-email/components';

interface NewsletterEmailProps {
  subject: string;
  previewText?: string;
  markdownContent: string;
  unsubscribeUrl: string;
  webViewUrl: string;
  brandName: string;
  brandColor: string;
}

export default function NewsletterEmail({
  subject,
  markdownContent,
  unsubscribeUrl,
  webViewUrl,
  brandName,
  brandColor,
}: NewsletterEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Text style={{ ...brandNameStyle, color: brandColor }}>{brandName}</Text>
          </Section>

          <Section style={contentStyle}>
            <Text style={subjectStyle}>{subject}</Text>
            <Hr style={hrStyle} />
            <Markdown
              markdownCustomStyles={markdownStyles}
              markdownContainerStyles={markdownContainerStyle}
            >
              {markdownContent}
            </Markdown>
          </Section>

          <Hr style={hrStyle} />

          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              <Link href={webViewUrl} style={footerLinkStyle}>
                View in browser
              </Link>
            </Text>
            <Text style={footerTextStyle}>
              You received this because you subscribed to {brandName}.{' '}
              <Link href={unsubscribeUrl} style={footerLinkStyle}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const containerStyle = {
  margin: '0 auto',
  padding: '20px 0',
  maxWidth: '560px',
};

const headerStyle = {
  padding: '20px 30px',
};

const brandNameStyle = {
  fontSize: '24px',
  fontWeight: '700' as const,
  margin: '0',
};

const contentStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '30px',
};

const subjectStyle = {
  color: '#333333',
  fontSize: '22px',
  fontWeight: '600' as const,
  lineHeight: '30px',
  margin: '0 0 16px',
};

const markdownContainerStyle = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '24px',
};

const markdownStyles = {
  h1: { fontSize: '22px', fontWeight: '600' as const, margin: '24px 0 12px', color: '#333333' },
  h2: { fontSize: '19px', fontWeight: '600' as const, margin: '20px 0 10px', color: '#333333' },
  h3: { fontSize: '17px', fontWeight: '600' as const, margin: '16px 0 8px', color: '#333333' },
  p: { margin: '0 0 16px', color: '#333333', fontSize: '16px', lineHeight: '24px' },
  link: { color: '#2563eb', textDecoration: 'underline' },
  bold: { fontWeight: '600' as const },
  li: { margin: '4px 0', color: '#333333', fontSize: '16px', lineHeight: '24px' },
  ul: { margin: '0 0 16px', paddingLeft: '24px' },
  ol: { margin: '0 0 16px', paddingLeft: '24px' },
  blockQuote: {
    borderLeft: '3px solid #e5e7eb',
    paddingLeft: '16px',
    margin: '16px 0',
    color: '#6b7280',
    fontStyle: 'italic' as const,
  },
  hr: { borderColor: '#e6ebf1', margin: '20px 0' },
};

const hrStyle = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footerStyle = {
  padding: '0 30px',
};

const footerTextStyle = {
  color: '#8898aa',
  fontSize: '13px',
  lineHeight: '20px',
  margin: '0 0 8px',
};

const footerLinkStyle = {
  color: '#8898aa',
  textDecoration: 'underline',
};
