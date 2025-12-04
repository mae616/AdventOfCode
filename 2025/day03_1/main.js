// node ./2025/day03_1/main.js --test

import { join, dirname } from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getMax2Number = (str) => {
    // 文字列を配列に変換し、各数字の値とインデックスを記録
    const digits = [];
    for (let i = 0; i < str.length; i++) {
        const digit = parseInt(str[i], 10);
        if (!isNaN(digit)) {
            digits.push({ value: digit, index: i });
        }
    }

    // 値で降順にソート
    digits.sort((a, b) => b.value - a.value);

    // 最大値と2番目に大きい値を取得
    const max = digits[0];
    const secondMax = digits.find((d) => d.value < max.value) || max;

    const target = [max, secondMax];
    let maxValue = 0;

    for (const t of target) {
        // tのインデックス以降の位置をループ
        for (let i = t.index + 1; i < str.length; i++) {
            const digit = parseInt(str[i], 10);
            if (!isNaN(digit)) {
                // tの数字を十の位、strのループしてるカレントのインデックスの数字を一の位
                const twoDigit = t.value * 10 + digit;
                maxValue = Math.max(maxValue, twoDigit);
            }
        }
    }

    return maxValue;
};

function main(input) {
    const args = input.split("\n");

    let sum = 0;
    for (const arg of args) {
        if (arg === "") continue;
        sum += getMax2Number(arg);
    }

    console.log(sum);
}

let file = "puzzle.txt";
if (process.argv[2] === "--test") {
    file = "test.txt";
}

main(readFileSync(join(__dirname, file), "utf8"));
