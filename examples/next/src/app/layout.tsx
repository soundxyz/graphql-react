import { gql } from '@soundxyz/gql-string';
import { GraphQLReactQueryProvider } from '../client/query';
import './global.css';

gql`
  fragment TestFragment on Query {
    now
  }
`;

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GraphQLReactQueryProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </GraphQLReactQueryProvider>
  );
}
