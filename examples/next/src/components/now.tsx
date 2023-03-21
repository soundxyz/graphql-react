import { gql } from '../client/query';
import { TestFragmentFragmentDoc } from '../generated/documents';
import { FragmentType, getFragment } from '../generated/fragment-masking';

gql`
  fragment TestFragment on Query {
    now
  }
`;

export function Now({ info }: { info: FragmentType<TestFragmentFragmentDoc> }) {
  const { now } = getFragment(TestFragmentFragmentDoc, info);

  return <p>{now}</p>;
}
