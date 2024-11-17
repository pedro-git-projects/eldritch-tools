type Characteristics = {
  Str: number;
  Dex: number;
  Int: number;
  Con: number;
  App: number;
  Pow: number;
  Siz: number;
  Edu: number;
  Move: number;
};


const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");


export const CharacteristicsDisplay: React.FC<{ data: Characteristics }> = ({ data }) => {
  const characteristicEntries = Object.entries(data);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Characteristic
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Value
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Half
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Fifth
              </th>
            </tr>
          </thead>
          <tbody>
            {characteristicEntries.map(([key, value], idx) => (
              <tr key={key}>
                <td
                  className={classNames(
                    idx === 0 ? "" : "border-t border-transparent",
                    "relative py-4 pl-4 pr-3 text-sm sm:pl-6"
                  )}
                >
                  <div className="font-medium text-gray-900">{key}</div>
                  {idx !== 0 ? (
                    <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" />
                  ) : null}
                </td>
                <td
                  className={classNames(
                    idx === 0 ? "" : "border-t border-gray-200",
                    "px-3 py-3.5 text-sm text-gray-500"
                  )}
                >
                  {value}
                </td>
                <td
                  className={classNames(
                    idx === 0 ? "" : "border-t border-gray-200",
                    "px-3 py-3.5 text-sm text-gray-500"
                  )}
                >
                  {Math.floor(value / 2)}
                </td>
                <td
                  className={classNames(
                    idx === 0 ? "" : "border-t border-gray-200",
                    "px-3 py-3.5 text-sm text-gray-500"
                  )}
                >
                  {Math.floor(value / 5)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

