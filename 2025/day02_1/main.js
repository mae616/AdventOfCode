// node ./2025/day02_1/main.js --test

import { join, dirname } from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function main(input) {
    const args = input.split(",");

    let sum = 0;
    for (const arg of args) {
        if (arg === "") continue;
        const [start, end] = arg.split("-").map(Number);

        for (let i = start; i <= end; i++) {
            const length = i.toString().length;

            if (length % 2 === 0) {
                const middle = length / 2;
                const first_half = i.toString().slice(0, middle);
                const second_half = i.toString().slice(middle);

                if (first_half === second_half) {
                    sum += i;
                }
            }
        }
    }

    console.log(sum);
}

let file = "puzzle.txt";
if (process.argv[2] === "--test") {
    file = "test.txt";
}

main(readFileSync(join(__dirname, file), "utf8"));
