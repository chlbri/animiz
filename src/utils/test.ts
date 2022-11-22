export async function advanceByTime(ms: number) {
  return Promise.resolve().then(() => {
    vi.advanceTimersByTime(ms);
  });
}
