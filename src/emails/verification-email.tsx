import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface VerificationEmailProps {
  firstName?: string;
  verifyUrl: string;
  brandName: string;
  brandColor: string;
}

export default function VerificationEmail({
  firstName,
  verifyUrl,
  brandName,
  brandColor,
}: VerificationEmailProps) {
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
              Thanks for subscribing to the {brandName} newsletter! Please confirm your
              email address to start receiving our updates.
            </Text>

            <Section style={buttonContainerStyle}>
              <Button
                href={verifyUrl}
                style={{ ...buttonStyle, backgroundColor: brandColor }}
              >
                Verify My Email
              </Button>
            </Section>

            <Text style={smallTextStyle}>
              If the button doesn&apos;t work, copy and paste this link into your browser:
            </Text>
            <Text style={linkTextStyle}>{verifyUrl}</Text>
          </Section>

          <Hr style={hrStyle} />

          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              If you didn&apos;t subscribe to {brandName}, you can safely ignore this email.
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

const buttonContainerStyle = {
  textAlign: 'center' as const,
  margin: '24px 0',
};

const buttonStyle = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600' as const,
  textDecoration: 'none',
  padding: '12px 32px',
  borderRadius: '6px',
  display: 'inline-block',
};

const smallTextStyle = {
  color: '#666666',
  fontSize: '13px',
  lineHeight: '20px',
  margin: '16px 0 4px',
};

const linkTextStyle = {
  color: '#666666',
  fontSize: '12px',
  lineHeight: '18px',
  wordBreak: 'break-all' as const,
  margin: '0',
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
