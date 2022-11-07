import { partialCall } from '~utils/functions';
import { inputMachine } from './fixtures/input.machine';
import { useGuardTest } from './guard';

const use = partialCall(
  useGuardTest,
  inputMachine.withContext({ name: 'INPUTS' })
);

test.concurrent('Function not exists', () => {
  const safe = () => use('notExists');
  expect(safe).toThrow('Guard not exists');
});

test.concurrent('Context in function Helper is undefined', () => {
  const [_, expect] = use('isEditing');
  expect({ expected: true });
});
