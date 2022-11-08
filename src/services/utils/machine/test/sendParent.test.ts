import { inputMachine } from './fixtures/input.machine';
import { useSendParentTest } from './sendParent';

test.concurrent('Function not exists', () => {
  const safe = () => useSendParentTest(inputMachine, 'notExists' as any);
  expect(safe).toThrow('Action not exists');
});

test.concurrent('Context in function Helper is undefined', () => {
  const [_, expect] = useSendParentTest(inputMachine, 'startQuery');
  expect({ expected: { type: 'any' } });
});
