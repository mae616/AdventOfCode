// node ./2025/day01_2/main.js --test

import { join, dirname } from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function main(input) {
    const args = input.split("\n");

    let count_0 = 0;
    let point = 50;
    let prev_point = 50;
    for (const arg of args) {
        if (arg === "") continue;
        const [direction, distance] = [arg[0], arg.slice(1)];
        prev_point = point;
        if (direction === "L") {
            point -= Number(distance);
        } else {
            point += Number(distance);
        }

        if (point === 0 || point % 100 === 0) {
            count_0++;
        }

        const min = Math.min(prev_point, point);
        const max = Math.max(prev_point, point);

        for (let i = min + 1; i < max; i++) {
            if (i === 0 || i % 100 === 0) {
                count_0++;
            }
        }
    }

    console.log(count_0);
}

let file = "puzzle.txt";
if (process.argv[2] === "--test") {
    file = "test.txt";
}

main(readFileSync(join(__dirname, file), "utf8"));
