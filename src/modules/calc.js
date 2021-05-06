const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1,
            i = 0;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;
        totalValue.textContent = 0;

        const addTotal = (tot) => {
            if (totalValue.textContent < tot) {
                totalValue.textContent = i++;
            } else {
                clearInterval(countTotal);
            }
        };

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
        }
        const countTotal = setInterval(() => {
            addTotal(total);
        }, 1);


        // totalValue.textContent = total;
    };
    
    calcBlock.addEventListener('change', (event) => {
        const target = event.target;

        if (target === calcType || target === calcSquare || 
            target === calcDay || target === calcCount) {
                countSum();
            }
    });
};

export default calc;