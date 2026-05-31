export const fizzBuzz = (num: number) => {
   if (num < 1 || num > 30) {
       return 'Number must be from 1 to 30';
   }

   if (num % 3 === 0 && num % 5 === 0) {
       return 'FizzBuzz';
   }

    if (num % 3 === 0) {
        return 'fizz';
    }

    if (num % 5 === 0 ) {
        return 'buzz';
    }

    return num;
};
