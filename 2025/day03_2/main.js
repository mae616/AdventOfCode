// node ./2025/day03_2/main.js --test

import { join, dirname } from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const findMaximumNDigitNumber = (str, targetDigits = 12) => {
    const n = str.length;

    // dp[i][j] = 文字列のi文字目まで見て、j桁選んだ時の最大値（文字列）
    // 初期化: 空文字列またはnull（選べない状態）
    const dp = Array(n + 1)
        .fill(null)
        .map(() => Array(targetDigits + 1).fill(null));

    // 初期状態: 0文字目まで見て、0桁選んだ = 空文字列
    dp[0][0] = "";

    for (let i = 0; i < n; i++) {
        const currentChar = str[i];

        for (let j = 0; j <= targetDigits; j++) {
            // 現在の状態が無効（選べない）ならスキップ
            if (dp[i][j] === null) continue;

            // 選択肢1: 現在の文字を選ばない
            if (
                dp[i + 1][j] === null ||
                compareStrings(dp[i][j], dp[i + 1][j]) > 0
            ) {
                dp[i + 1][j] = dp[i][j];
            }

            // 選択肢2: 現在の文字を選ぶ（j+1 <= targetDigits かつ残りの文字数が十分な場合）
            if (j + 1 <= targetDigits) {
                const remainingChars = n - i - 1;
                const remainingDigits = targetDigits - (j + 1);

                // 残りの文字数で残りの桁数を選べるかチェック
                if (remainingChars >= remainingDigits) {
                    const valueWhenSelecting = dp[i][j] + currentChar;

                    // より大きい方を選ぶ
                    if (
                        dp[i + 1][j + 1] === null ||
                        compareStrings(valueWhenSelecting, dp[i + 1][j + 1]) > 0
                    ) {
                        dp[i + 1][j + 1] = valueWhenSelecting;
                    }
                }
            }
        }
    }

    return dp[n][targetDigits] || "0";
};

// 文字列比較ヘルパー関数（長さ優先、次に辞書順）
const compareStrings = (a, b) => {
    if (a.length !== b.length) {
        return a.length - b.length;
    }
    return a.localeCompare(b);
};

function main(input) {
    const args = input.split("\n");

    let sum = 0;
    for (const arg of args) {
        if (arg === "") continue;
        const max12Digit = findMaximumNDigitNumber(arg);
        sum += parseInt(max12Digit, 10);
    }

    console.log(sum);
}

let file = "puzzle.txt";
if (process.argv[2] === "--test") {
    file = "test.txt";
}

main(readFileSync(join(__dirname, file), "utf8"));
