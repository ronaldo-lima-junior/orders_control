export function CaughtError(err: unknown) {
  if (err instanceof Error) {
    console.log(err.message);
    return err.message;
  }

  return JSON.stringify(err);
}
