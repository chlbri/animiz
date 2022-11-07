import { partialCall } from '~utils/functions';
import { useAssignTest } from './assign';
import { inputMachine } from './fixtures/input.machine';

const use = partialCall(useAssignTest, inputMachine);

test.concurrent('Function not exists', () => {
  const safe = () => use('notExists');
  expect(safe).toThrow('Action not exists');
});

test.concurrent('Context in function Helper is undefined', () => {
  const [_, expect] = use('input');
  expect({ expected: { name: '' } });
});
