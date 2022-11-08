import { useAssignTest } from './assign';
import { inputMachine } from './fixtures/input.machine';

test.concurrent('Function not exists', () => {
  const safe = () => useAssignTest(inputMachine, 'notExists' as any);
  expect(safe).toThrow('Action not exists');
});

test.concurrent('Context in function Helper is undefined', () => {
  const [_, expect] = useAssignTest(inputMachine, 'input');
  expect({ expected: { name: '' } });
});
