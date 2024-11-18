import { FullInvestigator } from "../types/FullInvestigator";

type InvestigatorCardProps = {
  selected: FullInvestigator;
};

export default function InvestigatorCard({ selected }: InvestigatorCardProps) {
  return (
    <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words w-full mb-6 shadow-lg rounded-xl mt-16 bg-cthulhu-secondary pt-3">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex justify-center">
            <div className="relative">
              <img
                alt={selected.name}
                src={selected.portrait}
                onError={e => {
                  console.error(
                    "Image failed to load for investigator:",
                    selected.name,
                    e,
                  );
                }}
                className="h-36 w-36 flex-shrink-0 rounded-full object-cover border border-cthulhu-beige"
              />
            </div>
          </div>
          <div className="w-full text-center mt-8">
            <h3 className="text-2xl font-bold leading-normal mb-1">
              {selected.name}
            </h3>
            <div className="text-lg mt-0 mb-2 font-bold">
              {selected.occupation}
            </div>
            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
              <div className="p-3 text-center">
                <span className="text-lg font-bold block tracking-wide">
                  Age
                </span>
                <span className="text-lg">{selected.age}</span>
              </div>
              <div className="p-3 text-center">
                <span className="text-lg font-bold block tracking-wide">
                  Sex
                </span>
                <span className="text-lg">
                  {selected.sex === "0" ? "Male" : "Female"}
                </span>
              </div>
              <div className="p-3 text-center">
                <span className="text-lg font-bold block tracking-wide">
                  Residence
                </span>
                <span className="text-lg">{selected.residence}</span>
              </div>

              <div className="p-3 text-center">
                <span className="text-lg font-bold block tracking-wide">
                  Birthplace
                </span>
                <span className="text-lg">{selected.birthplace}</span>
              </div>
            </div>
            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
              <div className="p-3 text-center">
                <span className="text-lg font-bold block tracking-wide">
                  Sanity
                </span>
                <span className="text-lg">
                  {selected.sanity.Value} |{" "}
                  {Math.floor(selected.sanity.Value / 2)} |{" "}
                  {Math.floor(selected.sanity.Value / 5)}
                </span>
              </div>
              <div className="p-3 text-center">
                <span className="text-lg font-bold block tracking-wide">
                  HP
                </span>
                <span className="text-lg">
                  {selected.hp.Value} | {Math.floor(selected.hp.Value / 2)} |{" "}
                  {Math.floor(selected.hp.Value / 5)}
                </span>
              </div>
              <div className="p-3 text-center">
                <span className="text-lg font-bold block tracking-wide">
                  Luck
                </span>
                <span className="text-lg">
                  {selected.luck} | {Math.floor(selected.luck / 2)} |{" "}
                  {Math.floor(selected.luck / 5)}
                </span>
              </div>
              <div className="p-3 text-center">
                <span className="text-lg font-bold block tracking-wide">
                  MP
                </span>
                <span className="text-lg">
                  {selected.mp} | {Math.floor(selected.mp / 2)} |{" "}
                  {Math.floor(selected.mp / 5)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
