import { FragmentType, getFragment, TestFragmentFragmentDoc } from '../generated/types';

export function Now({ info }: { info: FragmentType<typeof TestFragmentFragmentDoc> }) {
  const { now } = getFragment(TestFragmentFragmentDoc, info);

  return <p>{now}</p>;
}
