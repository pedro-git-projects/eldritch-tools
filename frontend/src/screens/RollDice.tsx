import React, { useState } from "react";
import Navigation from "../layout/Navigation";
import { RollMultipleDice } from "../../wailsjs/go/dice/DiceRoller";

type DiceConfig = {
  numDice: number;
  sides: number;
};

type DiceResult = number[];

const RollDice: React.FC = () => {
  const [diceConfigs, setDiceConfigs] = useState<DiceConfig[]>([
    { numDice: 1, sides: 6 },
  ]);
  const [constant, setConstant] = useState<number>(0);
  const [results, setResults] = useState<DiceResult>([]);
  const [history, setHistory] = useState<string[]>([]);

  const rollDice = async () => {
    try {
      const allResults: DiceResult = [];
      for (const config of diceConfigs) {
        const rolled: DiceResult = await RollMultipleDice(
          config.sides,
          config.numDice,
          constant
        );
        allResults.push(...rolled);
      }
      setResults(allResults);

      setHistory([
        ...history,
        `Rolled: ${diceConfigs
          .map((d) => `${d.numDice}d${d.sides}`)
          .join(", ")} + ${constant} = ${allResults.join(", ")}`,
      ]);
    } catch (error) {
      console.error("Error rolling dice:", error);
    }
  };

  const addDiceConfig = () => {
    setDiceConfigs([...diceConfigs, { numDice: 1, sides: 6 }]);
  };

  const updateDiceConfig = (index: number, key: keyof DiceConfig, value: number) => {
    const updatedConfigs = diceConfigs.map((config, i) =>
      i === index ? { ...config, [key]: value } : config
    );
    setDiceConfigs(updatedConfigs);
  };

  const removeDiceConfig = (index: number) => {
    setDiceConfigs(diceConfigs.filter((_, i) => i !== index));
  };

  const clearHistory = () => setHistory([]);

  return (
    <Navigation>
      <div className="container mx-auto p-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {diceConfigs.map((config, index) => (
            <div key={index} className="p-4">
              <label className="block mb-2 font-bold">Dice {index + 1}</label>
              <input
                type="number"
                min="1"
                value={config.numDice}
                onChange={(e) =>
                  updateDiceConfig(index, "numDice", parseInt(e.target.value, 10))
                }
                className="w-full p-2 border rounded mb-2"
                placeholder="Number of Dice"
              />
              <input
                type="number"
                min="1"
                value={config.sides}
                onChange={(e) =>
                  updateDiceConfig(index, "sides", parseInt(e.target.value, 10))
                }
                className="w-full p-2 border rounded"
                placeholder="Number of Sides"
              />
              <button
                onClick={() => removeDiceConfig(index)}
                className="mt-2 text-red-500 underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="p-4 rounded flex items-center justify-center">
            <button
              onClick={addDiceConfig}
              className="p-4 bg-blue-500 text-white rounded"
            >
              + Add Dice
            </button>
          </div>
        </div>

        <div className="mt-6">
          <label className="block mb-2 font-bold">Constant Modifier</label>
          <input
            type="number"
            value={constant}
            onChange={(e) => setConstant(parseInt(e.target.value, 10))}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={rollDice}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Roll Dice
          </button>
          <button
            onClick={clearHistory}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Clear History
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold">Results</h2>
          <div className="mt-2 p-4 bg-gray-100 border rounded">
            {results.length > 0 ? (
              results.map((result, index) => (
                <p key={index}>Roll {index + 1}: {result}</p>
              ))
            ) : (
              <p>No results yet</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold">Roll History</h2>
          <div className="mt-2 p-4 bg-gray-100 border rounded">
            {history.length > 0 ? (
              history.map((entry, index) => <p key={index}>{entry}</p>)
            ) : (
              <p>No history yet</p>
            )}
          </div>
        </div>
      </div>
    </Navigation>
  );
};

export default RollDice;

