import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components';

interface WelcomeEmailProps {
  firstName?: string;
  unsubscribeUrl: string;
  brandName: string;
  brandColor: string;
}

export default function WelcomeEmail({
  firstName,
  unsubscribeUrl,
  brandName,
  brandColor,
}: WelcomeEmailProps) {
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,';

  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Text style={{ ...brandNameStyle, color: brandColor }}>{brandName}</Text>
          </Section>

          <Section style={contentStyle}>
            <Text style={textStyle}>{greeting}</Text>
            <Text style={textStyle}>
              Your email is verified! You&apos;re now subscribed to the {brandName} newsletter.
            </Text>
            <Text style={textStyle}>
              You&apos;ll receive our latest insights, updates, and industry perspectives
              directly in your inbox.
            </Text>
          </Section>

          <Hr style={hrStyle} />

          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              You&apos;re receiving this because you subscribed to {brandName}.{' '}
              <Link href={unsubscribeUrl} style={unsubLinkStyle}>
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

const textStyle = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
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
};

const unsubLinkStyle = {
  color: '#8898aa',
  textDecoration: 'underline',
};
