type MetaDisplayProps = {
  meta: Record<string, any>;
};

export default function MetaDisplay({ meta }: MetaDisplayProps) {
  const formatKey = (key: string) => key.replace(/([a-z])([A-Z])/g, "$1 $2");
  return (
    <div className="bg-cthulhu-secondary rounded-md py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-cthulhu-olive sm:text-5xl">
          Character Details
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {Object.entries(meta).map(([key, value]) => (
            <div
              key={key}
              className="p-6 bg-cthulhu-dark rounded-lg shadow-lg transition-shadow hover:shadow-xl"
            >
              <h3 className="text-lg font-medium text-cthulhu-olive">
                {formatKey(key)}
              </h3>
              <p className="mt-2 text-sm">
                {typeof value === "string"
                  ? value
                  : JSON.stringify(value, null, 2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
