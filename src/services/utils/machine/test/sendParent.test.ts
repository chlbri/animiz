import { partialCall } from '~utils/functions';
import { inputMachine } from './fixtures/input.machine';
import { useSendParentTest } from './sendParent';

const use = partialCall(
  useSendParentTest,
  inputMachine.withContext({ name: 'INPUTS' })
);

test.concurrent('Function not exists', () => {
  const safe = () => use('notExists');
  expect(safe).toThrow('Action not exists');
});

test.concurrent('Context in function Helper is undefined', () => {
  const [_, expect] = use('startQuery');
  expect({ expected: { type: 'any' } });
});
