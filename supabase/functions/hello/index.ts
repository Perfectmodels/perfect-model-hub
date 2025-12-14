Deno.serve(async (_req) => {
  return new Response(
    JSON.stringify({ message: "Hello from Perfect Models!" }),
    { headers: { "Content-Type": "application/json" } }
  );
});