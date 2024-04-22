const asyncCount = (count = 2) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: count }), 2 * 1000)
  );
};

export { asyncCount };
