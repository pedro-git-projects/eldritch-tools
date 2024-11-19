import { Possession } from "../types/possessions";

interface PossessionsDisplayProps {
  possessions: Record<string, Possession> | null | undefined;
}

export const PossessionsDisplay: React.FC<PossessionsDisplayProps> = ({
  possessions,
}) => {
  if (!possessions || Object.keys(possessions).length === 0) {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Possessions</h3>
        <p className="mt-2 text-sm">No possessions available.</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="text-2xl font-semibold text-cthulhu-olive mb-2">
        Possessions
      </h3>
      <ul role="list" className="divide-y divide-cthulhu-beige">
        {Object.values(possessions).map((possession, index) => (
          <li
            key={index}
            className="flex flex-col gap-4 py-5 px-4 bg-cthulhu-secondary shadow-sm rounded-lg"
          >
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-cthulhu-beige">
                {possession.Name.trim()}
              </h3>
              <p className="text-sm">{possession.Description.trim()}</p>
            </div>
            <div className="mt-2">
              <span className="inline-flex items-center rounded-md bg-cthulhu-teal px-2.5 py-0.5 text-sm font-bold text-cthulhu-dark">
                Quantity: {possession.Quantity}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
