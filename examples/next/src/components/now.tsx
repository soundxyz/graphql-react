import { TestFragmentFragmentDoc } from '../generated/documents';
import { FragmentType, getFragment } from '../generated/fragment-masking';

export function Now({ info }: { info: FragmentType<typeof TestFragmentFragmentDoc> }) {
  const { now } = getFragment(TestFragmentFragmentDoc, info);

  return <p>{now}</p>;
}
