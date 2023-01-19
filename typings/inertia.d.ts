declare module "@inertiajs/react/server" {
  export default function createServer(
    render: (page: Page<unknown>) => Promise<{
      head?: string[];
      body: string;
    }>,
  ): void;
}
