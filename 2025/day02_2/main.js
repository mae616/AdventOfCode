// node ./2025/day02_2/main.js --test

import { join, dirname } from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 数値が同じパターンが繰り返されているか判定
function hasRepeatingPattern(num) {
    const str = num.toString();
    const len = str.length;

    // パターン長を1から文字列長の半分まで試す
    for (let patternLen = 1; patternLen <= len / 2; patternLen++) {
        // 文字列長がパターン長で割り切れる場合のみ
        if (len % patternLen !== 0) continue;

        const pattern = str.substring(0, patternLen);
        let isRepeating = true;

        // パターンが繰り返されているかチェック
        for (let i = patternLen; i < len; i += patternLen) {
            const segment = str.substring(i, i + patternLen);
            if (segment !== pattern) {
                isRepeating = false;
                break;
            }
        }

        if (isRepeating) {
            return true;
        }
    }

    return false;
}

function main(input) {
    const args = input.split(",");

    let sum = 0;
    for (const arg of args) {
        if (arg === "") continue;
        const [start, end] = arg.split("-").map(Number);

        for (let i = start; i <= end; i++) {
            const length = i.toString().length;
            if (hasRepeatingPattern(i)) {
                sum += i;
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
