import { useContext } from "react"
import { CalcContext } from "../context/CalcContext"

const getStyleName = btn => {
    const className = {
        '=': 'equals',
        'x': 'operations',
        '-': 'operations',
        '+': 'operations',
        '/': 'operations',
        'C': 'operations',
        '+-': 'operations',
        '%': 'operations',
    }
    return className[btn]
}

function Button({ value }) {

    const { calc, setCalc } = useContext(CalcContext)

    const commaClick = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
        })
    }

    const resetClick = () => {
        setCalc({ sign: '', num: 0, res: 0 })
    }

    const signClick = () => {
        setCalc({
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0
        })
    }

    const equalsClick = () => {
        if (calc.res && calc.num) {
            const math = (a, b, sign) => {
                const result = {
                    '+': (a, b) => a + b,
                    '-': (a, b) => a - b,
                    '/': (a, b) => a / b,
                    'x': (a, b) => a * b,
                }
                return result[sign](a, b);
            }
            setCalc({
                res: math(calc.res, calc.num, calc.sign),
                sign: '',
                num: 0
            })
        }

    }
    const handleClickNumber = () => {
        const numberString = value.toString()

        let numberValue;
        if (numberString === '0' && calc.num === 0) {
            numberValue = "0"
        } else {
            numberValue = Number(calc.num + numberString)
        }


        setCalc({
            ...calc,
            num: numberValue
        })
    }

    const percentClick = () => {
        setCalc({
            num: (calc.num / 100),
            res: (calc.res / 100),
            sign: ''
        })
    }

    const invertClick = () => {
        setCalc({
            num: (calc.num * -1),
            res: (calc.res * -1),
            sign: ''
        })
    }

    const handleButtonClick = () => {
        const results = {
            '.': commaClick,
            'C': resetClick,
            '/': signClick,
            'x': signClick,
            '-': signClick,
            '+': signClick,
            '=': equalsClick,
            '%': percentClick,
            '+-': invertClick,
        }
        if (results[value]) {
            return results[value]()
        } else {
            return handleClickNumber()
        }
    }
    return (
        <button onClick={handleButtonClick} className={`${getStyleName(value)} button`}>{value}</button>
    )
}

export default Button