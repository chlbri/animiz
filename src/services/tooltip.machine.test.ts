import { interpret } from 'xstate';
import { advanceByTime } from '~utils/test';
import { tooltipMachine } from './tooltip.machine';

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

test.skip('should first', async () => {
  const service = interpret(tooltipMachine).start();
  service.send('MOUSE_ENTER');
  service.send({ type: 'MOUSE_MOVE', position: { x: 23, y: 34 } });
  await advanceByTime(500);
  const state = service.getSnapshot();
  console.log(Object.keys(state.children));
  service.send({ type: 'MOUSE_MOVE', position: { x: 23, y: 34 } });

  const context = service.getSnapshot().context;
  const position = context.position;
  expect(position).toBeDefined();
});
