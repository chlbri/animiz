import { inputMachine } from './fixtures/input.machine';
import { useGuardTest } from './guard';

test.concurrent('Function not exists', () => {
  const safe = () => useGuardTest(inputMachine, 'notExists' as any);
  expect(safe).toThrow('Guard not exists');
});

test.concurrent('Context in function Helper is undefined', () => {
  const [_, expect] = useGuardTest(inputMachine, 'isEditing');
  expect({ expected: true });
});
