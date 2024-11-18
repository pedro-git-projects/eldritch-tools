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
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="-mx-4 mt-10 ring-1 ring-cthulhu-beige sm:mx-0 sm:rounded-lg">
        <table className="min-w-full divide-y divide-cthulhu-beige bg-cthulhu-secondary sm:rounded-lg">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
              >
                Characteristic
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold"
              >
                Value
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold"
              >
                Half
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold"
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
                    idx === 0 ? "" : "border-t border-cthulhu-beige",
                    "relative py-4 pl-4 pr-3 text-sm sm:pl-6"
                  )}
                >
                  <div className="font-medium">{key}</div>
                  {idx !== 0 ? (
                    <div className="absolute -top-px left-6 right-0 h-px bg-cthulhu-beige" />
                  ) : null}
                </td>
                <td
                  className={classNames(
                    idx === 0 ? "" : "border-t border-cthulhu-beige",
                    "px-3 py-3.5 text-sm"
                  )}
                >
                  {value}
                </td>
                <td
                  className={classNames(
                    idx === 0 ? "" : "border-t border-cthulhu-beige",
                    "px-3 py-3.5 text-sm"
                  )}
                >
                  {Math.floor(value / 2)}
                </td>
                <td
                  className={classNames(
                    idx === 0 ? "" : "border-t border-cthulhu-beige",
                    "px-3 py-3.5 text-sm"
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

