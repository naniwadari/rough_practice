/**
 * https://softantenna.com/wp/software/5-programming-problems/
 * ここの問題5
 */

calc()

function calc()
{
    const nums = [...Array(9)].map((_, i) => i + 1)
    const patterns = operatorPattern()
    const expressions = patterns.map(pattern => {
        return makeExpression(nums, pattern)
    })
    let match_expression = []
    expressions.forEach(expression => {
        let result = Function('return ('+expression+');')();
        if (result === 100) {
            match_expression.push(expression)
        }
    })
    console.log(match_expression)
}

//配列の値を交互に並べて文字列を作る
function makeExpression(nums, operator_pattern)
{
    let expression = ""
    for(i = 0; i < nums.length; i++) {
        expression = expression + nums[i]
        if (i < operator_pattern.length) {
            expression = expression + opeMap(operator_pattern[i])
        }
    }
    return expression
}

//値のマッピング
function opeMap(index) {
    const map = ['+', '-', ''];
    return map[index];
}

function operatorPattern()
{   
    let pattern = [0, 0, 0, 0, 0, 0, 0, 0]
    let max = "2".repeat(pattern.length)
    let patterns = [];
    let isLimit = false;
    while (!isLimit) {
        pattern = increment(pattern)
        patterns.push(pattern)
        if (pattern.join("") === max) {
            isLimit = true
        }
    }
    return patterns
}

function increment(origin_pattern)
{
    // 0 => '+', 1 => '-', 2 => ' '
    
    //参照渡しだと詰むので値渡しに変更
    let pattern = origin_pattern.concat()

    let increment = false
    for (let index = 0; index < pattern.length; index++) {
        //最下段の値をインクリメント
        if (index === 0) {
            pattern[index] = pattern[index] + 1
        }
        //繰上げフラグがあれば値をインクリメント
        if (increment) {
            pattern[index] = pattern[index] + 1
            increment = false
        }
        //繰上げになっているか判定
        if(pattern[index] > 2) {
            pattern[index] = 0
            increment = true
        }
    }
    return pattern
}